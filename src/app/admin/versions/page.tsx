"use client";

import { useMemo, useState, useCallback } from "react";
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
import {
  useCreateVersions,
  useUpdateVersions,
  useDeleteVersions,
} from "@entities/versions/api/versions.mutaions";
import { z } from "zod";
import { format } from "date-fns";
import Link from "next/link";

interface Version {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const columnHelper = createColumnHelper<Version>();

interface FormValues {
  name: string;
  startedAt: string;
  endedAt?: string;
}

const initialState: FormValues = {
  name: "",
  startedAt: "",
  endedAt: "",
};

const formSchema = z.object({
  name: z.string().trim().min(1, "버전명을 입력해주세요"),
  startedAt: z.string().min(1, "시작일을 선택해주세요"),
  endedAt: z.string().optional(),
});

// 날짜 포맷팅 함수: yyyy.mm.dd
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function Versions() {
  const { data: versions = [] } = useQuery(
    versionsQueries.getAllVersions()
  ) as { data: Version[] };
  // const versions: Version[] = [];
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [error, setError] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "startedAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { mutateAsync: createVersion } = useCreateVersions();
  const { mutateAsync: updateVersion } = useUpdateVersions();
  const { mutateAsync: deleteVersion } = useDeleteVersions();

  const handleEdit = useCallback((version: Version) => {
    setEditingId(version.id);
    setFormValues({
      name: version.name,
      startedAt: format(new Date(version.startedAt), "yyyy-MM-dd"),
      endedAt: version.endedAt
        ? format(new Date(version.endedAt), "yyyy-MM-dd")
        : "",
    });
    setError("");
    setShowForm(true);
    // 폼으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = useCallback(
    async (version: Version) => {
      if (
        !window.confirm(
          `"${version.name}" 버전을 삭제하시겠습니까?\n삭제 시 해당 버전에 포함된 곡들의 레벨 정보도 함께 삭제됩니다.`
        )
      ) {
        return;
      }

      try {
        await deleteVersion({ id: version.id });
        alert("버전이 삭제되었습니다.");
      } catch (error: any) {
        alert(`버전 삭제 실패: ${error.message}`);
      }
    },
    [deleteVersion]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "버전명",
        enableSorting: true,
        cell: (info) => {
          const version = info.row.original;
          return (
            <Link
              href={`/admin/versions/${version.id}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
            >
              {info.getValue()}
            </Link>
          );
        },
      }),
      columnHelper.accessor("startedAt", {
        header: "시작일",
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const dateA = new Date(rowA.original.startedAt).getTime();
          const dateB = new Date(rowB.original.startedAt).getTime();
          return dateA - dateB;
        },
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("endedAt", {
        header: "종료일",
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const dateA = rowA.original.endedAt
            ? new Date(rowA.original.endedAt).getTime()
            : 0;
          const dateB = rowB.original.endedAt
            ? new Date(rowB.original.endedAt).getTime()
            : 0;
          return dateA - dateB;
        },
        cell: (info) => {
          const value = info.getValue();
          return value ? formatDate(value) : "-";
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
      columnHelper.accessor("updatedAt", {
        header: "수정일",
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const dateA = new Date(rowA.original.updatedAt).getTime();
          const dateB = new Date(rowB.original.updatedAt).getTime();
          return dateA - dateB;
        },
        cell: (info) => {
          const row = info.row.original;
          const updatedAt = new Date(info.getValue());
          const createdAt = new Date(row.createdAt);

          // 생성일 === 수정일이면 숨김
          const isSame = updatedAt.getTime() === createdAt.getTime();

          return isSame ? "-" : formatDate(updatedAt);
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "작업",
        enableSorting: false,
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(row)}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-gray-800 rounded-full transition-all transform hover:-translate-y-0.5"
                title="수정"
                aria-label="수정"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(row)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-800 rounded-full transition-all transform hover:-translate-y-0.5"
                title="삭제"
                aria-label="삭제"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          );
        },
      }),
    ],
    [handleEdit, handleDelete]
  );

  // 검색어로 필터링된 버전 목록
  const filteredVersions = useMemo(() => {
    if (!searchQuery.trim()) {
      return versions;
    }

    const query = searchQuery.toLowerCase().trim();
    return versions.filter((version) => {
      // 버전명으로 검색
      if (version.name.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
  }, [versions, searchQuery]);

  const table = useReactTable({
    data: filteredVersions,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 중 에러 메시지 초기화
    if (error) setError("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormValues(initialState);
    setError("");
    setShowForm(false);
  };

  const handleNewVersion = () => {
    setEditingId(null);
    setFormValues(initialState);
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Zod 검증 및 trim 처리
    const validationResult = formSchema.safeParse(formValues);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      setError(firstError.message);
      return;
    }

    // 검증된 데이터 (trim 처리된 값)
    const validatedData = validationResult.data;

    try {
      if (editingId) {
        // 수정 모드
        await updateVersion({ id: editingId, ...validatedData });
      } else {
        // 생성 모드
        await createVersion(validatedData);
      }
      setFormValues(initialState);
      setEditingId(null);
      setError("");
    } catch (error: any) {
      alert(
        `버전 정보를 ${editingId ? "수정" : "등록"}하는데 실패했습니다: ${
          error.message
        }`
      );
    }
  };

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
    <div className="py-6">
      {/* Title */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            버전 정보 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            버전 정보를 등록하고 관리할 수 있습니다
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleNewVersion}
            className="px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
          >
            + 버전 등록
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Form Card */}
        {showForm && (
          <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div
                  className={`w-1 h-8 rounded-full ${
                    editingId ? "bg-orange-500" : "bg-blue-500"
                  }`}
                ></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {editingId ? "버전 정보 수정" : "버전 정보 등록"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormValues(initialState);
                  setError("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="닫기"
              >
                <svg
                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
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

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-700 dark:text-red-400 text-sm mb-2 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-400 shadow-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-red-500 dark:text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="버전명"
                  value={formValues.name}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />

                <input
                  type="date"
                  name="startedAt"
                  placeholder="시작일"
                  value={formValues.startedAt}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />

                <input
                  type="date"
                  name="endedAt"
                  placeholder="종료일 (선택)"
                  value={formValues.endedAt || ""}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
                  >
                    {editingId ? "수정하기" : "저장하기"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
                    >
                      취소
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-indigo-500"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                버전 리스트
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="버전명으로 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                  });
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
                {[10, 20, 30].map((size) => (
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
                                }[header.column.getIsSorted() as string] ??
                                  " ↕"}
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
                {table.getRowModel().rows.map((row, idx) => {
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
                })}
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
    </div>
  );
}
