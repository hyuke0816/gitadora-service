"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAuthMe } from "@/entities/auth/api/auth.service";
import { getAllSongs } from "@/entities/songs/api/songs.service";
import { getAllArtists } from "@/entities/artists/api/artists.service";
import { getAllVersions } from "@/entities/versions/api/versions.service";
import { httpGet } from "@/shared/lib/http";
import { useUserStore } from "@/shared/stores/user.store";

interface DashboardStats {
  totalUsers: number;
  totalSongs: number;
  totalArtists: number;
  totalVersions: number;
}

function UsageSection() {
  const [bookmarkletCode, setBookmarkletCode] = useState("");
  const [copied, setCopied] = useState(false);
  const bookmarkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const code = `javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='${origin}/js/uploaddata.js';d.head.appendChild(s);}(document));`;
      setBookmarkletCode(code);

      if (bookmarkRef.current) {
        bookmarkRef.current.href = code;
      }
    }
  }, []);

  useEffect(() => {
    if (bookmarkRef.current && bookmarkletCode) {
      bookmarkRef.current.href = bookmarkletCode;
    }
  }, [bookmarkletCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopied(true);
    toast.success("클립보드에 복사되었습니다");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 my-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        사용법
      </h2>

      <div className="space-y-6">
        {/* 드래그 앤 드롭 설치 섹션 */}
        <div className="flex flex-col items-center justify-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
            가장 쉬운 방법: 드래그 앤 드롭
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            아래 버튼을 마우스로 잡고 브라우저 상단의{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              북마크 바
            </span>
            로 끌어서 놓으세요.
          </p>

          <a
            ref={bookmarkRef}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-move ring-4 ring-blue-500/20"
            title="이 버튼을 북마크 바로 드래그하세요"
          >
            <span className="text-2xl">📤</span>
            <span>GITADORA 스킬 업로드</span>
          </a>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-700">
            💡 <strong>북마크 바가 안 보이나요?</strong>{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-sans text-xs">
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-sans text-xs">
              Shift
            </kbd>{" "}
            +{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-sans text-xs">
              B
            </kbd>{" "}
            (Mac:{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-sans text-xs">
              Cmd
            </kbd>
            +
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-sans text-xs">
              Shift
            </kbd>
            +
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-sans text-xs">
              B
            </kbd>
            )를 눌러보세요.
          </p>
        </div>

        <div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            또는 수동으로 추가하기:
          </p>
        </div>

        <div>
          <div className="relative group">
            <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm break-all pr-12">
              {bookmarkletCode || "Loading..."}
            </div>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              title="코드 복사"
            >
              {copied ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9h13M4 11h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            추가한 북마크를 GITADORA 웹 페이지에 로그인 후 적용하면 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

function FutureFeaturesSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 my-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        기능 추가 예정 항목
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>전곡 기록 저장</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>플레이 카운트 기록 저장</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>슈랜타워 기록 저장</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>타 사이트 기록 이전 (베타유저 한정)</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>모바일 페이지 추가</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>코나스테 기록 저장</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>아레나 모델 설정 공유</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>곡 즐겨찾기 관리 및 추가</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>최신 정보 대시보드 화면 추가</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>공지사항 페이지 추가</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>제보 페이지 추가</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>지역별 게임센터 기기 정보</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>추천곡 페이지 추가</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>광고 추가 (서버 유지비용..)</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // 사용자 정보 확인
  useEffect(() => {
    getAuthMe()
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser({
            id: data.user.userId,
            gameUserId: data.user.gameUserId,
            username: data.user.username,
            role: data.user.role,
            name: data.user.name,
            ingamename: data.user.ingamename || null,
            title: data.user.title || null,
          });
        }
      })
      .catch(() => {
        // 에러 발생 시 무시
      });
  }, [setUser]);

  // 대시보드 통계 조회
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [songs, artists, versions, rankings] = await Promise.all([
        getAllSongs(),
        getAllArtists(),
        getAllVersions(),
        httpGet<any[]>("/api/users/skill-rankings?instrumentType=GUITAR"),
      ]);

      return {
        totalUsers: rankings?.length || 0,
        totalSongs: songs?.length || 0,
        totalArtists: artists?.length || 0,
        totalVersions: versions?.length || 0,
      };
    },
  });

  return (
    <div className="min-h-screen">
      {/* Usage Section */}
      <UsageSection />
      {/* Future Features Section */}
      <FutureFeaturesSection />
    </div>
  );
}
