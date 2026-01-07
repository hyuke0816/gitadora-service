"use client";

import { useMemo, useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { versionsQueries } from "@entities/versions/api/versions.queries";
import { useSongs } from "@entities/songs/api/songs.queries";
import Link from "next/link";
import { Tag } from "@entities/tags";

interface Song {
  id: number;
  title: string;
  artist: string;
  bpm?: string | null;
  version: string;
  imageUrl?: string | null;
  isExist?: boolean;
  isHot?: boolean;
  isLicense?: boolean;
  isCover?: boolean;
  isLong?: boolean;
  createdAt: string;
  updatedAt: string;
  artistInfo?: {
    id: number;
    name: string;
    aliases?: Array<{ alias: string }>;
  } | null;
  tags?: Array<{
    id: number;
    tag: Tag;
  }>;
}

interface Version {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const columnHelper = createColumnHelper<Song>();

// 날짜 포맷팅 함수: yyyy.mm.dd
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function VersionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const versionId = parseInt(resolvedParams.id);

  // 버전 정보 조회
  const { data: version } = useQuery(
    versionsQueries.getVersionById(versionId)
  ) as { data: Version | undefined };

  // 해당 버전의 곡 목록 조회
  const { data: songs = [], isLoading } = useSongs(
    version?.name ? { version: version.name } : { version: "dummy" }
  ) as { data: Song[]; isLoading: boolean };

  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "jacket",
        header: "자켓",
        enableSorting: false,
        cell: (info) => {
          const song = info.row.original;
          return (
            <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  song.imageUrl ||
                  `/image/thumbnail/${encodeURIComponent(song.title)}.png`
                }
                alt={song.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/image/no_image.png"; // 기본 이미지 경로가 있다면 설정
                  (e.target as HTMLImageElement).style.display = "none"; // 이미지가 없으면 숨김 처리하거나
                }}
              />
            </div>
          );
        },
      }),
      columnHelper.accessor("title", {
        header: "제목",
        enableSorting: true,
        cell: (info) => {
          const song = info.row.original;
          return (
            <Link
              href={`/user/songs/${song.id}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-semibold transition-colors"
            >
              {info.getValue()}
            </Link>
          );
        },
      }),
      columnHelper.accessor("artist", {
        header: "작곡가",
        enableSorting: true,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("bpm", {
        header: "BPM",
        enableSorting: true,
        cell: (info) => {
          const bpm = info.getValue();
          if (!bpm) return "-";

          // "min-max" 형식 파싱
          const bpmParts = bpm.split("-");
          if (bpmParts.length === 2) {
            const minBpm = bpmParts[0].trim();
            const maxBpm = bpmParts[1].trim();
            if (minBpm === maxBpm) {
              return maxBpm;
            }
            return bpm;
          }
          return bpm;
        },
      }),
      columnHelper.display({
        id: "attributes",
        header: "태그",
        enableSorting: false,
        cell: (info) => {
          const song = info.row.original;
          return (
            <div className="flex gap-1 flex-wrap">
              {song.isLong && (
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs font-medium">
                  Long
                </span>
              )}
              {song.isLicense && (
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs font-medium">
                  License
                </span>
              )}
              {song.isHot && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded text-xs font-medium">
                  Hot
                </span>
              )}
            </div>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow =
    table.getRowModel().rows.length > 0
      ? table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
        1
      : 0;
  const endRow = Math.min(
    (table.getState().pagination.pageIndex + 1) *
      table.getState().pagination.pageSize,
    totalRows
  );

  if (!version) {
    return <div className="p-8 text-center">버전 정보를 불러오는 중...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="mb-6 px-4 md:px-0">
        <Link
          href="/user/versions"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors mb-4"
        >
          <svg
            className="w-5 h-5 mr-1"
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
          목록으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {version.name}
        </h1>
        <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm flex gap-4">
          <span>시작일: {formatDate(version.startedAt)}</span>
          {version.endedAt && (
            <span>종료일: {formatDate(version.endedAt)}</span>
          )}
        </div>
      </div>

      <div className="shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-4 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-blue-500"></div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              수록곡 리스트
            </h2>
          </div>
          <div className="flex items-center justify-end">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}개씩 보기
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-4 text-left font-bold text-gray-800 dark:text-gray-200 uppercase text-xs tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-2 ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none hover:text-blue-600 dark:hover:text-blue-400"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {{
                                asc: " ↑",
                                desc: " ↓",
                              }[header.column.getIsSorted() as string] ?? " ↕"}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {isLoading ? "로딩 중..." : "등록된 곡이 없습니다"}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-800/50"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 text-gray-800 dark:text-gray-200 font-medium"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              {isLoading ? "로딩 중..." : "등록된 곡이 없습니다"}
            </div>
          ) : (
            table.getRowModel().rows.map((row) => {
              const song = row.original;
              return (
                <Link
                  key={row.id}
                  href={`/user/songs/${song.id}`}
                  className="block bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          song.imageUrl ||
                          `/image/thumbnail/${encodeURIComponent(
                            song.title
                          )}.png`
                        }
                        alt={song.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 break-words text-blue-600 dark:text-blue-400 line-clamp-2">
                          {song.title}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                        {song.artist}
                      </div>

                      <div className="flex gap-1 flex-wrap mb-2">
                        {song.isLong && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs font-medium">
                            Long
                          </span>
                        )}
                        {song.isLicense && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs font-medium">
                            License
                          </span>
                        )}
                        {song.isHot && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded text-xs font-medium">
                            Hot
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        BPM: {song.bpm || "-"}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700 gap-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg w-full md:w-auto text-center">
            {totalRows > 0
              ? `${startRow}-${endRow} / 총 ${totalRows}개`
              : "데이터가 없습니다"}
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-2 md:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              처음
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-2 md:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              이전
            </button>
            <span className="px-2 md:px-4 py-2 text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-2 md:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              다음
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-2 md:px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              마지막
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
