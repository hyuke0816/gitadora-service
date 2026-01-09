import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/shared/lib/prisma"
import { UserRole } from "@prisma/client"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  ...authConfig,
  // Providers는 authConfig에서 가져오므로 중복 정의 불필요하지만,
  // NextAuth가 병합 처리를 하므로 명시적으로 다시 적지 않아도 됨.
  
  callbacks: {
    ...authConfig.callbacks, // 기본 경량 콜백 가져오기
    
    // DB 사용이 필요한 로직으로 오버라이드
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
      // 기본 매핑 실행 (authConfig의 로직과 유사하지만 DB 로직 추가를 위해 다시 정의)
      if (token?.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        
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
        token.role = user.role; 
        token.nickname = user.nickname;
        token.bio = user.bio;
        token.isOnboarded = user.isOnboarded;
        token.preferredInstrument = user.preferredInstrument;
        
        // 게임 프로필 ID 조회 및 토큰에 저장 (DB 사용)
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
})
