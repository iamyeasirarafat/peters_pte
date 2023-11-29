import { NextResponse } from "next/server";
import checkRole from "./utils/checkRole";
import withSession from "./utils/withSession";
export async function middleware(NextRequest) {
  const token = NextRequest.cookies.get("access_token")?.value;
  const refreshToken = NextRequest.cookies.get("refresh_token")?.value;
  console.log(NextRequest.nextUrl, "middleware");
  //checking token in auth page
  if (
    NextRequest.nextUrl.pathname.startsWith("/auth") &&
    refreshToken &&
    token
  ) {
    const role = await checkRole(token);
    let url;
    switch (role) {
      case "super_admin":
      case "admin":
        url = new URL(`/admin`, NextRequest.url);
        return NextResponse.redirect(url);
      case "organization":
        url = new URL(`/organization`, NextRequest.url);
        return NextResponse.redirect(url);
      case "student":
        url = new URL(`/app`, NextRequest.url);
        return NextResponse.redirect(url);
    }
  }

  //token validation and session check
  const [valid, error] = await withSession({
    token,
  });
  if (!valid || error) {
    const [token, error] = await withSession({
      refreshToken,
    });
    if (token && !error) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "access_token",
        value: token,
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });
      const role = await checkRole(token);
      switch (role) {
        case "super_admin":
        case "admin":
          if (NextRequest.nextUrl.pathname.startsWith("/admin")) {
            return response;
          } else {
            const url = new URL(`/no-permission`, NextRequest.url);
            return NextResponse.redirect(url);
          }
        case "organization":
          if (NextRequest.nextUrl.pathname.startsWith("/organization")) {
            return response;
          } else {
            const url = new URL(`/no-permission`, NextRequest.url);
            return NextResponse.redirect(url);
          }
        case "student":
          if (NextRequest.nextUrl.pathname.startsWith("/app")) {
            return response;
          } else {
            const url = new URL(`/no-permission`, NextRequest.url);
            return NextResponse.redirect(url);
          }
      }
    }
    if (!token || error) {
      const response = NextResponse.next();
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      if (
        NextRequest.nextUrl.pathname.startsWith("/app") ||
        NextRequest.nextUrl.pathname.startsWith("/organization") ||
        NextRequest.nextUrl.pathname.startsWith("/admin")
      ) {
        const url = new URL(`/auth`, NextRequest.url);
        return NextResponse.redirect(url);
      }
      return response;
    }
  } else {
    const role = await checkRole(token);
    switch (role) {
      case "super_admin":
      case "admin":
        if (NextRequest.nextUrl.pathname.startsWith("/admin")) {
          return NextResponse.next();
        } else {
          const url = new URL(`/no-permission`, NextRequest.url);
          return NextResponse.redirect(url);
        }
      case "organization":
        if (NextRequest.nextUrl.pathname.startsWith("/organization")) {
          return NextResponse.next();
        } else {
          const url = new URL(`/no-permission`, NextRequest.url);
          return NextResponse.redirect(url);
        }
      case "student":
        if (NextRequest.nextUrl.pathname.startsWith("/app")) {
          return NextResponse.next();
        } else {
          const url = new URL(`/no-permission`, NextRequest.url);
          return NextResponse.redirect(url);
        }
    }
  }
}

export const config = {
  matcher: ["/app/:path*", "/auth", "/organization/:path*", "/admin/:path*"],
};
