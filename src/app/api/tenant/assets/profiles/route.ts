import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const textSearch = params.get("textSearch") || "";

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/assetProfiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}&sortProperty=createdTime&sortOrder=DESC`,
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
  try {
    const token = req.cookies.get("token");

    if (!token || !token.value) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const data = await req.json();
    const {name, description} = data;
    const reqData = JSON.stringify({
      name,
      description,
    });

    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/assetProfile`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          body: reqData,
        }
    );

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
    return NextResponse.json(
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}