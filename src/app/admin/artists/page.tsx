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
import { useArtists } from "@entities/artists/api/artists.queries";
import {
  useCreateArtists,
  useUpdateArtists,
  useDeleteArtists,
  useCreateArtistAlias,
  useDeleteArtistAlias,
} from "@entities/artists/api/artists.mutaions";
import { z } from "zod";
import { format } from "date-fns";

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

interface FormValues {
  name: string;
}

const initialState: FormValues = {
  name: "",
};

const formSchema = z.object({
  name: z.string().trim().min(1, "작곡가명을 입력해주세요"),
});

// 날짜 포맷팅 함수: yyyy.mm.dd
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function Artists() {
  const { data: artists = [] } = useArtists() as { data: Artist[] };
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [error, setError] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [managingAliasesId, setManagingAliasesId] = useState<number | null>(
    null
  );
  const [aliasInput, setAliasInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { mutateAsync: createArtist } = useCreateArtists();
  const { mutateAsync: updateArtist } = useUpdateArtists();
  const { mutateAsync: deleteArtist } = useDeleteArtists();
  const { mutateAsync: createAlias } = useCreateArtistAlias();
  const { mutateAsync: deleteAlias } = useDeleteArtistAlias();

  const handleEdit = useCallback((artist: Artist) => {
    setEditingId(artist.id);
    setFormValues({
      name: artist.name,
    });
    setError("");
    setManagingAliasesId(null);
    setShowForm(true);
    // 폼으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleManageAliases = useCallback((artist: Artist) => {
    setManagingAliasesId(artist.id);
    setEditingId(null);
    setAliasInput("");
    setError("");
    setShowForm(true);
    // 폼으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = useCallback(
    async (artist: Artist) => {
      if (!confirm(`정말 "${artist.name}" 작곡가를 삭제하시겠습니까?`)) {
        return;
      }

      try {
        await deleteArtist({ id: artist.id });
        setError("");
      } catch (error: any) {
        setError(error.message || "작곡가 삭제에 실패했습니다");
      }
    },
    [deleteArtist]
  );

  const handleAddAlias = async () => {
    if (!managingAliasesId || !aliasInput.trim()) {
      setError("다른 명의를 입력해주세요");
      return;
    }

    try {
      await createAlias({
        artistId: managingAliasesId,
        alias: aliasInput.trim(),
      });

      setAliasInput("");
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteAlias = async (aliasId: number) => {
    if (!confirm("정말 이 다른 명의를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteAlias({ id: aliasId });
    } catch (error: any) {
      alert(`다른 명의 삭제 실패: ${error.message}`);
    }
  };

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
              <div className="font-medium">{info.getValue()}</div>
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
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                title="수정"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                title="삭제"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleManageAliases(row)}
                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
                title="다른 명의 관리"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </button>
            </div>
          );
        },
      }),
    ],
    [handleEdit, handleManageAliases, handleDelete, artists]
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
    setManagingAliasesId(null);
    setShowForm(false);
  };

  const handleNewArtist = () => {
    setEditingId(null);
    setFormValues(initialState);
    setError("");
    setManagingAliasesId(null);
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
        await updateArtist({ id: editingId, ...validatedData });
      } else {
        // 생성 모드
        await createArtist(validatedData);
      }
      setFormValues(initialState);
      setEditingId(null);
      setError("");
    } catch (error: any) {
      // API 에러 메시지를 폼에 표시
      const errorMessage =
        error.message ||
        `작곡가 정보를 ${editingId ? "수정" : "등록"}하는데 실패했습니다`;
      setError(errorMessage);
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
            작곡가 정보 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            작곡가 정보를 등록하고 관리할 수 있습니다
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleNewArtist}
            className="px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
          >
            + 작곡가 등록
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
                    managingAliasesId
                      ? "bg-green-500"
                      : editingId
                      ? "bg-orange-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {managingAliasesId
                    ? "다른 명의 관리"
                    : editingId
                    ? "작곡가 정보 수정"
                    : "작곡가 정보 등록"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormValues(initialState);
                  setError("");
                  setManagingAliasesId(null);
                  setAliasInput("");
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

            {/* 다른 명의 관리 폼 */}
            {managingAliasesId && (
              <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  {artists.find((a) => a.id === managingAliasesId)?.name}의 다른
                  명의
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                    placeholder="다른 명의 입력"
                    className="flex-1 input-style"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddAlias();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddAlias}
                    className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all shadow-md hover:shadow-lg font-medium"
                  >
                    추가
                  </button>
                  <button
                    onClick={() => {
                      setManagingAliasesId(null);
                      setAliasInput("");
                      setError("");
                      setShowForm(false);
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600 font-medium"
                  >
                    취소
                  </button>
                </div>
                <div className="space-y-2">
                  {artists
                    .find((a) => a.id === managingAliasesId)
                    ?.aliases?.map((alias) => (
                      <div
                        key={alias.id}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                      >
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {alias.alias}
                        </span>
                        <button
                          onClick={() => handleDeleteAlias(alias.id)}
                          className="px-3 py-1 text-sm bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  {(!artists.find((a) => a.id === managingAliasesId)?.aliases ||
                    artists.find((a) => a.id === managingAliasesId)?.aliases
                      ?.length === 0) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      등록된 다른 명의가 없습니다
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 작곡가 등록/수정 폼 */}
            {!managingAliasesId && (
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
                    placeholder="작곡가명"
                    value={formValues.name}
                    onChange={handleChange}
                    className="input-style"
                  />

                  <div className="flex gap-3 md:col-span-3">
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
            )}
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
                작곡가 리스트
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="작곡가명 또는 다른 명의로 검색..."
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
