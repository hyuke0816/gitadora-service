"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = params.locale as Locale;

  const switchLocale = (newLocale: Locale) => {
    // 현재 경로에서 locale 부분을 새 locale로 교체
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLocale === locale
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

