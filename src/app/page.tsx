"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoadingSkeleton } from "@/components/Skeleton";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      // 관리자라면 관리자 페이지로 이동
      if (session.user.role === "ADMIN") {
        router.push("/admin/versions");
        return;
      }

      // 일반 사용자는 대시보드로 이동
      router.push("/dashboard");
    } else {
      // 로그인되지 않은 사용자는 대시보드로
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // 리다이렉트 중 스켈레톤 표시
  return <LoadingSkeleton />;
}
