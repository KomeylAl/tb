import {parseJwt} from "@/core/utils/token";

export async function getUserInfo(token: string | undefined) {
  const decoded = parseJwt(token);
  try {
    const user = await fetch(
        `${process.env.THINGS_BOARD_URL}/api/user/${decoded.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
    );

    return await user.json();
  } catch (error) {
    console.log("ERR_GETTING_USER_INFO", error);
  }
}