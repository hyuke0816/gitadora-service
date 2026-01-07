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
  CellContext,
} from "@tanstack/react-table";
import { useArtists } from "@entities/artists/api/artists.queries";

interface ArtistAlias {
  id: number;
  artistId: number;
  alias: string;
  createdAt: string;
  updatedAt: string;
}

interface Artist {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  aliases?: ArtistAlias[];
}

const columnHelper = createColumnHelper<Artist>();

// 날짜 포맷팅 함수: yyyy.mm.dd
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function UserArtists() {
  const { data: artists = [] } = useArtists() as { data: Artist[] };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "작곡가명",
        enableSorting: true,
        cell: (info) => {
          const artist = info.row.original;
          const aliases = artist.aliases || [];
          return (
            <div>
              <Link
                href={`/user/artists/${artist.id}`}
                className="font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
              >
                {info.getValue()}
              </Link>
              {aliases.length > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  다른 명의: {aliases.map((a) => a.alias).join(", ")}
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "생성일",
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const dateA = new Date(rowA.original.createdAt).getTime();
          const dateB = new Date(rowB.original.createdAt).getTime();
          return dateA - dateB;
        },
        cell: (info) => formatDate(info.getValue()),
      }),
    ],
    []
  );

  // 검색어로 필터링된 작곡가 목록
  const filteredArtists = useMemo(() => {
    if (!searchQuery.trim()) {
      return artists;
    }

    const query = searchQuery.toLowerCase().trim();
    return artists.filter((artist) => {
      // 작곡가명으로 검색
      if (artist.name.toLowerCase().includes(query)) {
        return true;
      }
      // 다른 명의로 검색
      if (artist.aliases && artist.aliases.length > 0) {
        return artist.aliases.some((alias) =>
          alias.alias.toLowerCase().includes(query)
        );
      }
      return false;
    });
  }, [artists, searchQuery]);

  const table = useReactTable({
    data: filteredArtists,
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

  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* Table Card */}
      <div className="shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-4 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-indigo-500"></div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              작곡가 리스트
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <input
              type="text"
              placeholder="작곡가명 또는 다른 명의로 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <div className="flex items-center justify-end md:justify-start">
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full md:w-auto"
              >
                {[10, 20, 30].map((size) => (
                  <option key={size} value={size}>
                    {size}개씩 보기
                  </option>
                ))}
              </select>
            </div>
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
                    colSpan={2}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {searchQuery.trim()
                      ? "검색 결과가 없습니다"
                      : "작곡가 데이터가 없습니다"}
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
        <div className="md:hidden space-y-4">
          {table.getRowModel().rows.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              {searchQuery.trim()
                ? "검색 결과가 없습니다"
                : "작곡가 데이터가 없습니다"}
            </div>
          ) : (
            table.getRowModel().rows.map((row) => {
              const artist = row.original;
              return (
                <div
                  key={row.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 break-words">
                        <Link
                          href={`/user/artists/${artist.id}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                        >
                          {artist.name}
                        </Link>
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {formatDate(artist.createdAt)}
                      </span>
                    </div>

                    {artist.aliases && artist.aliases.length > 0 && (
                      <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                        <span className="block text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                          다른 명의
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {artist.aliases.map((alias) => (
                            <span
                              key={alias.id}
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              {alias.alias}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
