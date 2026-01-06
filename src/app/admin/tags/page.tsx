"use client";

import { useMemo, useState, useCallback } from "react";
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
import { useTags } from "@entities/tags/api/tags.queries";
import {
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from "@entities/tags/api/tags.mutations";
import { Tag } from "@entities/tags";
import { z } from "zod";

const columnHelper = createColumnHelper<Tag>();

interface FormValues {
  key: string;
  name: string;
  color: string;
}

const initialState: FormValues = {
  key: "",
  name: "",
  color: "#3b82f6",
};

const formSchema = z.object({
  key: z
    .string()
    .trim()
    .min(1, "태그 키를 입력해주세요")
    .regex(
      /^[a-z0-9_-]+$/,
      "태그 키는 영어 소문자, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있습니다"
    ),
  name: z.string().trim().min(1, "태그 표시 이름을 입력해주세요"),
  color: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "올바른 HEX 색상 코드를 입력해주세요 (예: #3b82f6)"
    ),
});

// 날짜 포맷팅 함수: yyyy.mm.dd
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function Tags() {
  const { data: tags = [] } = useTags() as { data: Tag[] };
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [error, setError] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { mutateAsync: createTag } = useCreateTag();
  const { mutateAsync: updateTag } = useUpdateTag();
  const { mutateAsync: deleteTag } = useDeleteTag();

  const handleEdit = useCallback((tag: Tag) => {
    setEditingId(tag.id);
    setFormValues({
      key: tag.key,
      name: tag.name,
      color: tag.color || "#3b82f6",
    });
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("key", {
        header: "태그 키",
        enableSorting: true,
        cell: (info) => (
          <span className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("name", {
        header: "표시 이름",
        enableSorting: true,
        cell: (info) => {
          const tag = info.row.original;
          const color = tag.color || "#3b82f6";
          return (
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              {info.getValue()}
            </span>
          );
        },
      }),
      columnHelper.accessor("color", {
        header: "색상",
        enableSorting: false,
        cell: (info) => {
          const color = info.getValue() || "#3b82f6";
          return (
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
              ></div>
              <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                {color}
              </span>
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
                onClick={async () => {
                  if (confirm(`"${row.name}" 태그를 삭제하시겠습니까?`)) {
                    try {
                      await deleteTag(row.id);
                    } catch (error: any) {
                      alert(`태그 삭제에 실패했습니다: ${error.message}`);
                    }
                  }
                }}
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
    [handleEdit, deleteTag]
  );

  // 검색어로 필터링된 태그 목록
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) {
      return tags;
    }

    const query = searchQuery.toLowerCase().trim();
    return tags.filter((tag) => {
      // 태그 키로 검색
      if (tag.key.toLowerCase().includes(query)) {
        return true;
      }
      // 태그 이름으로 검색
      if (tag.name.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
  }, [tags, searchQuery]);

  const table = useReactTable({
    data: filteredTags,
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
    if (error) setError("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormValues(initialState);
    setError("");
    setShowForm(false);
  };

  const handleNewTag = () => {
    setEditingId(null);
    setFormValues(initialState);
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationResult = formSchema.safeParse(formValues);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      setError(firstError.message);
      return;
    }

    const validatedData = validationResult.data;

    try {
      if (editingId) {
        await updateTag({
          id: editingId,
          key: validatedData.key.toLowerCase(),
          name: validatedData.name,
          color: validatedData.color,
        });
      } else {
        await createTag({
          key: validatedData.key.toLowerCase(),
          name: validatedData.name,
          color: validatedData.color,
        });
      }
      setFormValues(initialState);
      setEditingId(null);
      setError("");
    } catch (error: any) {
      setError(error.message || "태그 등록에 실패했습니다");
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
            태그 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            태그를 등록하고 관리할 수 있습니다
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleNewTag}
            className="px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
          >
            + 태그 등록
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
                  {editingId ? "태그 수정" : "태그 등록"}
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    태그 키 (영어){" "}
                    <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="key"
                    placeholder="예: rock, pop, electronic"
                    value={formValues.key}
                    onChange={handleChange}
                    className="input-style"
                    disabled={!!editingId}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    영어 소문자, 숫자, 하이픈(-), 언더스코어(_)만 사용
                    가능합니다
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    표시 이름{" "}
                    <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="예: 록, 팝, 일렉트로닉"
                    value={formValues.name}
                    onChange={handleChange}
                    className="input-style"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    사용자에게 표시될 이름입니다 (현재는 한국어, 나중에 다국어
                    지원 예정)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    태그 색상{" "}
                    <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="color"
                      value={formValues.color}
                      onChange={handleChange}
                      className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="color"
                      value={formValues.color}
                      onChange={handleChange}
                      placeholder="#3b82f6"
                      className="input-style flex-1 font-mono"
                      maxLength={7}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    태그를 표시할 때 사용될 색상입니다 (HEX 코드 형식)
                  </p>
                </div>
              </div>

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
                태그 리스트
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="태그 키 또는 이름으로 검색..."
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
                {[10, 20, 30, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b-2 border-gray-300 dark:border-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="text-gray-400 dark:text-gray-500">
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
                {table.getRowModel().rows.map((row, idx) => (
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
                        className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              등록된 태그가 없습니다
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {totalRows > 0 ? (
                <>
                  {startRow} - {endRow} / 총 {totalRows}개
                </>
              ) : (
                "결과 없음"
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                이전
              </button>
              <span className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                페이지 {table.getState().pagination.pageIndex + 1} /{" "}
                {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
