"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { instrumentLabels } from "@/shared/components/InstrumentTypeSelector";

interface MenuItem {
  title: string;
  href?: string;
  children?: MenuItem[];
}

const adminMenuItems: MenuItem[] = [
  {
    title: "관리자 메뉴",
    children: [
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
    ]
  }
];

const getUserMenuItems = (userId: string | null): MenuItem[] => {
  const userSectionChildren: MenuItem[] = [
    {
      title: "유저목록",
      href: `/user/list`,
    },
  ];

  // 로그인 시 내 스킬 보기 메뉴 추가
  if (userId) {
    userSectionChildren.unshift({
      title: "내 스킬 보기",
      href: `/user/${userId}/skill`,
    });
  }

  return [
    {
      title: "유저 정보",
      children: userSectionChildren,
    },
    {
      title: "게임 정보",
      children: [
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
      ],
    },
  ];
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // 경로 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
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
    // 게임 프로필이 있으면 해당 ID 사용, 없으면 'me' 사용
    const targetPath = user?.gameProfileId
      ? `/user/${user.gameProfileId}/myinfo`
      : "/user/me/myinfo";

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
        <div className="hidden md:flex items-center gap-6">
          {/* Desktop Menu Items */}
          {!isLoading && menuItems.length > 0 && (
            <nav className="flex items-center gap-6 mr-2">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group py-4">
                  <button className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    {item.title}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-400"
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

                  {/* Dropdown Menu */}
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0 z-50">
                      {item.children.map((child) => {
                        const isActive =
                          pathname === child.href ||
                          pathname?.startsWith(child.href + "/");
                        return (
                          <Link
                            key={child.href}
                            href={child.href!}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <ThemeToggle />

            {/* Auth Buttons */}
            {isLoading ? (
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ) : user ? (
              <>
                <button
                  onClick={handleUserClick}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {user.nickname || user.name}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
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
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
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

      {/* Mobile Menu Overlay (Drawer) */}
      {mounted &&
        createPortal(
          <div
            className={`md:hidden fixed inset-0 z-[100] transition-all duration-300 ${
              isMobileMenuOpen ? "visible" : "invisible pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-out transform ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    메뉴
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
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
                  </button>
                </div>

                {/* Menu Content */}
                <div className="flex-1 p-4 space-y-6">
                  {isLoading ? (
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                  ) : user ? (
                    <div className="space-y-3">
                      <button
                        onClick={handleUserClick}
                        className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg shrink-0">
                          {(user.nickname || user.name || "U")[0]}
                        </div>
                        <div className="text-left overflow-hidden">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {user.nickname || user.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            내 정보 보기
                          </div>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
                    >
                      로그인 / 회원가입
                    </Link>
                  )}

                  {menuItems.length > 0 && (
                    <div className="space-y-6">
                      {menuItems.map((section, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="px-2 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {section.title}
                          </div>
                          {section.children?.map((item) => {
                            const isActive =
                              pathname === item.href ||
                              pathname?.startsWith(item.href + "/");
                            return (
                              <Link
                                key={item.href}
                                href={item.href!}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                  isActive
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                              >
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                    >
                      로그아웃
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
