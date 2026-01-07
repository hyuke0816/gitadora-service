"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { SkillRankSkeleton } from "@/components/Skeleton";
import { getSkillColorStyle } from "@/shared/utils/skill.utils";
import { useUserList } from "@/entities/users/api/users.queries";
import type { UserList } from "@/entities/users/api/users.service";
import {
  instrumentLabels,
} from "@/shared/components/InstrumentTypeSelector";

const columnHelper = createColumnHelper<UserList>();

function UserListContent() {
  const searchParams = useSearchParams();
  const instrumentType =
    (searchParams.get("instrumentType") as "GUITAR" | "DRUM") || "GUITAR";

  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "totalSkill", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 유저 목록
  const { data: userList = [], isLoading } = useUserList(instrumentType);

  // 악기 타입 변경 시 관련 상태 초기화
  useEffect(() => {
    setPagination((prev) => ({
      pageIndex: 0,
      pageSize: prev.pageSize,
    }));
    setSearchQuery("");
  }, [instrumentType]);

  // 검색 필터링된 유저 목록
  const filteredUserList = useMemo(() => {
    if (!searchQuery.trim()) {
      return userList;
    }

    const query = searchQuery.toLowerCase().trim();
    return userList.filter((user) => {
      const ingamename = user.ingamename?.toLowerCase() || "";
      return ingamename.includes(query);
    });
  }, [userList, searchQuery]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "rank",
        header: "순위",
        enableSorting: false,
        size: 100,
      }),
      columnHelper.accessor("ingamename", {
        header: "유저명",
        enableSorting: false,
        size: 400,
        cell: (info) => {
          const user = info.row.original;
          return (
            <Link
              href={`/user/${user.userId}/skill?instrumentType=${instrumentType}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              {user.title && (
                <span className="hidden md:inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                  {user.title}
                </span>
              )}
              <span className="text-gray-900 dark:text-gray-100 font-medium truncate">
                {user.ingamename || `User ${user.userId}`}
              </span>
            </Link>
          );
        },
      }),
      columnHelper.accessor("totalSkill", {
        header: "스킬",
        enableSorting: true,
        size: 150,
        sortingFn: (rowA, rowB) => {
          return rowA.original.totalSkill - rowB.original.totalSkill;
        },
        cell: (info) => {
          const user = info.row.original;
          const totalSkill = info.getValue();
          const skillStyle = getSkillColorStyle(totalSkill);
          return (
            <Link
              href={`/user/${user.userId}/skill?instrumentType=${instrumentType}`}
              className="inline-block hover:opacity-80 transition-opacity cursor-pointer"
            >
              <span
                className={`px-3 py-1 rounded-lg text-white font-semibold ${
                  skillStyle.className || ""
                }`}
                style={{
                  background: skillStyle.background || undefined,
                  color: totalSkill < 1000 ? "#000000" : undefined,
                }}
              >
                {totalSkill.toFixed(2)}
              </span>
            </Link>
          );
        },
      }),
    ],
    [instrumentType]
  );

  const table = useReactTable({
    data: filteredUserList,
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

  // 정렬된 전체 데이터에서의 순위 맵
  const sortConfig = sorting[0];
  const sortId = sortConfig?.id || "none";
  const sortDesc = sortConfig?.desc ?? false;
  const rankMap = useMemo(() => {
    // filteredUserList를 sorting에 따라 직접 정렬
    const sorted = [...filteredUserList].sort((a, b) => {
      if (sortId === "none") return 0;

      if (sortId === "totalSkill") {
        const diff = a.totalSkill - b.totalSkill;
        return sortDesc ? -diff : diff;
      }
      return 0;
    });

    const map = new Map<number, number>();
    sorted.forEach((user, index) => {
      map.set(user.userId, index + 1);
    });
    return map;
  }, [filteredUserList, sortId, sortDesc]);

  // 테이블 상태 값들을 계산
  const totalRows = filteredUserList.length;
  const startRow =
    totalRows > 0 ? pagination.pageIndex * pagination.pageSize + 1 : 0;
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalRows
  );

  if (isLoading) {
    return <SkillRankSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto pb-6">
      {/* 유저 목록 테이블 */}
      <div className="shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-4 md:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-indigo-500"></div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
              유저 리스트
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <input
              type="text"
              placeholder="유저명으로 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination({
                  pageIndex: 0,
                  pageSize: pagination.pageSize,
                });
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <div className="flex items-center justify-end md:justify-start">
              <select
                value={pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full md:w-auto"
              >
                {[10, 20, 30, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}개씩 보기
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm table-fixed">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-4 py-4 font-bold text-gray-800 dark:text-gray-200 uppercase text-xs tracking-wider ${
                        header.id === "ingamename" ? "text-left" : "text-center"
                      } ${
                        header.id === "rank"
                          ? "w-[20%]"
                          : header.id === "ingamename"
                          ? "w-[45%]"
                          : "w-[35%]"
                      }`}
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
                    colSpan={3}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {searchQuery.trim()
                      ? "검색 결과가 없습니다"
                      : "유저 데이터가 없습니다"}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => {
                  const rank = rankMap.get(row.original.userId) || 0;

                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm ${
                        idx % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-50 dark:bg-gray-800/50"
                      }`}
                    >
                      <td className="px-4 py-4 text-gray-700 dark:text-gray-300 font-medium w-[20%] text-center">
                        {rank}
                      </td>
                      {row
                        .getVisibleCells()
                        .slice(1)
                        .map((cell) => (
                          <td
                            key={cell.id}
                            className={`px-4 py-4 text-gray-800 dark:text-gray-200 font-medium overflow-hidden ${
                              cell.column.id === "ingamename"
                                ? "w-[45%] text-left"
                                : "w-[35%] text-center"
                            }`}
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
              {pagination.pageIndex + 1} / {table.getPageCount()}
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

export default function UserListPage() {
  return (
    <Suspense fallback={<SkillRankSkeleton />}>
      <UserListContent />
    </Suspense>
  );
}