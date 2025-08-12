import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import jwt, {JwtPayload} from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const role = req.cookies.get("role")?.value;

  if (!token && req.nextUrl.pathname !== "/auth/login") {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/")) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (token) {
    try {
      const decoded = jwt.decode(token) as JwtPayload | null;

      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        if (refreshToken) {
          const response = await fetch(`${process.env.THINGS_BOARD_URL}/api/auth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({refreshToken}),
          });

          if (response.ok) {
            const {token: newToken, refreshToken: newRefreshToken} = await response.json();

            const res = NextResponse.next();
            res.cookies.set("token", newToken, {httpOnly: true, path: "/", maxAge: 3600});
            res.cookies.set("refreshToken", newRefreshToken, {httpOnly: true, path: "/", maxAge: 7 * 24 * 3600});

            return res;
          } else {
            const loginUrl = new URL("/auth/login", req.url);
            return NextResponse.redirect(loginUrl);
          }
        } else {
          const loginUrl = new URL("/auth/login", req.url);
          return NextResponse.redirect(loginUrl);
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      const loginUrl = new URL("/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (role === "SYS_ADMIN") {
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const dashboardUrl = new URL("/sysadmin", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (role === "TENANT_ADMIN") {
    if (req.nextUrl.pathname.startsWith("/sysadmin")) {
      const sysadminUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(sysadminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/sysadmin/:path*", "/auth/login"],
};
