import { NextResponse } from "next/server";
import withSession from "./src/hooks/withSession";

export async function middleware(NextRequest) {
  const token = NextRequest.cookies.get("access_token")?.value;
  const refreshToken = NextRequest.cookies.get("refresh_token")?.value;

  //checking token in auth page
  if (NextRequest.nextUrl.pathname.startsWith("/auth") && refreshToken) {
    const url = new URL(`/app`, NextRequest.url);
    return NextResponse.redirect(url);
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
      return response;
    }
    if (!token || error) {
      const response = NextResponse.next();
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      if (NextRequest.nextUrl.pathname.startsWith("/app")) {
        const url = new URL(`/auth`, NextRequest.url);
        return NextResponse.redirect(url);
      }
      return response;
    }
  }
}

export const config = {
  matcher: ["/app/:path*", "/auth"],
};
