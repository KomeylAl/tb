import {NextRequest, NextResponse} from "next/server";

const getApiPathFromEntity = (entity: string) => {
  switch (entity.toUpperCase()) {
    case "DEVICE":
      return "/api/deviceProfiles";
    case "ASSET":
      return "/api/tenant/assetProfiles";
    default:
      throw new Error("Invalid entity type");
  }
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");
  const params = req.nextUrl.searchParams;
  const pageSize = params.get("pageSize") || 1;
  const page = params.get("page") || 0;
  const entity = params.get("entity") || "DEVICES";

  let apiPath: string;
  try {
    apiPath = getApiPathFromEntity(entity);
  } catch (e) {
    return NextResponse.json({message: `Error: ${e}`}, {status: 400});
  }

  try {
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}${apiPath}?pageSize=${pageSize}&page=${page}&sortProperty=createdTime&sortOrder=DESC`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
        }
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
          {message: `Error getting profiles: ${data}`},
          {status: response.status}
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {status: 200});
  } catch (error) {
    return NextResponse.json(
        {message: `Error getting profiles: ${error}`},
        {status: 500}
    );
  }
}
