"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useUserStore } from "@/shared/stores/user.store";
import { SkillPageSkeleton } from "@/components/Skeleton";
import { getSkillColorStyle } from "@/shared/utils/skill.utils";
import { InstrumentTypeSelector } from "@/shared/components/InstrumentTypeSelector";
import { getAuthMe } from "@/entities/auth/api/auth.service";
import {
  useUserSkill,
  SkillRecord,
  SkillHistory,
  SkillData,
} from "@/entities/users/api/users.queries";

// 달성률에 따른 등급 표시
const getAchievementGrade = (achievement: number): string => {
  if (achievement >= 95.0) return "SS";
  if (achievement >= 80.0 && achievement < 95.0) return "S";
  if (achievement >= 73.0 && achievement < 80.0) return "A";
  if (achievement >= 60.0 && achievement < 73.0) return "B";
  return "C";
};

// 난이도 축약형 표시
const getDifficultyShort = (difficulty: string): string => {
  const shortMap: Record<string, string> = {
    BASIC: "BAS",
    ADVANCED: "ADV",
    EXTREME: "EXT",
    MASTER: "MAS",
  };
  return shortMap[difficulty] || difficulty;
};

export default function SkillPage() {
  const params = useParams();
  const userId = parseInt(params.id as string);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // URL 쿼리 파라미터에서 버전 정보 가져오기
  const [versionParam, setVersionParam] = useState<string | null>(null);

  // 초기 instrumentType을 URL 파라미터에서 읽기
  const [instrumentType, setInstrumentType] = useState<"GUITAR" | "DRUM">(
    () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const instrumentType = params.get("instrumentType");
        if (instrumentType === "GUITAR" || instrumentType === "DRUM") {
          return instrumentType;
        }
      }
      return "GUITAR";
    }
  );

  // 클라이언트 사이드에서 URL 파라미터 읽기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const version = params.get("version");
      const instrumentType = params.get("instrumentType") as
        | "GUITAR"
        | "DRUM"
        | null;
      setVersionParam(version);
      if (instrumentType === "GUITAR" || instrumentType === "DRUM") {
        setInstrumentType(instrumentType);
      }
    }
  }, []);

  // URL 변경 감지 (브라우저 뒤로가기/앞으로가기 등)
  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const version = params.get("version");
        const instrumentType = params.get("instrumentType") as
          | "GUITAR"
          | "DRUM"
          | null;
        setVersionParam(version);
        if (instrumentType === "GUITAR" || instrumentType === "DRUM") {
          setInstrumentType(instrumentType);
        }
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(
    null
  ); // 선택된 히스토리 ID
  const [isHotTableOpen, setIsHotTableOpen] = useState(true); // HOT 테이블 접기/펼치기
  const [isOtherTableOpen, setIsOtherTableOpen] = useState(true); // OTHER 테이블 접기/펼치기

  // 섹션 참조
  const hotSectionRef = useRef<HTMLDivElement>(null);
  const otherSectionRef = useRef<HTMLDivElement>(null);

  // 섹션으로 스크롤하는 함수
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // HOT 버튼 클릭 핸들러
  const handleHotClick = () => {
    setIsHotTableOpen(true);
    setIsOtherTableOpen(false);
    setTimeout(() => {
      scrollToSection(hotSectionRef as React.RefObject<HTMLDivElement>);
    }, 100);
  };

  // OTHER 버튼 클릭 핸들러
  const handleOtherClick = () => {
    setIsHotTableOpen(false);
    setIsOtherTableOpen(true);
    setTimeout(() => {
      scrollToSection(otherSectionRef as React.RefObject<HTMLDivElement>);
    }, 100);
  };

  // TOTAL 버튼 클릭 핸들러
  const handleTotalClick = () => {
    setIsHotTableOpen(true);
    setIsOtherTableOpen(true);
    setTimeout(() => {
      scrollToSection(hotSectionRef as React.RefObject<HTMLDivElement>);
    }, 100);
  };

  // 사용자 정보가 없으면 가져오기
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
        })
        .catch(() => {
          // 에러 발생 시 무시
        });
    }
  }, [user, setUser]);

  // 스킬 데이터 조회
  const { data: skillData, isLoading } = useUserSkill(userId, instrumentType, {
    historyId: selectedHistoryId || undefined,
    version: versionParam || undefined,
  });

  if (isNaN(userId)) {
    return (
      <div className="max-w-6xl mx-auto py-6">
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          잘못된 사용자 ID입니다.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <SkillPageSkeleton />;
  }

  if (!skillData) {
    return (
      <div className="max-w-6xl mx-auto py-6">
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          스킬 데이터를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  // 버전 이름 결정 (버전 파라미터가 있으면 버전 이름, 없으면 기본 텍스트)
  // URL 디코딩 처리
  const pageTitle = versionParam
    ? decodeURIComponent(versionParam)
    : "내 스킬 정보";

  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {pageTitle}
        </h1>
        {user && (
          <div className="mb-2 flex items-center gap-3">
            {user.title && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium">
                {user.title}
              </span>
            )}
            {user.ingamename && (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user.ingamename}
              </span>
            )}
          </div>
        )}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          나의 스킬 데이터를 확인할 수 있습니다
        </p>
      </div>

      {/* 악기 타입 선택 */}
      <InstrumentTypeSelector
        instrumentType={instrumentType}
        onInstrumentTypeChange={(type) => {
          setInstrumentType(type);
          setSelectedHistoryId(null); // 악기 타입 변경 시 히스토리 선택 초기화
          setIsHotTableOpen(true); // 악기 타입 변경 시 테이블 접힘 상태 초기화
          setIsOtherTableOpen(true);
        }}
      />

      {/* 스킬 요약 카드 */}
      {skillData.totalSkill > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 총 스킬 */}
          <div
            className={`shadow-lg rounded-lg p-4 text-white cursor-pointer transition-transform hover:scale-105 ${
              skillData.totalSkill < 1000 ? "text-gray-900" : ""
            } ${getSkillColorStyle(skillData.totalSkill).className || ""}`}
            style={{
              background:
                getSkillColorStyle(skillData.totalSkill).background ||
                undefined,
            }}
            onClick={handleTotalClick}
          >
            <div className="text-xs font-medium opacity-90 mb-1">TOTAL</div>
            <div className="text-2xl font-bold">
              {skillData.totalSkill.toFixed(2)}
            </div>
          </div>

          {/* HOT 스킬 */}
          <div
            className="bg-[#ff69a0] shadow-lg rounded-lg p-4 text-white cursor-pointer transition-transform hover:scale-105"
            onClick={handleHotClick}
          >
            <div className="text-xs font-medium opacity-90 mb-1">HOT</div>
            <div className="text-2xl font-bold">
              {skillData.hotSkill.toFixed(2)}
            </div>
          </div>

          {/* OTHER 스킬 */}
          <div
            className="bg-[#707bdd] shadow-lg rounded-lg p-4 text-white cursor-pointer transition-transform hover:scale-105"
            onClick={handleOtherClick}
          >
            <div className="text-xs font-medium opacity-90 mb-1">OTHER</div>
            <div className="text-2xl font-bold">
              {skillData.otherSkill.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* HOT 스킬 테이블 */}
      <div
        ref={hotSectionRef}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 mb-6 border border-gray-200 dark:border-gray-700"
      >
        <div
          className={`flex items-center justify-between ${
            isHotTableOpen ? "mb-6" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#ff69a0]/20 dark:bg-[#ff69a0]/30 rounded-lg">
              <h2 className="text-2xl font-bold text-[#ff69a0] dark:text-[#ff69a0]">
                HOT
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsHotTableOpen(!isHotTableOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            aria-label={isHotTableOpen ? "테이블 접기" : "테이블 펼치기"}
          >
            <svg
              className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                isHotTableOpen ? "rotate-180" : ""
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
        </div>

        {isHotTableOpen && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm table-fixed">
              <colgroup>
                <col className="w-16 hidden sm:table-column" />
                <col className="w-auto" />
                <col className="w-14 sm:w-20" />
                <col className="w-24 sm:w-32" />
                <col className="w-16 sm:w-24" />
                <col className="w-8 hidden sm:table-column" />
              </colgroup>
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                  <th className="hidden sm:table-cell px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    No
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    곡
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    난이도
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    달성률
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    스킬
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {skillData.hotRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      HOT 스킬 데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  skillData.hotRecords.map((record, idx) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-[#ff69a0]/10 dark:hover:bg-[#ff69a0]/10 bg-white dark:bg-gray-800"
                    >
                      <td className="hidden sm:table-cell px-4 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {idx + 1}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-900 dark:text-gray-100 font-medium whitespace-normal break-words">
                        {record.songTitle}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {getDifficultyShort(record.difficulty)}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {record.achievement.toFixed(2)}% (
                        {getAchievementGrade(record.achievement)})
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-900 dark:text-gray-100 font-semibold">
                        {record.skillScore.toFixed(2)}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* OTHER 스킬 테이블 */}
      <div
        ref={otherSectionRef}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 mb-6 border border-gray-200 dark:border-gray-700"
      >
        <div
          className={`flex items-center justify-between ${
            isOtherTableOpen ? "mb-6" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#707bdd]/20 dark:bg-[#707bdd]/30 rounded-lg">
              <h2 className="text-2xl font-bold text-[#707bdd] dark:text-[#707bdd]">
                OTHER
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsOtherTableOpen(!isOtherTableOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            aria-label={isOtherTableOpen ? "테이블 접기" : "테이블 펼치기"}
          >
            <svg
              className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                isOtherTableOpen ? "rotate-180" : ""
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
        </div>

        {isOtherTableOpen && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm table-fixed">
              <colgroup>
                <col className="w-16 hidden sm:table-column" />
                <col className="w-auto" />
                <col className="w-14 sm:w-20" />
                <col className="w-24 sm:w-32" />
                <col className="w-16 sm:w-24" />
                <col className="w-8 hidden sm:table-column" />
              </colgroup>
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                  <th className="hidden sm:table-cell px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    No
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    곡
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    난이도
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    달성률
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                    스킬
                  </th>
                  <th className="hidden sm:table-cell px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {skillData.otherRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      OTHER 스킬 데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  skillData.otherRecords.map((record, idx) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-[#707bdd]/10 dark:hover:bg-[#707bdd]/10 bg-white dark:bg-gray-800"
                    >
                      <td className="hidden sm:table-cell px-4 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {idx + 1}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-900 dark:text-gray-100 font-medium whitespace-normal break-words">
                        {record.songTitle}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {getDifficultyShort(record.difficulty)}
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {record.achievement.toFixed(2)}% (
                        {getAchievementGrade(record.achievement)})
                      </td>
                      <td className="px-2 sm:px-4 py-4 text-gray-900 dark:text-gray-100 font-semibold">
                        {record.skillScore.toFixed(2)}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4"></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 스킬 이력 테이블 - 레퍼런스 스타일 */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            스킬 이력
          </h2>
          {selectedHistoryId && (
            <button
              onClick={() => setSelectedHistoryId(null)}
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
            >
              현재 데이터로 돌아가기
            </button>
          )}
        </div>
        {selectedHistoryId && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <span className="font-semibold">선택된 날짜:</span>{" "}
              {skillData.history?.find((h) => h.id === selectedHistoryId) &&
                format(
                  new Date(
                    skillData.history.find(
                      (h) => h.id === selectedHistoryId
                    )!.recordedAt
                  ),
                  "yyyy년 MM월 dd일 HH:mm"
                )}{" "}
              이전의 데이터를 표시 중입니다.
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                <th className="hidden sm:table-cell px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                  No
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                  SKILL
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-wider">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {!skillData.history || skillData.history.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    스킬 이력 데이터가 없습니다
                  </td>
                </tr>
              ) : (
                skillData.history.map((history, idx) => {
                  const historyDate = new Date(history.recordedAt);
                  const isSelected = selectedHistoryId === history.id;
                  return (
                    <tr
                      key={history.id}
                      onClick={() => setSelectedHistoryId(history.id)}
                      className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          : "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                    >
                      <td className="hidden sm:table-cell px-4 py-4 text-gray-700 dark:text-gray-300 font-medium">
                        {skillData.history.length - idx}
                      </td>
                      <td className="px-4 py-4 text-gray-900 dark:text-gray-100 font-semibold">
                        {history.totalSkill.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                        {format(historyDate, "yyyy/MM/dd HH:mm")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
