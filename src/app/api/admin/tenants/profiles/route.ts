import {NextRequest, NextResponse} from "next/server";
import prisma from "@/core/utils/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/tenantProfiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
        }
    );

    if (!response.ok) {
      return NextResponse.json(
          {message: await response.json()},
          {status: response.status}
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    return NextResponse.json(
        {message: `Error getting asset profiles: ${error}`},
        {status: 500}
    );
  }
}

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token");
    try {
        const {
            name,
            description,
            type,
            maxDevices,
            maxAssets,
            maxCustomers,
            maxUsers,
            maxDashboards,
            maxRuleChains,
            maxEmails,
            smsEnabled,
            maxSms,
            limit1,
            interval1,
            limit2,
            interval2,
            unitPrices,
        } = await req.json();

        const profileData = {
            unitPrices,
            configuration: {
                type,
                maxDevices,
                maxAssets,
                maxCustomers,
                maxUsers,
                maxDashboards,
                maxRuleChains,
                maxEmails,
                smsEnabled,
                maxSms,
                transportTenantMsgRateLimit: `${limit1}:${interval1},${limit2}:${interval2}`,
                maxDataPointsPerRollingArg: 1,
            },
        };

        const sendData = JSON.stringify({
            name,
            description,
            profileData,
        });

        const response = await fetch(`${process.env.THINGS_BOARD_URL}/api/tenantProfile`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token?.value}`,
            },
            body: sendData,
        });

        if (!response.ok) {
            const data = await response.json();
            return NextResponse.json(
                {message: data?.message ?? data},
                {status: response.status}
            );
        }

        const data = await response.json();
        const profile = await prisma.profile.findUnique({where: {things_id: data.id.id}});

        if (!profile) {
            await prisma.profile.create({
                data: {
                    name,
                    type: "TENANT",
                    config: profileData,
                    things_id: data.id.id
                }
            })
        }

        return NextResponse.json(
            data,
            {status: 201}
        );
    } catch (error) {
        return NextResponse.json(
            {message: `Something went wrong: ${error}`},
            {status: 500}
        );
    }
}