"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { instrumentLabels } from "@/shared/components/InstrumentTypeSelector";

const adminMenuItems = [
  {
    title: "버전 정보 관리",
    href: "/admin/versions",
  },
  {
    title: "작곡가 정보 관리",
    href: "/admin/artists",
  },
  {
    title: "노래 정보 관리",
    href: "/admin/songs",
  },
  {
    title: "태그 정보 관리",
    href: "/admin/tags",
  },
  {
    title: "이벤트 관리",
    href: "/admin/events",
  },
];

const getUserMenuItems = (userId: string | null) => {
  const items = [
    {
      title: "유저목록",
      href: `/user/list`,
    },
    {
      title: "노래정보",
      href: `/user/songs`,
    },
    {
      title: "버전정보",
      href: `/user/versions`,
    },
    {
      title: "작곡가정보",
      href: `/user/artists`,
    },
  ];

  if (userId) {
    items.unshift({
      title: "내 정보 관리",
      href: `/user/${userId}/myinfo`,
    });
  }

  return items;
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 데스크탑 드롭다운 메뉴
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴
  const menuRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "loading";
  const user = session?.user;

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // 스크롤 감지하여 헤더 숨김/표시 처리
  useEffect(() => {
    const handleScroll = () => {
      // 모바일 메뉴가 열려있으면 헤더 숨김 처리 하지 않음
      if (isMobileMenuOpen) return;

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
  }, [isMobileMenuOpen]);

  // 모바일 메뉴 열림 시 바디 스크롤 잠금
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    await signOut({ callbackUrl: "/" });
  };

  // 사용자 권한 확인 (임시: 이메일 등으로 관리자 권한 부여 로직 필요할 수 있음)
  // 현재는 user.role 같은 정보가 없으므로 기본값 사용하거나,
  // auth.ts에서 session callback으로 role 정보를 넣어줘야 함.
  // 일단 여기서는 user가 있으면 로그인된 것으로 간주
  // const isAdmin = user?.role === "ADMIN";
  const isAdmin = false; // TODO: 관리자 권한 로직 추가 필요

  // 유저 페이지 경로 확인
  const isUserPage = pathname?.startsWith("/user");
  const isDashboard = pathname === "/" || pathname === "/dashboard";
  const userIdMatch = pathname?.match(/^\/user\/(\d+)/);
  const userIdFromPath = userIdMatch ? userIdMatch[1] : null;
  const userId =
    userIdFromPath || session?.user?.gameProfileId?.toString() || null;

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

  const handleUserClick = () => {
    const targetPath = user?.gameProfileId
      ? `/user/${user.gameProfileId}/myinfo`
      : "/onboarding";

    if (pathname !== targetPath) {
      router.push(targetPath);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white dark:bg-gray-900 transition-transform duration-300 border-b border-gray-200 dark:border-gray-800 ${
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
                        {/* 아이콘 제거됨 */}
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}

          {/* Auth Buttons */}
          {isLoading ? (
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : user ? (
            <>
              {/* 프로필 이미지 제거됨 */}
              <button
                onClick={handleUserClick}
                className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                {user.nickname || user.name}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors"
            >
              로그인
            </Link>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-2">
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
        <div className="flex">
          {(["GUITAR", "DRUM"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className="flex-1 relative py-3 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors group"
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
              <button
                onClick={handleUserClick}
                className="w-full flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  {/* 프로필 이미지 제거됨 */}
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {user.nickname || user.name}
                  </div>
                </div>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors"
              >
                로그인
              </Link>
            )}

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
                      {/* 아이콘 제거됨 */}
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Logout */}
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-left"
                >
                  {/* 아이콘 제거됨 */}
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
