"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthMe } from "@/entities/auth/api/auth.service";
import { LoadingSkeleton } from "@/components/Skeleton";
import { useUserStore } from "@/shared/stores/user.store";

export default function HomePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // store에 사용자 정보가 없으면 가져오기
    if (!user) {
      getAuthMe()
        .then((data) => {
          if (data.authenticated && data.user) {
            setUser({
              id: data.user.userId,
              gameUserId: data.user.gameUserId,
              username: data.user.username,
              role: data.user.role,
              name: data.user.name || null,
              ingamename: data.user.ingamename || null,
              title: data.user.title || null,
            });
          }
        })
        .catch(() => {
          // 에러 발생 시 무시
        });
    }
  }, [user, setUser]);

  useEffect(() => {
    if (user) {
      // 로그인된 사용자는 역할에 따라 리다이렉트
      if (user.role === "ADMIN") {
        router.push("/admin/versions");
      } else {
        // 일반 사용자는 스킬 페이지로 이동
        const gameUserId = user.gameUserId;
        if (gameUserId) {
          router.push(`/user/${gameUserId}/skill`);
        } else {
          router.push("/dashboard");
        }
      }
    } else {
      // 로그인되지 않은 사용자는 대시보드로
      router.push("/dashboard");
    }
  }, [user, router]);

  // 리다이렉트 중 스켈레톤 표시
  return <LoadingSkeleton />;
}
