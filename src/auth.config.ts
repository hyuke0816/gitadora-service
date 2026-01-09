import Google from "next-auth/providers/google"
import { UserRole, InstrumentType } from "@prisma/client"
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        // 환경 변수에 설정된 이메일은 가입 시 자동으로 ADMIN 권한 부여
        const adminEmail = process.env.ADMIN_EMAIL;
        const role = (adminEmail && profile.email === adminEmail) ? UserRole.ADMIN : UserRole.USER;
        
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: role,
          emailVerified: profile.email_verified ? new Date() : null,
          isOnboarded: false,
          preferredInstrument: InstrumentType.GUITAR, // 기본값
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  // 북마크릿(Cross-Site)에서의 세션 유지를 위한 쿠키 설정
  // PKCE 에러 해결을 위한 쿠키 설정 수정 (Lax 모드 사용)
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Middleware에서 세션 정보를 확인하기 위한 경량화된 콜백 (DB 호출 없음)
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        session.user.gameProfileId = token.gameProfileId as number | null;
        session.user.nickname = token.nickname as string | null;
        session.user.bio = token.bio as string | null;
        session.user.isOnboarded = token.isOnboarded as boolean;
        session.user.preferredInstrument = token.preferredInstrument as any;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.nickname = user.nickname;
        token.bio = user.bio;
        token.isOnboarded = user.isOnboarded;
        token.preferredInstrument = user.preferredInstrument;
        // gameProfileId는 DB 조회가 필요하므로 여기서는 처리하지 않거나 null로 둠
      }

      if (trigger === "update" && session) {
        token.nickname = session.user.nickname;
        if (session.user.bio !== undefined) {
          token.bio = session.user.bio;
        }
        if (session.user.isOnboarded !== undefined) {
          token.isOnboarded = session.user.isOnboarded;
        }
        if (session.user.preferredInstrument !== undefined) {
          token.preferredInstrument = session.user.preferredInstrument;
        }
      }

      return token;
    }
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
