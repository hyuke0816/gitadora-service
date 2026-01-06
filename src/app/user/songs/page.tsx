"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
import { useSongs } from "@entities/songs/api/songs.queries";

interface Song {
  id: number;
  title: string;
  artist: string;
  bpm?: string | null;
  version: string;
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
    tag: {
      id: number;
      name: string;
    };
  }>;
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

export default function UserSongs() {
  const { data, isLoading } = useSongs();
  const songs: Song[] = (data as Song[]) || [];
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: false },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "곡명",
        enableSorting: true,
        cell: (info) => {
          const song = info.row.original;
          return (
            <Link
              href={`/user/songs/${song.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {info.getValue()}
            </Link>
          );
        },
      }),
      columnHelper.accessor("artist", {
        header: "작곡가",
        enableSorting: true,
        cell: (info) => {
          const song = info.row.original;
          const artistName = song.artistInfo?.name || info.getValue();
          return <span>{artistName}</span>;
        },
      }),
      columnHelper.accessor("bpm", {
        header: "BPM",
        enableSorting: true,
        cell: (info) => {
          const bpm = info.getValue();
          if (!bpm) return <span>-</span>;

          // "min-max" 형식 파싱
          const bpmParts = bpm.split("-");
          if (bpmParts.length === 2) {
            const minBpm = bpmParts[0].trim();
            const maxBpm = bpmParts[1].trim();
            // 최소와 최대가 같으면 하나만 표시
            if (minBpm === maxBpm) {
              return <span>{maxBpm}</span>;
            }
            return <span>{bpm}</span>;
          }
          return <span>{bpm}</span>;
        },
      }),
      columnHelper.accessor("version", {
        header: "버전",
        enableSorting: true,
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "tags",
        header: "태그",
        enableSorting: false,
        cell: (info) => {
          const song = info.row.original;
          const tags = song.tags || [];
          if (tags.length === 0)
            return <span className="text-gray-400">-</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {tags.map((tagItem) => (
                <span
                  key={tagItem.id}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                >
                  {tagItem.tag.name}
                </span>
              ))}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "flags",
        header: "특성",
        enableSorting: false,
        cell: (info) => {
          const song = info.row.original;
          const flags = [];
          if (song.isHot) flags.push("HOT");
          if (song.isLicense) flags.push("라이센스");
          if (song.isCover) flags.push("커버");
          if (song.isLong) flags.push("롱");
          if (flags.length === 0)
            return <span className="text-gray-400">-</span>;
          return (
            <div className="flex flex-wrap gap-1">
              {flags.map((flag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                >
                  {flag}
                </span>
              ))}
            </div>
          );
        },
      }),
    ],
    []
  );

  // 검색어로 필터링된 노래 목록
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) {
      return songs;
    }

    const query = searchQuery.toLowerCase().trim();
    return songs.filter((song: Song) => {
      // 곡명으로 검색
      if (song.title.toLowerCase().includes(query)) {
        return true;
      }
      // 작곡가명으로 검색
      if (song.artist.toLowerCase().includes(query)) {
        return true;
      }
      // 작곡가 정보의 이름으로 검색
      if (song.artistInfo?.name?.toLowerCase().includes(query)) {
        return true;
      }
      // 태그로 검색
      if (song.tags && song.tags.length > 0) {
        return song.tags.some(
          (tagItem: { id: number; tag: { id: number; name: string } }) =>
            tagItem.tag.name.toLowerCase().includes(query)
        );
      }
      return false;
    });
  }, [songs, searchQuery]);

  const table = useReactTable({
    data: filteredSongs,
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

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-6">
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          노래정보
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          게임에 수록된 모든 노래 정보를 확인할 수 있습니다
        </p>
      </div>

      {/* Table Card */}
      <div className="shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-indigo-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              노래 리스트
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="곡명, 작곡가, 태그로 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
              }}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              페이지당 항목 수:
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {searchQuery.trim()
                      ? "검색 결과가 없습니다"
                      : "노래 데이터가 없습니다"}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => {
                  return (
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
            {totalRows > 0
              ? `${startRow}-${endRow} / 총 ${totalRows}개`
              : "데이터가 없습니다"}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              처음
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              이전
            </button>
            <span className="px-4 py-2 text-sm font-bold text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              다음
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all shadow-sm hover:shadow-md disabled:hover:shadow-sm"
            >
              마지막
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
