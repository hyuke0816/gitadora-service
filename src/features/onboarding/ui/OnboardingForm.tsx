"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface OnboardingFormProps {
  defaultNickname: string;
  defaultBio: string;
  defaultInstrument?: "GUITAR" | "DRUM";
  isEditMode?: boolean;
}

interface FormData {
  nickname: string;
  bio: string;
  preferredInstrument: "GUITAR" | "DRUM";
}

export function OnboardingForm({
  defaultNickname,
  defaultBio,
  defaultInstrument = "GUITAR",
  isEditMode = false,
}: OnboardingFormProps) {
  const { update, data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      nickname: defaultNickname,
      bio: defaultBio,
      preferredInstrument: defaultInstrument,
    },
  });

  const nicknameValue = watch("nickname");

  const onSubmit = async (data: FormData) => {
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

      toast.success(
        isEditMode ? "프로필이 수정되었습니다." : "프로필이 생성되었습니다."
      );

      router.refresh();
      if (!isEditMode) {
        // 처음 생성 시에는 대시보드로 이동
        router.push("/dashboard"); 
      }
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          <p className="text-red-500 text-xs pl-1">{errors.nickname.message}</p>
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
          <p className="text-red-500 text-xs pl-1">{errors.bio.message}</p>
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
        ) : isEditMode ? (
          "수정하기"
        ) : nicknameValue ? (
          "시작하기"
        ) : (
          "다음에 하기"
        )}
      </button>
    </form>
  );
}
