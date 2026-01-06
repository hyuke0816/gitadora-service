"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/shared/stores/user.store";
import { useLogin } from "@/entities/auth/api/auth.mutations";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { mutate: login, isPending: isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    login(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Login API response:", data); // 디버깅용

          // 사용자 정보를 store에 저장
          if (data.user) {
            setUser({
              id: data.user.id,
              gameUserId: data.user.gameUserId,
              username: data.user.username,
              role: data.user.role,
              name: data.user.name,
              ingamename: data.user.ingamename || null,
              title: data.user.title || null,
            });
          }

          // 역할에 따라 리다이렉트
          if (data.role === "ADMIN") {
            window.location.href = "/admin/versions";
            return;
          }

          if (data.role === "USER") {
            // 일반 사용자는 스킬 페이지로 이동 (gameUserId 사용)
            const gameUserId = data.gameUserId ?? data.user?.gameUserId;
            console.log("Extracted gameUserId:", gameUserId, "from data:", {
              gameUserId: data.gameUserId,
              userGameUserId: data.user?.gameUserId,
            });

            if (gameUserId) {
              window.location.href = `/user/${gameUserId}/skill`;
            } else {
              console.warn("gameUserId not found, redirecting to /user");
              window.location.href = "/user";
            }
            return;
          }
        },
        onError: (err: Error) => {
          setError(err.message || "로그인 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            GITADORA Service
          </h1>
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">
            로그인
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                사용자명
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="사용자명을 입력하세요"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>뒤로가기</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-2">
              샘플 계정:
            </p>
            <div className="text-xs text-center space-y-1 text-gray-500 dark:text-gray-500">
              <p>관리자: admin / admin</p>
              <p>사용자: user / user</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
