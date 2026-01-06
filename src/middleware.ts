import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 관리자 경로 체크
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("session_data");

    // 세션 쿠키가 없으면 홈으로 리다이렉트
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // 쿠키 디코딩
      const decoded = JSON.parse(
        Buffer.from(sessionCookie.value, "base64").toString("utf-8")
      );

      // 관리자 권한 체크 (role이 ADMIN인지 확인)
      if (decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      // 쿠키 파싱 에러 시 홈으로 리다이렉트
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
