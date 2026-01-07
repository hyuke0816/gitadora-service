"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
import { useArtist } from "@entities/artists/api/artists.queries";
import { useSongs } from "@entities/songs/api/songs.queries";

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
    tag: {
      id: number;
      name: string;
    };
  }>;
}

const columnHelper = createColumnHelper<Song>();

const getVersionShort = (version: string) => {
  if (!version) return "";

  if (version.toUpperCase().includes("GALAXY WAVE")) {
    return version.replace(/GITADORA\s+GALAXY\s+WAVE/i, "GW");
  }

  if (version.match(/GuitarFreaks\s+(V\d*)\s+&\s+DrumMania\s+(V\d*)/i)) {
    const match = version.match(/GuitarFreaks\s+(V\d*)/i);
    if (match && match[1]) {
      return match[1];
    }
  }

  if (version.match(/GUITARFREAKS\s+(.+?)MIX?\s+&\s+drummania\s+(.+?)MIX?/i)) {
    return version
      .replace(/GUITARFREAKS\s+/i, "GF")
      .replace(/drummania\s+/i, "DM")
      .replace(/MIX/gi, "");
  }

  if (version.match(/GUITARFREAKS\s+1st/i)) {
    return "GF1st";
  }

  if (version.match(/GuitarFreaksXG/i)) {
    return version
      .replace(/GuitarFreaksXG/i, "XG")
      .replace(/DrumManiaXG/i, "XG")
      .replace(/\s+Groove to Live/i, "")
      .replace(/&\s+XG/i, "&");
  }

  return version.replace(/^GITADORA\s+/, "");
};

export default function ArtistDetail() {
  const router = useRouter();
  const params = useParams();
  const artistId = Number(params.id);

  const { data: artist, isLoading: isArtistLoading } = useArtist(artistId);
  const { data: allSongs, isLoading: isSongsLoading } = useSongs();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const songs = useMemo(() => {
    if (!allSongs || !artist) return [];
    
    const songsData = allSongs as Song[];
    
    // artistInfo.id로 매칭하거나, 이름으로 매칭
    return songsData.filter((song) => {
       // 1. artistInfo ID 매칭 (가장 정확)
       if (song.artistInfo?.id === artistId) return true;
       
       // 2. 이름 매칭
       if (song.artist === artist.name) return true;
       
       // 3. alias 매칭
       if (artist.aliases && artist.aliases.some((a: any) => a.alias === song.artist)) return true;

       return false;
    });
  }, [allSongs, artist, artistId]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "jacket",
        header: "자켓",
        enableSorting: false,
        size: 60,
        cell: (info) => {
          const song = info.row.original;
          const imageUrl =
            song.imageUrl ||
            `/image/thumbnail/${encodeURIComponent(song.title)}.png`;
          return (
            <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100 dark:bg-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={song.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23eee' width='100' height='100'/%3E%3Ctext fill='%23aaa' x='50' y='50' font-family='sans-serif' font-size='30' text-anchor='middle' alignment-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          );
        },
      }),
      columnHelper.accessor("title", {
        header: "곡명",
        enableSorting: true,
        cell: (info) => {
          const song = info.row.original;
          return (
            <Link
              href={`/user/songs/${song.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium block truncate"
              title={info.getValue()}
            >
              {info.getValue()}
            </Link>
          );
        },
      }),
      columnHelper.accessor("artist", {
        header: "명의",
        enableSorting: true,
        cell: (info) => {
          const song = info.row.original;
          const artistName = info.getValue();
          return (
            <span className="block truncate" title={artistName}>
              {artistName}
            </span>
          );
        },
      }),
      columnHelper.accessor("bpm", {
        header: "BPM",
        enableSorting: true,
        cell: (info) => {
          const bpm = info.getValue();
          if (!bpm) return <span>-</span>;
          const bpmParts = bpm.split("-");
          if (bpmParts.length === 2) {
            const minBpm = bpmParts[0].trim();
            const maxBpm = bpmParts[1].trim();
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
          
          const flags = [];
          if (song.isHot) flags.push("HOT");
          if (song.isLicense) flags.push("라이센스");
          if (song.isCover) flags.push("커버");
          if (song.isLong) flags.push("롱");

          if (tags.length === 0 && flags.length === 0)
            return <span className="text-gray-400">-</span>;

          return (
            <div className="flex flex-wrap gap-1">
              {flags.map((flag, idx) => (
                <span
                  key={`flag-${idx}`}
                  className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                >
                  {flag}
                </span>
              ))}
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

  if (isArtistLoading || isSongsLoading) {
    return (
      <div className="max-w-6xl mx-auto py-6">
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          로딩 중...
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="max-w-6xl mx-auto py-6">
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          작곡가 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
        <div className="mb-4 px-4 sm:px-0 sm:mb-6 pt-4 sm:pt-0">
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

      {/* Artist Info Card */}
      <div className="shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-4 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 mb-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full bg-indigo-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {artist.name}
            </h2>
        </div>
        {artist.aliases && artist.aliases.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400 font-medium">다른 명의:</span>
                {artist.aliases.map((alias: any) => (
                    <span key={alias.id} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                        {alias.alias}
                    </span>
                ))}
            </div>
        )}
      </div>

      {/* Songs Table Card */}
      <div className="w-full shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-4 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            곡 목록 ({songs.length})
          </h3>
          <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}개씩 보기
                </option>
              ))}
            </select>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse text-sm table-fixed">
            <colgroup>
              <col className="w-[80px]" />
              <col className="w-auto" />
              <col className="w-[25%]" />
              <col className="w-[100px]" />
              <col className="w-[100px]" />
              <col className="w-[20%]" />
            </colgroup>
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
                    곡 데이터가 없습니다.
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

        {/* Mobile Card List View */}
        <div className="lg:hidden space-y-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              곡 데이터가 없습니다.
            </div>
          ) : (
            table.getRowModel().rows.map((row) => {
              const song = row.original;
              const imageUrl =
                song.imageUrl ||
                `/image/thumbnail/${encodeURIComponent(song.title)}.png`;

              return (
                <div
                  key={row.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden"
                >
                  <div className="flex gap-4">
                    {/* Left: Jacket Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt={song.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23eee' width='100' height='100'/%3E%3Ctext fill='%23aaa' x='50' y='50' font-family='sans-serif' font-size='10' text-anchor='middle' alignment-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded mb-1 max-w-full truncate">
                            {getVersionShort(song.version)}
                          </span>
                          <Link
                            href={`/user/songs/${song.id}`}
                            className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:underline break-words leading-tight block w-full"
                            title={song.title}
                          >
                            {song.title}
                          </Link>
                          <div
                            className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-words w-full"
                            title={song.artist}
                          >
                            {song.artist}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        BPM:{" "}
                        {(() => {
                          const bpm = song.bpm;
                          if (!bpm) return "-";
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
                        })()}
                      </div>

                      <div className="space-y-1">
                        {/* Tags and Flags */}
                        <div className="flex flex-wrap gap-1">
                          {song.isHot && (
                            <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-[10px]">
                              HOT
                            </span>
                          )}
                          {song.isLicense && (
                            <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-[10px]">
                              라이센스
                            </span>
                          )}
                          {song.isCover && (
                            <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-[10px]">
                              커버
                            </span>
                          )}
                          {song.isLong && (
                            <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-[10px]">
                              롱
                            </span>
                          )}
                          {song.tags?.map((tagItem) => (
                            <span
                              key={tagItem.id}
                              className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-[10px]"
                            >
                              {tagItem.tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
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

