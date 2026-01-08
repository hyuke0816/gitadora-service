"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-800 p-4 relative overflow-hidden">
      {/* 장식용 배경 요소 (은은한 조명 효과) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700 p-8 sm:p-10 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 relative">
          {/* 로고 및 타이틀 영역 */}
          <div className="text-center mb-10 pt-4">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-2">
              Gitadora Service
            </h1>
            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-300 uppercase tracking-widest">
                Beta
              </p>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mb-8 text-center bg-gray-50/80 dark:bg-gray-700/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Gitadora Service는 Google 계정으로
              <br />
              간편하고 안전하게 이용할 수 있습니다.
            </p>
          </div>

          {/* 로그인 버튼 */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="cursor-pointer group relative w-full flex items-center justify-center gap-3 px-4 py-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* 호버 시 배경 효과 */}
              <div className="absolute inset-0 bg-gray-50 dark:bg-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

              <div className="relative flex items-center gap-3">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span className="font-semibold text-base">
                  Google 계정으로 계속하기
                </span>
              </div>
            </button>
          </div>

          {/* 푸터 영역 */}
          <div className="mt-8 text-center space-y-4">
            <button
              onClick={() => router.back()}
              className="cursor-pointer text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mx-auto"
            >
              이전 페이지로 돌아가기
            </button>

            <p className="text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-700">
              로그인 시 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
