import {NextRequest, NextResponse} from "next/server";
import prisma from "@/core/utils/prisma";

export async function POST(
    req: NextRequest,
    {params}: { params: { id: string } },
) {
  const token = req.cookies.get("token");
  const {id: tenantId} = await params;
  try {
    const {
      title,
      country,
      city,
      address,
      address2,
      zip,
      phone,
      region,
      email,
      additionalInfo: {description},
      tenantProfileId: {
        id
      },
    } = await req.json();

    const sendData = JSON.stringify({
      id: {
        id: tenantId,
        entityType: "TENANT",
      },
      title,
      country,
      city,
      address,
      address2,
      zip,
      phone,
      region,
      email,
      additionalInfo: {description},
      tenantProfileId: id ? {
        id, entityType: "TENANT_PROFILE"
      } : null,
    });

    const response = await fetch(`${process.env.THINGS_BOARD_URL}/api/tenant`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: sendData,
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json(
          {message: data?.message ?? data},
          {status: response.status}
      );
    }

    const data = await response.json();
    const tenant = await prisma.tenant.findUnique({where: {things_id: data.id.id}});

    if (tenant) {
      await prisma.tenant.update({
        where: {
          things_id: tenantId,
        },
        data: {
          email,
          phone,
          name: title,
          things_id: tenantId
        }
      })
    }

    return NextResponse.json(
        data,
        {status: 200}
    );
  } catch (error) {
    return NextResponse.json(
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}