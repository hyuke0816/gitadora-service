import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// 지원하는 언어 목록
export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

// 기본 언어
export const defaultLocale: Locale = "ko";

export default getRequestConfig(async ({ locale }) => {
  // 지원하지 않는 언어인 경우 404
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // 정적 import를 사용하여 메시지 로드
  let messages = {};
  try {
    switch (locale) {
      case "ko":
        messages = (await import("@/messages/ko.json")).default;
        break;
      case "en":
        messages = (await import("@/messages/en.json")).default;
        break;
      default:
        // 지원하지 않는 언어는 이미 위에서 체크했으므로 여기 도달하면 안 됨
        messages = (await import("@/messages/ko.json")).default;
    }
  } catch (error) {
    console.error("Failed to load messages for locale:", locale, error);
    // 기본 메시지로 fallback (에러가 발생해도 빈 객체라도 반환)
    try {
      messages = (await import("@/messages/ko.json")).default;
    } catch (fallbackError) {
      console.error("Failed to load fallback messages:", fallbackError);
      messages = {};
    }
  }

  return {
    locale: locale as string,
    messages,
  };
});
