import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/shared/lib/prisma"
import { UserRole, InstrumentType } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma) as any,
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL;
      
      // 관리자 이메일이면 로그인 할 때마다 권한을 ADMIN으로 강제 업데이트 (이미 가입된 유저 대응)
      if (adminEmail && user.email === adminEmail) {
        try {
          await prisma.user.update({
            where: { email: user.email },
            data: { role: UserRole.ADMIN },
          });
          // 메모리 상의 user 객체도 업데이트
          user.role = UserRole.ADMIN;
        } catch (error) {
          console.error("Failed to update admin role:", error);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
        // 토큰에 저장된 role 정보를 세션으로 전달
        session.user.role = token.role as UserRole;
        
        // 토큰에 게임 프로필 ID가 있으면 사용
        session.user.gameProfileId = token.gameProfileId as number | null;

        // 토큰에 게임 프로필 ID가 없으면 DB에서 조회 (업로드 직후 등 토큰 갱신 전 대응)
        if (!session.user.gameProfileId) {
          try {
            const gameProfile = await prisma.tb_users.findFirst({
              where: { socialUserId: token.sub },
              select: { id: true }
            });
            if (gameProfile) {
              session.user.gameProfileId = gameProfile.id;
            }
          } catch (error) {
            console.error("Failed to fetch game profile id in session:", error);
          }
        }

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
        token.role = user.role; // 로그인 시 user 객체의 role을 토큰에 저장
        token.nickname = user.nickname;
        token.bio = user.bio;
        token.isOnboarded = user.isOnboarded;
        token.preferredInstrument = user.preferredInstrument;
        
        // 게임 프로필 ID 조회 및 토큰에 저장
        try {
          const gameProfile = await prisma.tb_users.findFirst({
            where: { socialUserId: user.id },
            select: { id: true }
          });
          token.gameProfileId = gameProfile?.id || null;
        } catch (error) {
          console.error("Failed to fetch game profile id:", error);
          token.gameProfileId = null;
        }
      }

      // 토큰에 게임 프로필 ID가 없는데 사용자가 있는 경우 (토큰 갱신 시 재확인)
      if (!token.gameProfileId && token.sub) {
        try {
          const gameProfile = await prisma.tb_users.findFirst({
            where: { socialUserId: token.sub },
            select: { id: true }
          });
          if (gameProfile) {
            token.gameProfileId = gameProfile.id;
          }
        } catch (error) {
           // ignore error
        }
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
    },
  },
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
  secret: process.env.AUTH_SECRET, // 명시적 secret 추가 권장
})

