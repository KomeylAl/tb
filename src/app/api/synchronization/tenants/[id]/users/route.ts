import { NextRequest, NextResponse } from "next/server";
import prisma from "@/core/utils/prisma";
import {TenantLocalUserEntity, TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";
import {TenantUsersDataType} from "@/core/types/tenantsTypes";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token")?.value;
  const { id: tbTenantId } = params;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1) Tenant محلی مربوط به این things_id را پیدا کن
    const localTenant = await prisma.tenant.findUnique({
      where: { things_id: tbTenantId },
      select: { id: true, things_id: true },
    });

    if (!localTenant) {
      return NextResponse.json(
          { message: "Local tenant not found. Please sync tenants first." },
          { status: 404 }
      );
    }

    // 2) تمام صفحات کاربران TB را واکشی کن
    const pageSize = 1000;
    let page = 0;
    const tbUsers: TenantUserEntity[] = [];

    // بعضی نسخه‌های TB از page=0 شروع می‌کنند. تا وقتی hasNext true است یا
    // وقتی data.length === pageSize (safe fallback) ادامه بده.
    // همچنین مراقب شکست درخواست‌ها باشیم.
    // NOTE: اگر TB شما از page=1 شروع می‌کند، اینجا page=1 را بگذارید.
    // اما با توجه به کد قبلی‌تان page=0 درست است.
    // Loop safeguard:
    const MAX_PAGES = 50;

    while (page < MAX_PAGES) {
      const url = `${process.env.THINGS_BOARD_URL}/api/tenant/${tbTenantId}/users?pageSize=${pageSize}&page=${page}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errBody = await safeJson(res);
        return NextResponse.json(errBody ?? { message: "TB fetch error" }, { status: res.status });
      }

      const body = (await res.json()) as TenantUsersDataType;
      const batch = Array.isArray(body.data) ? body.data : [];
      tbUsers.push(...batch);

      const hasNext =
          body.hasNext; // fallback

      if (!hasNext) break;
      page += 1;
    }

    // 3) مپ به مدل لوکال
    const mapped: TenantLocalUserEntity[] = tbUsers.map((u) => ({
      things_id: u.id.id,
      tenantId: localTenant.id, // چون endpoint مخصوص همین tenant است
      firstName: u.firstName ?? null,
      lastName: u.lastName ?? null,
      email: u.email || `no-email-${u.id.id}@example.com`,
      phone: u.phone || `no-phone-${u.id.id}`,
      role: u.authority,
      createdAt: new Date(u.createdTime),
    }));

    // 4) فقط کاربران همین tenant را از DB بخوانیم
    const localUsers = await prisma.user.findMany({
      where: { tenantId: localTenant.id },
      select: {
        id: true,
        things_id: true,
        tenantId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // ایندکس سریع بر اساس things_id
    const localByThingsId = new Map(localUsers.map((lu) => [lu.things_id, lu]));
    const tbByThingsId = new Map(mapped.map((m) => [m.things_id, m]));

    // 5) تشخیص new / updated / deleted
    const newUsers: TenantLocalUserEntity[] = [];
    const updates: { things_id: string; data: Partial<TenantLocalUserEntity> }[] = [];

    for (const m of mapped) {
      const exists = localByThingsId.get(m.things_id);
      if (!exists) {
        newUsers.push(m);
      } else {
        // تغییر فیلدها را بررسی کن (به‌جز tenantId و createdAt که ممکن است ثابت بمانند)
        const diffs: Partial<TenantLocalUserEntity> = {};

        if (exists.firstName !== m.firstName) diffs.firstName = m.firstName;
        if (exists.lastName !== m.lastName) diffs.lastName = m.lastName;
        if (exists.email !== m.email) diffs.email = m.email;
        if (exists.phone !== m.phone) diffs.phone = m.phone;
        if (exists.role !== m.role) diffs.role = m.role;

        // createdAt را فقط اگر TB جدیدتر است آپدیت کن (اختیاری)
        if (exists.createdAt.getTime() !== m.createdAt.getTime()) {
          diffs.createdAt = m.createdAt;
        }

        if (Object.keys(diffs).length > 0) {
          updates.push({ things_id: m.things_id, data: diffs });
        }
      }
    }

    // حذف‌ها: آن‌هایی که در لوکال هستند ولی در TB نیستند
    const deletedThingsIds: string[] = [];
    for (const lu of localUsers) {
      if (!tbByThingsId.has(lu.things_id)) {
        deletedThingsIds.push(lu.things_id);
      }
    }

    // 6) اعمال تغییرات در DB
    if (newUsers.length > 0) {
      await prisma.user.createMany({
        data: newUsers,
        skipDuplicates: true,
      });
    }

    if (updates.length > 0) {
      // Prisma updateMany شرط where:things_id را می‌پذیرد، اما data یکسان می‌خواهد.
      // چون data هرکدام متفاوت است، حلقهٔ تکی می‌زنیم (تعداد معمولاً کم است).
      await Promise.all(
          updates.map((u) =>
              prisma.user.update({
                where: { things_id: u.things_id },
                data: u.data,
              })
          )
      );
    }

    if (deletedThingsIds.length > 0) {
      await prisma.user.deleteMany({
        where: {
          tenantId: localTenant.id,       // scoped
          things_id: { in: deletedThingsIds },
        },
      });
    }

    await prisma.syncLog.create({
      data: {
        entity: "user",
        status: "success",
      },
    });

    return NextResponse.json(
        {
          message: "Synced successfully.",
          stats: {
            new: newUsers.length,
            updated: updates.length,
            deleted: deletedThingsIds.length,
            totalFromTB: mapped.length,
            localAfter:
                (await prisma.user.count({ where: { tenantId: localTenant.id } })),
          },
        },
        { status: 200 }
    );
  } catch (error) {
    // لاگ خطا
    await prisma.syncLog.create({
      data: {
        entity: "user",
        status: "error",
      },
    });

    console.error(error);
    return NextResponse.json(
        { message: `Something went wrong: ${error}` },
        { status: 500 }
    );
  }
}

/** تلاش امن برای خواندن JSON (برای خطاهای TB) */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
