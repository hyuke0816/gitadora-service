"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useSong } from "@entities/songs/api/songs.queries";
import { useAuthMe } from "@entities/auth/api/auth.queries";
import { versionsQueries } from "@entities/versions/api/versions.queries";
import { apiClient } from "@shared/api/instances";
import { useCreateSongLevel } from "@entities/songs/api/songs.mutaions";

interface Version {
  id: number;
  name: string;
  startedAt: string;
}

interface Tag {
  id: number;
  name: string;
  color: string | null;
}

interface SongTag {
  tag: Tag;
}

interface SkillDistribution {
  distribution: Record<
    string,
    Record<
      string,
      {
        count: number;
        avgAchievement: number;
        avgSkillScore: number;
        records: number[];
        points: { x: number; y: number; username: string }[];
      }
    >
  >;
  histogram: Record<string, Record<string, number[]>>;
  totalRecords: number;
}

interface Comment {
  id: number;
  content: string;
  userId: number | null;
  createdAt: string;
  user: {
    id: number;
    name: string;
    ingamename: string | null;
  } | null;
}

interface SongLevel {
  id: number;
  songId: number;
  versionId: number;
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN";
  difficulty: "BASIC" | "ADVANCED" | "EXTREME" | "MASTER";
  level: number;
  version: {
    id: number;
    name: string;
  };
}

interface TableRow {
  version: Version;
  versionId: number;
  [key: string]: SongLevel | Version | number | null | undefined;
}

interface UserSongDetailProps {
  songId: number;
}

const difficultyColors: Record<string, string> = {
  BASIC: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  ADVANCED:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  EXTREME: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
  MASTER:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
};

const difficultyLabels: Record<string, string> = {
  BASIC: "BSC",
  ADVANCED: "ADV",
  EXTREME: "EXT",
  MASTER: "MAS",
};

const difficultyFillColors: Record<string, string> = {
  BASIC: "#3b82f6",
  ADVANCED: "#eab308",
  EXTREME: "#ec4899",
  MASTER: "#a855f7",
};

const instrumentLabels: Record<string, string> = {
  GUITAR: "GUITAR",
  BASS: "BASS",
  DRUM: "DRUM",
  OPEN: "OPEN",
};

export function UserSongDetail({ songId }: UserSongDetailProps) {
  const router = useRouter();
  const { data: song, isLoading } = useSong(songId);
  const { data: auth } = useAuthMe();
  const { data: versions = [] } = useQuery(
    versionsQueries.getAllVersions()
  ) as { data: Version[] };
  const createSongLevel = useCreateSongLevel(songId);
  const hasInitializedLevels = useRef(false);
  const [distribution, setDistribution] = useState<SkillDistribution | null>(
    null
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingDistribution, setIsLoadingDistribution] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [selectedInstrument, setSelectedInstrument] =
    useState<string>("GUITAR");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("MASTER");
  const [chartScale, setChartScale] = useState<number>(1);

  // 페이지 진입 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 레벨 정보 처리
  const songLevels = useMemo(() => {
    return (song?.levels || []) as SongLevel[];
  }, [song]);

  // 레벨 정보가 없을 때 자동 생성
  useEffect(() => {
    if (
      !song ||
      !versions.length ||
      hasInitializedLevels.current ||
      songLevels.length > 0
    ) {
      return;
    }

    // 곡이 수록된 버전 찾기
    const songVersion = versions.find((v) => v.name === song.version);

    if (!songVersion) {
      return;
    }

    // 해당 버전부터 현재까지의 모든 버전 찾기 (startedAt 기준)
    const songVersionStartedAt = new Date(songVersion.startedAt).getTime();
    const targetVersions = versions.filter((v) => {
      const vStartedAt = new Date(v.startedAt).getTime();
      return vStartedAt >= songVersionStartedAt;
    });

    if (targetVersions.length === 0) {
      return;
    }

    // 자동 생성 시작
    hasInitializedLevels.current = true;

    const createLevels = async () => {
      const instruments = ["DRUM", "GUITAR", "BASS"];
      const difficulties = ["BASIC", "ADVANCED", "EXTREME", "MASTER"];

      for (const version of targetVersions) {
        for (const instrument of instruments) {
          for (const difficulty of difficulties) {
            try {
              await createSongLevel.mutateAsync({
                versionId: version.id,
                instrumentType: instrument,
                difficulty: difficulty,
                level: 0,
              });
            } catch {
              // 이미 존재하는 레벨이면 무시
              console.log(
                `Level already exists: ${version.name} - ${instrument} - ${difficulty}`
              );
            }
          }
        }
      }
    };

    createLevels();
  }, [song, versions, songLevels, createSongLevel]);

  // 레벨 정보를 버전별, 악기별, 난이도별로 그룹화
  const groupedLevels = useMemo(() => {
    const grouped: Record<
      number,
      Record<string, Record<string, SongLevel | null>>
    > = {};

    songLevels.forEach((level) => {
      if (!grouped[level.versionId]) {
        grouped[level.versionId] = {};
      }
      if (!grouped[level.versionId][level.instrumentType]) {
        grouped[level.versionId][level.instrumentType] = {};
      }
      grouped[level.versionId][level.instrumentType][level.difficulty] = level;
    });

    return grouped;
  }, [songLevels]);

  // 버전 목록 (레벨이 있는 버전만)
  const versionList = useMemo(() => {
    const versionIds = new Set(songLevels.map((level) => level.versionId));
    return versions
      .filter((v) => versionIds.has(v.id))
      .sort(
        (a, b) =>
          new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
      );
  }, [songLevels, versions]);

  // 테이블 데이터 준비
  const tableData = useMemo<TableRow[]>(() => {
    return versionList.map((version) => {
      const versionLevels = groupedLevels[version.id] || {};
      const rowData: TableRow = {
        version,
        versionId: version.id,
      };

      // 각 악기별 난이도별 레벨 데이터
      ["DRUM", "GUITAR", "BASS"].forEach((instrument) => {
        ["BASIC", "ADVANCED", "EXTREME", "MASTER"].forEach((difficulty) => {
          const level = versionLevels[instrument]?.[difficulty] || null;
          rowData[`${instrument}_${difficulty}`] = level;
        });
      });

      return rowData;
    });
  }, [versionList, groupedLevels]);

  // 컬럼 헬퍼
  const columnHelper = createColumnHelper<TableRow>();

  // 컬럼 정의
  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("version", {
        header: "버전",
        cell: (info) => (
          <div className="font-medium text-gray-800 dark:text-gray-200">
            {info.getValue().name}
          </div>
        ),
        enableSorting: false,
        size: 200,
      }),
    ];

    // 각 악기별 난이도 컬럼 추가
    ["DRUM", "GUITAR", "BASS"].forEach((instrument) => {
      ["BASIC", "ADVANCED", "EXTREME", "MASTER"].forEach((difficulty) => {
        cols.push(
          columnHelper.accessor(`${instrument}_${difficulty}`, {
            header: difficulty,
            cell: (info) => {
              const level = info.getValue() as unknown as SongLevel | null;
              return (
                <div
                  className={`px-2 py-2 text-center ${
                    level && level.level > 0
                      ? difficultyColors[difficulty] || ""
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {level && level.level > 0 ? level.level.toFixed(2) : "-"}
                </div>
              );
            },
            enableSorting: false,
            size: 60,
          })
        );
      });
    });

    return cols;
  }, [columnHelper]);

  // react-table 인스턴스
  const table = useReactTable<TableRow>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 기록 분포도 로드
  useEffect(() => {
    if (songId) {
      setIsLoadingDistribution(true);
      apiClient
        .get(`songs/${songId}/skill-distribution`)
        .json<SkillDistribution>()
        .then((data) => {
          setDistribution(data);
        })
        .catch((error) => {
          console.error("Failed to load distribution:", error);
        })
        .finally(() => {
          setIsLoadingDistribution(false);
        });
    }
  }, [songId]);

  // 코멘트 로드
  useEffect(() => {
    if (songId) {
      setIsLoadingComments(true);
      apiClient
        .get(`songs/${songId}/comments`)
        .json<Comment[]>()
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.error("Failed to load comments:", error);
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }
  }, [songId]);

  // YouTube URL에서 비디오 ID 추출
  const getYouTubeVideoId = (url: string | null | undefined): string | null => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const youtubeVideoId = useMemo(() => {
    return getYouTubeVideoId(song?.youtubeUrl);
  }, [song?.youtubeUrl]);

  // 코멘트 작성
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const comment = await apiClient
        .post(`songs/${songId}/comments`, {
          json: { content: newComment.trim() },
        })
        .json<Comment>();

      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      toast.error("코멘트 작성에 실패했습니다.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <main className="py-8 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center text-gray-900 dark:text-gray-100">
          로딩 중...
        </div>
      </main>
    );
  }

  if (!song) {
    return (
      <main className="py-8 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center text-red-600 dark:text-red-400">
          곡 정보를 찾을 수 없습니다.
        </div>
      </main>
    );
  }

  return (
    <main className="pt-4 pb-8 px-4 sm:py-8 sm:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          이전 페이지로 돌아가기
        </button>
      </div>

      {/* Song Info Card */}
      <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-blue-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              곡 정보
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {/* 앨범 커버 이미지 */}
            {song.imageUrl && (
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 mx-auto md:mx-0 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  제목
                </label>
                <div className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
                  {song.title}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  작곡가
                </label>
                <div className="text-gray-900 dark:text-gray-100">
                  {song.artist}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  BPM
                </label>
                <div className="text-gray-900 dark:text-gray-100">
                  {(() => {
                    const bpm = song.bpm;
                    if (!bpm) return "-";
                    // "min-max" 형식 파싱
                    const bpmParts = bpm.split("-");
                    if (bpmParts.length === 2) {
                      const minBpm = bpmParts[0].trim();
                      const maxBpm = bpmParts[1].trim();
                      // 최소와 최대가 같으면 하나만 표시
                      if (minBpm === maxBpm) {
                        return maxBpm;
                      }
                      return bpm;
                    }
                    return bpm;
                  })()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  버전
                </label>
                <div className="text-gray-900 dark:text-gray-100">
                  {song.version}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  태그
                </label>
                <div className="flex flex-wrap gap-2">
                  {song.isHot && (
                    <span className="px-3 py-1 rounded text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                      HOT
                    </span>
                  )}
                  {song.isLicense && (
                    <span className="px-3 py-1 rounded text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                      라이센스
                    </span>
                  )}
                  {song.isCover && (
                    <span className="px-3 py-1 rounded text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      커버
                    </span>
                  )}
                  {song.isLong && (
                    <span className="px-3 py-1 rounded text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                      롱곡
                    </span>
                  )}
                </div>
              </div>
              {song.tags && song.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    태그
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {song.tags.map((songTag: SongTag) => {
                      const tag = songTag.tag;
                      const tagColor = tag.color || "#3b82f6";
                      return (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: tagColor }}
                        >
                          {tag.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video Card */}
      {youtubeVideoId && (
        <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-red-500"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                영상 자료
              </h2>
            </div>
          </div>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Skill Distribution Card */}
      <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-green-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              기록 분포도
            </h2>
          </div>
          {distribution && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              총 {distribution.totalRecords}건의 기록
            </div>
          )}
        </div>

        {/* 필터링 UI */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {["GUITAR", "BASS", "DRUM"].map((inst) => (
              <button
                key={inst}
                onClick={() => setSelectedInstrument(inst)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedInstrument === inst
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {instrumentLabels[inst]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg overflow-x-auto">
            {["BASIC", "ADVANCED", "EXTREME", "MASTER"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedDifficulty === diff
                    ? `${difficultyColors[diff]} shadow-sm`
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {difficultyLabels[diff]}
              </button>
            ))}
          </div>
        </div>

        {isLoadingDistribution ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            로딩 중...
          </div>
        ) : distribution && distribution.totalRecords > 0 ? (
          <div className="space-y-8">
            {(() => {
              const instrument = selectedInstrument;
              const difficulty = selectedDifficulty;
              const stats = distribution.distribution[instrument]?.[difficulty];

              if (!stats) {
                return (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    해당 조건의 기록 데이터가 없습니다.
                  </div>
                );
              }

              return (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                        {instrumentLabels[instrument]}
                      </span>
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          difficultyColors[difficulty] || ""
                        }`}
                      >
                        {difficultyLabels[difficulty]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      기록:{" "}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {stats.count}
                      </span>
                      건 | 평균 달성률:{" "}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {stats.avgAchievement.toFixed(2)}%
                      </span>{" "}
                      | 평균 스킬:{" "}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {stats.avgSkillScore.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* 줌 버튼 */}
                    <div className="flex justify-end gap-2 mb-2">
                      {[
                        { label: "Fit", value: 1 },
                        { label: "x1.5", value: 1.5 },
                        { label: "x2", value: 2 },
                        { label: "x3", value: 3 },
                      ].map((zoom) => (
                        <button
                          key={zoom.label}
                          onClick={() => setChartScale(zoom.value)}
                          className={`px-3 py-1 text-xs font-medium rounded border transition-colors ${
                            chartScale === zoom.value
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          {zoom.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex h-80 w-full min-w-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                      {/* Y축 고정 영역 */}
                      <div className="w-[60px] h-full flex-shrink-0 border-r border-gray-100 dark:border-gray-700 z-10 bg-white dark:bg-gray-800">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart
                            margin={{
                              top: 20,
                              right: 0,
                              bottom: 20,
                              left: 0,
                            }}
                          >
                            <XAxis
                              type="number"
                              height={30}
                              tick={false}
                              axisLine={false}
                            />
                            <YAxis
                              type="number"
                              dataKey="y"
                              name="Achievement"
                              unit="%"
                              domain={[0, 100]}
                              tick={{ fontSize: 12 }}
                              width={60}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Scatter
                              data={[{ x: 0, y: 0 }]}
                              fill="transparent"
                            />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>

                      {/* 데이터 스크롤 영역 */}
                      <div className="flex-1 overflow-x-auto relative">
                        {stats.points && stats.points.length > 0 ? (
                          <div
                            className="h-full"
                            style={{
                              width:
                                chartScale === 1
                                  ? "100%"
                                  : `${chartScale * 100}%`,
                              minWidth: "100%",
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <ScatterChart
                                margin={{
                                  top: 20,
                                  right: 20,
                                  bottom: 20,
                                  left: 0,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  vertical={true}
                                  horizontal={true}
                                />
                                <XAxis
                                  type="number"
                                  dataKey="x"
                                  name="Skill"
                                  domain={["auto", "auto"]}
                                  tick={{ fontSize: 12 }}
                                  height={30}
                                />
                                <YAxis
                                  type="number"
                                  dataKey="y"
                                  domain={[0, 100]}
                                  hide={true} // Y축 숨김 (왼쪽 고정 차트 사용)
                                />
                                <RechartsTooltip
                                  cursor={{ strokeDasharray: "3 3" }}
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      const data = payload[0].payload;
                                      return (
                                        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-sm z-50">
                                          <p className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                                            {data.username}
                                          </p>
                                          <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                            <p>
                                              스킬:{" "}
                                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {data.x.toFixed(2)}
                                              </span>
                                            </p>
                                            <p>
                                              달성률:{" "}
                                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {data.y.toFixed(2)}%
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <Scatter
                                  name="Records"
                                  data={stats.points}
                                  fill={
                                    difficultyFillColors[difficulty] ||
                                    "#8884d8"
                                  }
                                  shape="circle"
                                />
                              </ScatterChart>
                            </ResponsiveContainer>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400">
                            데이터가 없습니다.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            기록 데이터가 없습니다.
          </div>
        )}
      </div>

      {/* Level Info Card */}
      <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-indigo-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              레벨 정보
            </h2>
          </div>
        </div>

        {songLevels.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            등록된 레벨 정보가 없습니다.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-[950px] w-full border-collapse text-sm whitespace-nowrap">
                <thead>
                  {/* 첫 번째 헤더 행: 악기 그룹 */}
                  <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <th
                      rowSpan={2}
                      className="px-4 py-3 text-left font-medium border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 whitespace-nowrap"
                    >
                      버전
                    </th>
                    {["DRUM", "GUITAR", "BASS"].map((instrument) => (
                      <th
                        key={instrument}
                        colSpan={4}
                        className="px-2 py-2 text-center font-medium border-r border-gray-300 dark:border-gray-600 whitespace-nowrap"
                      >
                        {instrumentLabels[instrument] || instrument}
                      </th>
                    ))}
                  </tr>
                  {/* 두 번째 헤더 행: 난이도 */}
                  <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {["DRUM", "GUITAR", "BASS"].map((instrument) =>
                      ["BASIC", "ADVANCED", "EXTREME", "MASTER"].map(
                        (difficulty) => (
                          <th
                            key={`${instrument}-${difficulty}`}
                            className="px-2 py-2 text-center font-medium text-xs border-r border-gray-300 dark:border-gray-600 last:border-r-0 whitespace-nowrap"
                          >
                            {difficultyLabels[difficulty] || difficulty}
                          </th>
                        )
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, rowIdx) => {
                    const isEven = rowIdx % 2 === 0;
                    return (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-200 dark:border-gray-700 ${
                          isEven
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-800/50"
                        } hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors`}
                      >
                        {row.getVisibleCells().map((cell, cellIdx) => {
                          const isFirstCell = cellIdx === 0;
                          return (
                            <td
                              key={cell.id}
                              className={`border-r border-gray-300 dark:border-gray-700 ${
                                isFirstCell ? "border-l px-4 py-2" : ""
                              }`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden space-y-4">
              {tableData.map((row) => (
                <div
                  key={row.versionId}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
                >
                  <div className="font-bold text-lg mb-3 pb-2 border-b border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    {row.version.name}
                  </div>

                  <div className="space-y-4">
                    {["DRUM", "GUITAR", "BASS"].map((instrument) => (
                      <div key={instrument}>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          {instrumentLabels[instrument] || instrument}
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {["BASIC", "ADVANCED", "EXTREME", "MASTER"].map(
                            (difficulty) => {
                              const cellKey = `${instrument}_${difficulty}`;
                              const levelData = row[
                                cellKey
                              ] as unknown as SongLevel | null;

                              return (
                                <div key={difficulty} className="text-center">
                                  <div className="text-[10px] text-gray-400 mb-1">
                                    {difficultyLabels[difficulty]}
                                  </div>
                                  <div
                                    className={`py-1 rounded text-sm font-medium ${
                                      levelData && levelData.level > 0
                                        ? difficultyColors[difficulty] || ""
                                        : "bg-gray-50 dark:bg-gray-700/50 text-gray-300 dark:text-gray-600"
                                    }`}
                                  >
                                    {levelData && levelData.level > 0
                                      ? levelData.level.toFixed(2)
                                      : "-"}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Comments Card */}
      <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-purple-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              코멘트 ({comments.length})
            </h2>
          </div>
        </div>

        {/* 코멘트 목록 */}
        {isLoadingComments ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            로딩 중...
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {comment.user?.ingamename || comment.user?.name || "익명"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>
                <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            코멘트가 없습니다. 첫 번째 코멘트를 작성해보세요!
          </div>
        )}

        {/* 코멘트 작성 폼 */}
        {auth?.authenticated ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="코멘트를 입력하세요..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmittingComment}
                className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingComment ? "작성 중..." : "작성"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              코멘트를 작성하려면 로그인이 필요합니다.
            </p>
            {/* <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              로그인하기
            </button> */}
          </div>
        )}
      </div>
    </main>
  );
}
