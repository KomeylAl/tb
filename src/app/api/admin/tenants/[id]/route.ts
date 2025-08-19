import {NextRequest, NextResponse} from "next/server";
import prisma from "@/core/utils/prisma";

export async function GET(
    req: NextRequest,
    {params}: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const {id} = await params;

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/tenant/${id}`,
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
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}

export async function DELETE(
    req: NextRequest,
    {params}: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const {id} = await params;

  if (!token) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/tenant/${id}`,
        {
          method: "DELETE",
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

    const tenant = await prisma.tenant.findUnique({where: {things_id: id}});

    if (tenant) {
      await prisma.tenant.delete({
        where: {things_id: id},
      });
    }

    return NextResponse.json(
        {message: "Tenant deleted successfully"},
        {status: 200}
    );
  } catch (error) {
    return NextResponse.json(
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}