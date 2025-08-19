import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;
  const searchParams = req.nextUrl.searchParams;
  const pageSize = searchParams.get("pageSize") || 1;
  const page = searchParams.get("page") || 0;

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/tenant/${id}/users?pageSize=${pageSize}&page=${page}`,
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
          { message: await response.json() },
          { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
        { message: `Something went wrong: ${error}` },
        { status: 500 }
    );
  }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token");
  const { id } = await params;

  const { phone, email, firstName, lastName, password } =
      await req.json();

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/user?sendActivationMail=false`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          body: JSON.stringify({
            tenantId: { id, entityType: "TENANT" },
            phone,
            email,
            firstName,
            lastName,
            authority: "TENANT_ADMIN",
          }),
        }
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json({ message: data?.message ?? data }, { status: response.status });
    }

    const data = await response.json();

    const activeResponse = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/user/${data.id.id}/activationLink`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
        }
    );

    if (!activeResponse.ok) {
      const data = await activeResponse.json();
      return NextResponse.json(
          { message: data?.message ?? data },
          { status: activeResponse.status }
      );
    }

    const activeLinkData = await activeResponse.text();
    const activationToken = activeLinkData.split("=")[1];

    const activateResponse = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/noauth/activate`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          body: JSON.stringify({
            activateToken: activationToken,
            password,
          }),
        }
    );

    if (!activateResponse.ok) {
      const data = await activateResponse.json();
      return NextResponse.json(
          { message: data?.message ?? data },
          { status: activateResponse.status }
      );
    }

    return NextResponse.json(
        {message: "کاربر با موفقیت افزوده شد."},
        { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
        { message: `Something went wrong: ${error}` },
        { status: 500 }
    );
  }
}
