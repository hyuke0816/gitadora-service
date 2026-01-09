"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeleteAccountButton from "@/app/user/[id]/myinfo/delete-account-button"; // 경로 확인 필요

interface OnboardingForm {
  nickname: string;
  bio: string;
  preferredInstrument: "GUITAR" | "DRUM";
}

export default function OnboardingPage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isOnboarded = session?.user?.isOnboarded;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OnboardingForm>({
    defaultValues: {
      nickname: session?.user?.nickname || "",
      bio: session?.user?.bio || "",
      preferredInstrument:
        (session?.user?.preferredInstrument as "GUITAR" | "DRUM") || "GUITAR",
    },
  });

  const nicknameValue = watch("nickname");

  useEffect(() => {
    // 이미 온보딩을 완료했더라도 프로필 수정을 위해 접근 허용
    // 리다이렉트 로직 제거
  }, [session, router]);

  const onSubmit = async (data: OnboardingForm) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/users/me/onboarding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile");
      }

      // 세션 업데이트
      await update({
        nickname: result.user.nickname,
        user: {
          ...session?.user,
          nickname: result.user.nickname,
          bio: result.user.bio,
          isOnboarded: true,
          preferredInstrument: result.user.preferredInstrument,
        },
      });

      router.refresh();
      router.replace("/dashboard");
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700 p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {isOnboarded ? "프로필 설정" : "환영합니다!"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isOnboarded
                ? "서비스에서 사용할 프로필을 수정할 수 있습니다."
                : "서비스에서 사용할 프로필을 설정해주세요."}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 닉네임 입력 */}
            <div className="space-y-2">
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임 (선택)"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.nickname
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 dark:border-gray-600 focus:ring-blue-500"
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:text-sm`}
                {...register("nickname", {
                  minLength: {
                    value: 2,
                    message: "2자 이상 입력해주세요",
                  },
                  maxLength: {
                    value: 12,
                    message: "12자 이하로 입력해주세요",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9가-힣]+$/,
                    message: "한글, 영문, 숫자만 사용 가능합니다",
                  },
                })}
              />
              {errors.nickname ? (
                <p className="text-red-500 text-xs pl-1">
                  {errors.nickname.message}
                </p>
              ) : (
                !nicknameValue && (
                  <p className="text-gray-400 text-xs pl-1">
                    * 닉네임을 설정하지 않으면 건너뜁니다.
                  </p>
                )
              )}
            </div>

            {/* 자기소개 입력 */}
            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                한 줄 소개
              </label>
              <input
                id="bio"
                type="text"
                placeholder="나를 표현하는 한 마디 (선택)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("bio", {
                  maxLength: {
                    value: 50,
                    message: "50자 이내로 입력해주세요",
                  },
                })}
              />
              {errors.bio && (
                <p className="text-red-500 text-xs pl-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* 선호하는 유형 (Instrument) 입력 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                선호하는 유형
              </label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value="GUITAR"
                    className="peer sr-only"
                    {...register("preferredInstrument")}
                  />
                  <div className="flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 transition-all font-medium">
                    GUITAR
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value="DRUM"
                    className="peer sr-only"
                    {...register("preferredInstrument")}
                  />
                  <div className="flex items-center justify-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 transition-all font-medium">
                    DRUM
                  </div>
                </label>
              </div>
            </div>

            {/* 에러 메시지 */}
            {serverError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl text-center">
                {serverError}
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 ${
                nicknameValue
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500"
              } text-white rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  처리중...
                </span>
              ) : isOnboarded ? (
                "수정하기"
              ) : nicknameValue ? (
                "시작하기"
              ) : (
                "다음에 하기"
              )}
            </button>
          </form>

          {isOnboarded && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    계정을 삭제하시겠습니까?
                  </p>
                  <DeleteAccountButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
