import {NextRequest, NextResponse} from "next/server";

export async function DELETE(
    req: NextRequest,
    {params}: { params: { id: string } }
) {
  try {
    const token = req.cookies.get("token");
    const {id} = await params;

    if (!token || !token.value) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    const response = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/assetProfile/${id}`,
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

    return NextResponse.json(
        {message: "Profile deleted successfully"},
        {status: 200}
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        {message: `Something went wrong: ${error}`},
        {status: 500}
    );
  }
}