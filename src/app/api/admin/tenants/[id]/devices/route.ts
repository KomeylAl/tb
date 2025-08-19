import { NextRequest, NextResponse } from "next/server";
import prisma from "@/core/utils/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = params;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { things_id: id },
    });

    if (!tenant) {
      return NextResponse.json(
          {
            message:
                "سازمان درون پایگاه داده محلی یافت نشد. لطفا اطلاعات را همگام سازی کنید.",
          },
          { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(
        1,
        parseInt(searchParams.get("page") || "1", 10)
    );
    const pageSize = Math.max(
        1,
        parseInt(searchParams.get("pageSize") || "10", 10)
    );

    const skip = (page - 1) * pageSize;

    const [devices, totalCount] = await Promise.all([
      prisma.device.findMany({
        where: { tenantId: tenant.id },
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: { customer: true },
      }),
      prisma.device.count({
        where: { tenantId: tenant.id },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNext = page < totalPages;

    return NextResponse.json(
        {
          data: devices,
          page,
          pageSize,
          hasNext,
          totalElements: totalCount,
          totalPages,
        },
        { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        { message: `Something went wrong: ${error}` },
        { status: 500 }
    );
  }
}
