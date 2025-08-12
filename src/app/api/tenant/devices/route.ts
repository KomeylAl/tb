// import prisma from "@/utils/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const {
      set_id,
      name,
      label,
      type,
      deviceProfileId,
      additionalInfo: {location, description},
    } = await req.json();

    // const tenant = await prisma.tenant.findUnique({
    //   where: { things_id: tenantID },
    // });

    // if (!tenant) {
    //   return NextResponse.json(
    //       { message: "No Tenant Found." },
    //       { status: 400 }
    //   );
    // }

    const id = set_id && {id: set_id, entityType: "DEVICE"};

    const sendData = JSON.stringify({
      id,
      name,
      label,
      type,
      deviceProfileId: {id: deviceProfileId, entityType: "DEVICE_PROFILE"},
      additionalInfo: {location, description},
    });

    const response = await fetch(`${process.env.THINGS_BOARD_URL}/api/device`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: sendData,
    });

    if (!response.ok) {
      return NextResponse.json(
          {message: "Error adding device"},
          {status: response.status}
      );
    }

    // const data = await response.json();

    // const device = await prisma.device.findUnique({
    //   where: { things_id: data.id.id },
    // });

    // if (!device) {
    //   await prisma.device.create({
    //     data: {
    //       things_id: data.id.id,
    //       name,
    //       type,
    //       tenantId: tenant!.id,
    //     },
    //   });
    // } else {
    //   await prisma.device.update({
    //     where: { things_id: set_id },
    //     data: {
    //       things_id: data.id.id,
    //       name,
    //       type,
    //       tenantId: tenant!.id,
    //     },
    //   });
    // }

    return NextResponse.json(
        {message: "Device Added Successful"},
        {status: 201}
    );
  } catch (error) {
    return NextResponse.json(
        {message: `Error adding device: ${error}`},
        {status: 500}
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/tenant/devices?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
        }
    );

    if (!response.ok) {
      console.log(await response.json());
      return NextResponse.json(
          {message: await response.json()},
          {status: response.status}
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
        {message: `Error getting devices: ${error}`},
        {status: 500}
    );
  }
}