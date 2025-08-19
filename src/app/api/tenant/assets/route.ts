import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/tenant/assets?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
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
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  try {
    const {
      name,
      label,
      type,
      additionalInfo: {description},
      assetProfileId: {
        id, entityType
      },
    } = await req.json();

    const sendData = JSON.stringify({
      name,
      label,
      type,
      additionalInfo: {description},
      assetProfileId: id ? {
        id, entityType
      } : null,
    });

    const response = await fetch(`${process.env.THINGS_BOARD_URL}/api/asset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: sendData,
    });

    if (!response.ok) {
      return NextResponse.json(
          {message: await response.json()},
          {status: response.status}
      );
    }

    return NextResponse.json(
        await response.json(),
        {status: 201}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}