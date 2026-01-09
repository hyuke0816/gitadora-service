import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isAuth = !!req.auth;
  const { nextUrl } = req;
  const user = req.auth?.user;

  // 예외 처리할 경로들
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = nextUrl.pathname === "/login";
  const isOnboardingRoute = nextUrl.pathname === "/onboarding";
  const isOnboardingApiRoute = nextUrl.pathname === "/api/users/me/onboarding";
  
  // 정적 파일 등은 matcher에서 이미 제외되지만 안전장치
  if (nextUrl.pathname.startsWith("/_next") || nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  // 1. 관리자 페이지 접근 제어
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // 2. 온보딩 리다이렉트 로직
  if (isAuth) {
    // 온보딩이 완료되지 않은 경우
    if (!user?.isOnboarded) {
      // 이미 온보딩 페이지나 관련 API, 로그아웃 등에 있다면 통과
      if (isOnboardingRoute || isOnboardingApiRoute || isApiAuthRoute) {
        return NextResponse.next();
      }
      // 그 외 모든 경로는 온보딩으로 리다이렉트
      return NextResponse.redirect(new URL("/onboarding", nextUrl));
    }

    // 온보딩이 완료된 경우
    // if (isOnboardingRoute) {
    //   // 온보딩 페이지 접근 시 홈으로 리다이렉트
    //   return NextResponse.redirect(new URL("/", nextUrl));
    // }
  }

  return NextResponse.next();
})

export const config = {
  // 모든 경로에 대해 미들웨어 실행 (static 파일, 이미지 제외)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
