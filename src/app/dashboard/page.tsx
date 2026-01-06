"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const code = `javascript:void(!function(d){var s=d.createElement('script');s.type='text/javascript';s.src='${origin}/js/uploaddata.js';d.head.appendChild(s);}(document));`;
      setBookmarkletCode(code);
    }
  }, []);

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
        <div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            1. 아래의 스크립트를 북마크에 추가하세요.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 mb-4 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  ※일부 브라우저(예: 사파리, 크롬 모바일)는 북마크를 직접 새로
                  만드는 기능을 제공하지 않습니다. 그런 경우에는 아무 사이트나
                  북마크에 등록한 뒤, 해당 북마크의 URL을 아래 스크립트로
                  바꾸시면 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
            현행 버전용 스크립트:{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              GALAXY WAVE DELTA
            </span>{" "}
            (이 스크립트는 항상 현행 버전으로부터 스킬 데이터를 가져옵니다.
            버전이 바뀌었을 때 별도로 북마크를 수정하지 않아도 됩니다.)
          </p>

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
          <span>슈랜타워 기록</span>
        </div>
        <div className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
          <span className="text-2xl">➡️</span>
          <span>타 사이트 기록 이전</span>
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
