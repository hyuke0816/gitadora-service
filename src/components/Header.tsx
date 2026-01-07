"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/shared/stores/user.store";
import { getAuthMe } from "@/entities/auth/api/auth.service";
import { instrumentLabels } from "@/shared/components/InstrumentTypeSelector";

const adminMenuItems = [
  {
    title: "버전 정보 관리",
    href: "/admin/versions",
    icon: "📦",
  },
  {
    title: "작곡가 정보 관리",
    href: "/admin/artists",
    icon: "🎼",
  },
  {
    title: "노래 정보 관리",
    href: "/admin/songs",
    icon: "🎵",
  },
  {
    title: "태그 정보 관리",
    href: "/admin/tags",
    icon: "🏷️",
  },
  {
    title: "이벤트 관리",
    href: "/admin/events",
    icon: "🎉",
  },
];

const getUserMenuItems = (userId: string | null) => [
  {
    title: "유저목록",
    href: `/user/list`,
    icon: "👥",
  },
  {
    title: "노래정보",
    href: `/user/songs`,
    icon: "🎵",
  },
  {
    title: "버전정보",
    href: `/user/versions`,
    icon: "📦",
  },
  {
    title: "작곡가정보",
    href: `/user/artists`,
    icon: "🎼",
  },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 데스크탑 드롭다운 메뉴
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // 스크롤 감지하여 헤더 숨김/표시 처리
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 최상단이거나 스크롤을 올릴 때 표시
      if (currentScrollY < 10 || currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        // 스크롤을 내릴 때 숨김 (최상단 제외)
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 사용자 정보 조회
  useEffect(() => {
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
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user, setUser]);

  // 메뉴 외부 클릭 시 닫기 (데스크탑)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // 경로 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      // 사용자 스토어 초기화
      clearUser();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAdmin = user?.role === "ADMIN";

  // 유저 페이지 경로 확인
  const isUserPage = pathname?.startsWith("/user");
  const isDashboard = pathname === "/" || pathname === "/dashboard";
  const userIdMatch = pathname?.match(/^\/user\/(\d+)/);
  const userIdFromPath = userIdMatch ? userIdMatch[1] : null;
  const userId =
    userIdFromPath ||
    user?.gameUserId?.toString() ||
    user?.id?.toString() ||
    null;

  // 표시할 메뉴 아이템 결정
  const menuItems = isAdmin
    ? adminMenuItems
    : isUserPage || isDashboard
    ? getUserMenuItems(userId)
    : [];

  // 탭을 표시할 경로인지 확인
  const isTabVisiblePage =
    pathname === "/user/list" || /^\/user\/\d+\/skill$/.test(pathname || "");

  // 현재 선택된 악기 (URL 파라미터 기준, 기본값 GUITAR)
  const currentInstrument =
    (searchParams?.get("instrumentType") as "GUITAR" | "DRUM") || "GUITAR";

  const handleTabChange = (type: "GUITAR" | "DRUM") => {
    // 기존 쿼리 파라미터 유지하면서 instrumentType만 변경
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("instrumentType", type);
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Gitadora Service (베타)
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          {/* Menu Dropdown (Admin or User) */}
          {isLoading ? null : menuItems.length > 0 ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <span>메뉴</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  {menuItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname?.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {/* Language Switcher Button */}
          {/* <button
            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={() => {
              toast.info("다국어 설정 (준비 중)");
            }}
          >
            언어
          </button> */}

          {/* Auth Buttons */}
          {isLoading ? (
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : user ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user.username} ({user.role === "ADMIN" ? "관리자" : "사용자"})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : /* <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors"
            >
              로그인
            </Link> */
          null}
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Auth (Login only if not logged in) - Optional, kept in menu for now or show minimal info? 
              Let's put everything in the hamburger menu for cleaner look, 
              but maybe show Login button if not logged in? 
              For now, just hamburger.
          */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 확장 탭 UI (조건부 렌더링) */}
      {isTabVisiblePage && (
        <div className="flex border-t border-gray-100 dark:border-gray-800">
          {(["GUITAR", "DRUM"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className="flex-1 relative py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex justify-center items-center h-full">
                <span
                  className={`relative h-full flex items-center px-1 text-sm font-bold transition-colors ${
                    currentInstrument === type
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                  }`}
                >
                  {instrumentLabels[type]}
                  {currentInstrument === type && (
                    <div className="absolute bottom-[-13px] left-0 right-0 h-[4px] bg-blue-500 rounded-full" />
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* User Info / Auth Status */}
            {isLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
            ) : user ? (
              <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {user.username}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user.role === "ADMIN" ? "관리자" : "사용자"}
                </div>
              </div>
            ) : /* <Link
                href="/login"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors"
              >
                로그인
              </Link> */
            null}

            {/* Menu Items */}
            {menuItems.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="px-2 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  메뉴
                </div>
                {menuItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Language & Logout */}
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {/* <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-left"
                onClick={() => {
                  toast.info("다국어 설정 (준비 중)");
                }}
              >
                <span className="text-xl">🌐</span>
                <span>언어 설정</span>
              </button> */}

              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-left"
                >
                  <span className="text-xl">🚪</span>
                  <span>로그아웃</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
