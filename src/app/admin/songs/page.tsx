"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { useQuery } from "@tanstack/react-query";
import { useSongs } from "@entities/songs/api/songs.queries";
import {
  useCreateSong,
  useUpdateSong,
  useDeleteSong,
} from "@entities/songs/api/songs.mutaions";
import { useArtists } from "@entities/artists/api/artists.queries";
import { useCreateArtists } from "@entities/artists/api/artists.mutaions";
import { versionsQueries } from "@entities/versions/api/versions.queries";
import { useTags, Tag } from "@entities/tags";
import { useCreateTag } from "@entities/tags/api/tags.mutations";
import { z } from "zod";
import Link from "next/link";

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

const columnHelper = createColumnHelper<Song>();

interface FormValues {
  title: string;
  artist: string;
  minBpm?: string;
  maxBpm?: string;
  bpm?: string; // 단일 BPM (BPM 변경 없는 경우)
  isVariableBpm: boolean; // BPM 변경 여부
  versionId: string; // 버전 ID
  version: string; // 버전명 (표시용)
  imageUrl: string; // 이미지 URL
  isExist: boolean;
  isHot: boolean;
  isLicense: boolean;
  isCover: boolean;
  isLong: boolean;
}

const initialState: FormValues = {
  title: "",
  artist: "",
  minBpm: "",
  maxBpm: "",
  bpm: "",
  isVariableBpm: false, // 기본값: 체크 해제
  versionId: "",
  version: "",
  imageUrl: "",
  isExist: true,
  isHot: false,
  isLicense: false,
  isCover: false,
  isLong: false,
};

const formSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요"),
  artist: z.string().trim().min(1, "작곡가를 입력해주세요"),
  minBpm: z.string().optional(),
  maxBpm: z.string().optional(),
  bpm: z.string().optional(),
  isVariableBpm: z.boolean().default(false),
  version: z.string().trim().min(1, "버전을 입력해주세요"),
  imageUrl: z.string().optional(),
  isExist: z.boolean().default(true),
  isHot: z.boolean().default(false),
  isLicense: z.boolean().default(false),
  isCover: z.boolean().default(false),
  isLong: z.boolean().default(false),
});

// 날짜 포맷팅 함수: yyyy.mm.dd
const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function Songs() {
  const router = useRouter();
  const { data: songs = [] } = useSongs() as { data: Song[] };
  const { data: artists = [] } = useArtists() as { data: any[] };
  const { data: versions = [] } = useQuery(
    versionsQueries.getAllVersions()
  ) as { data: any[] };

  // 버전 목록을 오름차순으로 정렬 (오래된 버전이 먼저)
  const sortedVersions = useMemo(() => {
    return [...versions].sort((a, b) => {
      // startedAt으로 정렬 (오름차순 - 오래된 버전이 먼저)
      const dateA = new Date(a.startedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.startedAt || b.createdAt || 0).getTime();
      return dateA - dateB;
    });
  }, [versions]);

  // 최신 버전 찾기 (startedAt 기준으로 가장 최근인 버전)
  const latestVersion = useMemo(() => {
    if (versions.length === 0) return null;
    return versions.reduce((latest, current) => {
      const latestDate = new Date(
        latest.startedAt || latest.createdAt || 0
      ).getTime();
      const currentDate = new Date(
        current.startedAt || current.createdAt || 0
      ).getTime();
      return currentDate > latestDate ? current : latest;
    });
  }, [versions]);
  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [error, setError] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [artistSearchQuery, setArtistSearchQuery] = useState<string>("");
  const [showArtistDropdown, setShowArtistDropdown] = useState<boolean>(false);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [tagSearchQuery, setTagSearchQuery] = useState<string>("");
  const [showTagDropdown, setShowTagDropdown] = useState<boolean>(false);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const { data: allTags = [] } = useTags(); // 모든 태그 로드
  const { data: searchTags = [] } = useTags(tagSearchQuery || undefined); // 검색 태그

  // 검색어가 있으면 검색 결과, 없으면 전체 태그 사용
  const tags = tagSearchQuery ? searchTags : allTags;

  // 입력된 검색어와 완전히 일치하는 태그가 있는지 확인
  const hasExactTagMatch = useMemo(() => {
    if (!tagSearchQuery.trim()) {
      return false;
    }
    const query = tagSearchQuery.trim().toLowerCase();
    return allTags.some(
      (tag) =>
        tag.name.toLowerCase() === query || tag.key.toLowerCase() === query
    );
  }, [allTags, tagSearchQuery]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { mutateAsync: createSong } = useCreateSong();
  const { mutateAsync: updateSong } = useUpdateSong();
  const { mutateAsync: deleteSong } = useDeleteSong();
  const { mutateAsync: createArtist } = useCreateArtists();
  const { mutateAsync: createTag } = useCreateTag();

  // 버전 목록이 로드되거나 폼이 열릴 때 최신 버전을 기본값으로 설정
  useEffect(() => {
    if (latestVersion && !editingId && formValues.versionId === "") {
      setFormValues((prev) => ({
        ...prev,
        versionId: String(latestVersion.id),
        version: latestVersion.name,
      }));
    }
  }, [latestVersion, editingId, formValues.versionId]); // latestVersion, editingId, formValues.versionId 변경 시 확인

  // 작곡가 검색 필터링 (메인 이름과 별명 모두 검색)
  const filteredArtists = useMemo(() => {
    if (!artistSearchQuery.trim()) {
      return [];
    }
    const query = artistSearchQuery.toLowerCase().trim();
    return artists.filter((artist: any) => {
      // 메인 이름으로 검색
      if (artist.name.toLowerCase().includes(query)) {
        return true;
      }
      // 별명으로 검색
      if (artist.aliases && artist.aliases.length > 0) {
        return artist.aliases.some((alias: any) =>
          alias.alias.toLowerCase().includes(query)
        );
      }
      return false;
    });
  }, [artists, artistSearchQuery]);

  // 입력된 검색어와 완전히 일치하는 작곡가가 있는지 확인
  const hasExactMatch = useMemo(() => {
    if (!artistSearchQuery.trim()) {
      return false;
    }
    const query = artistSearchQuery.trim().toLowerCase();
    return artists.some((artist: any) => {
      // 메인 이름과 완전히 일치하는지 확인
      if (artist.name.toLowerCase() === query) {
        return true;
      }
      // alias와 완전히 일치하는지 확인
      if (artist.aliases && artist.aliases.length > 0) {
        return artist.aliases.some(
          (alias: any) => alias.alias.toLowerCase() === query
        );
      }
      return false;
    });
  }, [artists, artistSearchQuery]);

  const handleArtistSelect = useCallback(
    (artist: any, selectedName?: string) => {
      setSelectedArtistId(artist.id);
      const displayName = selectedName || artist.name;
      setFormValues((prev) => ({
        ...prev,
        artist: displayName,
      }));
      setArtistSearchQuery(displayName);
      setShowArtistDropdown(false);
    },
    []
  );

  const handleCreateNewArtist = useCallback(
    async (artistName: string) => {
      try {
        const newArtist = await createArtist({ name: artistName.trim() });
        setSelectedArtistId(newArtist.id);
        setFormValues((prev) => ({
          ...prev,
          artist: newArtist.name,
        }));
        setArtistSearchQuery(newArtist.name);
        setShowArtistDropdown(false);
      } catch (error: any) {
        toast.error(`작곡가 추가에 실패했습니다: ${error.message}`);
      }
    },
    [createArtist]
  );

  const handleCreateNewTag = useCallback(
    async (tagName: string) => {
      try {
        const trimmedName = tagName.trim();
        // key는 소문자로 변환 (공백은 하이픈으로 변경)
        const key = trimmedName.toLowerCase().replace(/\s+/g, "-");
        const newTag = await createTag({
          key,
          name: trimmedName,
        });
        // 새로 추가한 태그를 선택 목록에 추가
        setSelectedTagIds((prev) => [...prev, newTag.id]);
        setTagSearchQuery("");
        setShowTagDropdown(false);
      } catch (error: any) {
        toast.error(`태그 추가에 실패했습니다: ${error.message}`);
      }
    },
    [createTag]
  );

  const handleEdit = useCallback(
    (song: Song) => {
      setEditingId(song.id);
      // BPM 파싱 (형식: "min-max" 또는 단일 값)
      let minBpm = "";
      let maxBpm = "";
      let bpm = "";
      let isVariableBpm = false;
      if (song.bpm) {
        const bpmParts = song.bpm.split("-");
        if (bpmParts.length === 2) {
          minBpm = bpmParts[0].trim();
          maxBpm = bpmParts[1].trim();
          // 최소와 최대가 같으면 단일 BPM으로 처리
          if (minBpm === maxBpm) {
            bpm = minBpm;
            isVariableBpm = false;
          } else {
            isVariableBpm = true;
          }
        } else {
          bpm = song.bpm.trim();
          isVariableBpm = false;
        }
      }

      // 버전명으로 버전 ID 찾기
      let versionId = "";
      let versionName = song.version;
      if (song.version) {
        const foundVersion = versions.find((v) => v.name === song.version);
        if (foundVersion) {
          versionId = String(foundVersion.id);
          versionName = foundVersion.name; // 최신 버전명으로 업데이트
        }
      }

      setFormValues({
        title: song.title,
        artist: song.artist,
        minBpm,
        maxBpm,
        bpm,
        isVariableBpm,
        versionId,
        version: versionName,
        imageUrl: song.imageUrl || "",
        isExist: song.isExist ?? true,
        isHot: song.isHot ?? false,
        isLicense: song.isLicense ?? false,
        isCover: song.isCover ?? false,
        isLong: song.isLong ?? false,
      });
      setSelectedArtistId(song.artistInfo?.id || null);
      setArtistSearchQuery(song.artist);
      // 태그 설정
      const tagIds = song.tags?.map((t) => t.tag.id) || [];
      setSelectedTagIds(tagIds);
      setError("");
      setShowForm(true);
      // 폼으로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [versions]
  );

  const handleDelete = useCallback(
    async (song: Song) => {
      if (
        !window.confirm(
          `"${song.title}" 곡을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
        )
      ) {
        return;
      }

      try {
        await deleteSong(song.id);
        toast.success("곡이 삭제되었습니다.");
      } catch (error: any) {
        toast.error(`곡 삭제 실패: ${error.message}`);
      }
    },
    [deleteSong]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        header: "제목",
        enableSorting: true,
        cell: (info) => {
          const song = info.row.original;
          return (
            <Link
              href={`/admin/songs/${song.id}`}
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
            // 최소와 최대가 같으면 하나만 표시
            if (minBpm === maxBpm) {
              return maxBpm;
            }
            return bpm;
          }
          return bpm;
        },
      }),
      columnHelper.accessor("version", {
        header: "버전",
        enableSorting: true,
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "isLong",
        header: "롱곡",
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const a = rowA.original.isLong ? 1 : 0;
          const b = rowB.original.isLong ? 1 : 0;
          return a - b;
        },
        cell: (info) => {
          const song = info.row.original;
          return song.isLong ? "✅" : "";
        },
      }),
      columnHelper.display({
        id: "isLicense",
        header: "라이센스",
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const a = rowA.original.isLicense ? 1 : 0;
          const b = rowB.original.isLicense ? 1 : 0;
          return a - b;
        },
        cell: (info) => {
          const song = info.row.original;
          return song.isLicense ? "✅" : "";
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

  // 검색어로 필터링된 노래 목록
  const filteredSongs = useMemo(() => {
    let result = songs;

    // 활성화 여부 필터링
    if (statusFilter !== "all") {
      result = result.filter((song) => {
        if (statusFilter === "active") return song.isExist !== false;
        if (statusFilter === "inactive") return song.isExist === false;
        return true;
      });
    }

    if (!searchQuery.trim()) {
      return result;
    }

    const query = searchQuery.toLowerCase().trim();
    return result.filter((song) => {
      // 제목으로 검색
      if (song.title.toLowerCase().includes(query)) {
        return true;
      }
      // 작곡가명으로 검색
      if (song.artist.toLowerCase().includes(query)) {
        return true;
      }
      // 작곡가 정보로 검색
      if (song.artistInfo?.name.toLowerCase().includes(query)) {
        return true;
      }
      // 버전으로 검색
      if (song.version.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
  }, [songs, searchQuery, statusFilter]);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormValues((prev) => ({
        ...prev,
        imageUrl: data.url,
      }));
      toast.success("이미지가 업로드되었습니다");
    } catch (error) {
      console.error(error);
      toast.error("이미지 업로드 실패");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;

    setFormValues((prev) => {
      const newValues = {
        ...prev,
        [name]:
          target.type === "checkbox"
            ? (target as HTMLInputElement).checked
            : value,
      };

      // BPM 변경 체크박스 변경 시 관련 필드 초기화
      if (name === "isVariableBpm") {
        const isChecked = (target as HTMLInputElement).checked;
        if (isChecked) {
          // 체크박스 체크: 단일 BPM 필드 초기화
          newValues.bpm = "";
        } else {
          // 체크박스 해제: 최소/최대 BPM 필드 초기화
          newValues.minBpm = "";
          newValues.maxBpm = "";
        }
      }

      return newValues;
    });

    // 입력 중 에러 메시지 초기화
    if (error) setError("");
  };

  // input에서 포커스를 잃을 때 양옆 공백 제거 (단어 사이 공백은 유지)
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // checkbox나 number 타입이 아닌 경우에만 trim 적용
    if (type !== "checkbox" && type !== "number" && typeof value === "string") {
      const trimmedValue = value.trim();
      if (trimmedValue !== value) {
        setFormValues((prev) => ({
          ...prev,
          [name]: trimmedValue,
        }));
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormValues({
      ...initialState,
      versionId: latestVersion ? String(latestVersion.id) : "",
      version: latestVersion ? latestVersion.name : "",
      imageUrl: "",
    });
    setArtistSearchQuery("");
    setSelectedArtistId(null);
    setShowArtistDropdown(false);
    setTagSearchQuery("");
    setShowTagDropdown(false);
    setSelectedTagIds([]);
    setError("");
    setShowForm(false);
  };

  const handleNewSong = () => {
    setEditingId(null);
    // 최신 버전을 기본값으로 설정
    setFormValues({
      ...initialState,
      versionId: latestVersion ? String(latestVersion.id) : "",
      version: latestVersion ? latestVersion.name : "",
    });
    setArtistSearchQuery("");
    setSelectedArtistId(null);
    setShowArtistDropdown(false);
    setTagSearchQuery("");
    setShowTagDropdown(false);
    setSelectedTagIds([]);
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

    // BPM 처리
    let bpm: string | undefined = undefined;
    if (formValues.isVariableBpm) {
      // BPM 변경이 있는 경우: 최소-최대 형식
      if (validatedData.minBpm || validatedData.maxBpm) {
        if (validatedData.minBpm && validatedData.maxBpm) {
          bpm = `${validatedData.minBpm}-${validatedData.maxBpm}`;
        } else if (validatedData.minBpm) {
          bpm = validatedData.minBpm;
        } else if (validatedData.maxBpm) {
          bpm = validatedData.maxBpm;
        }
      }
    } else {
      // BPM 변경이 없는 경우: 단일 BPM 값을 최소/최대 둘 다에 저장
      if (validatedData.bpm) {
        bpm = `${validatedData.bpm}-${validatedData.bpm}`;
      }
    }

    // 체크박스 필드들도 명시적으로 포함 (boolean 값으로 보장)
    const submitData = {
      title: validatedData.title,
      artist: validatedData.artist,
      bpm,
      versionId: formValues.versionId, // 버전 ID 전달
      version: validatedData.version, // 버전명도 함께 전달 (API에서 조회해서 최신 버전명으로 저장)
      imageUrl: validatedData.imageUrl || undefined,
      isExist: Boolean(formValues.isExist),
      isHot: Boolean(formValues.isHot),
      isLicense: Boolean(formValues.isLicense),
      isCover: Boolean(formValues.isCover),
      isLong: Boolean(formValues.isLong),
      tagIds: selectedTagIds,
    };

    try {
      if (editingId) {
        // 수정 모드
        await updateSong({ id: editingId, ...submitData });
      } else {
        // 생성 모드
        await createSong(submitData);
      }
      // 저장 후 선택한 버전 유지
      const currentVersionId = formValues.versionId;
      const currentVersion = formValues.version;
      setFormValues({
        ...initialState,
        versionId:
          currentVersionId || (latestVersion ? String(latestVersion.id) : ""),
        version: currentVersion || (latestVersion ? latestVersion.name : ""),
        imageUrl: "",
      });
      setEditingId(null);
      setArtistSearchQuery("");
      setSelectedArtistId(null);
      setShowArtistDropdown(false);
      setTagSearchQuery("");
      setShowTagDropdown(false);
      setSelectedTagIds([]);
      setError("");
    } catch (error: any) {
      toast.error(
        `노래 정보를 ${editingId ? "수정" : "등록"}하는데 실패했습니다: ${
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
            노래 정보 관리
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            노래 정보를 등록하고 관리할 수 있습니다
          </p>
        </div>
        {!showForm && (
          <button
            onClick={handleNewSong}
            className="px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700"
          >
            + 노래 등록
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
                  {editingId ? "노래 정보 수정" : "노래 정보 등록"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormValues(initialState);
                  setArtistSearchQuery("");
                  setSelectedArtistId(null);
                  setShowArtistDropdown(false);
                  setTagSearchQuery("");
                  setShowTagDropdown(false);
                  setSelectedTagIds([]);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="제목"
                  value={formValues.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />

                <div className="relative">
                  <input
                    type="text"
                    name="artist"
                    placeholder="작곡가 검색"
                    value={artistSearchQuery}
                    onChange={(e) => {
                      setArtistSearchQuery(e.target.value);
                      setShowArtistDropdown(true);
                      setFormValues((prev) => ({
                        ...prev,
                        artist: e.target.value,
                      }));
                      // 입력 중이면 선택 해제
                      if (selectedArtistId) {
                        setSelectedArtistId(null);
                      }
                    }}
                    onFocus={() => {
                      if (artistSearchQuery.trim()) {
                        setShowArtistDropdown(true);
                      }
                    }}
                    onBlur={(e) => {
                      // 양옆 공백 제거
                      const trimmedValue = e.target.value.trim();
                      if (trimmedValue !== e.target.value) {
                        setArtistSearchQuery(trimmedValue);
                        setFormValues((prev) => ({
                          ...prev,
                          artist: trimmedValue,
                        }));
                      }
                      // 드롭다운 클릭을 위해 약간의 지연
                      setTimeout(() => setShowArtistDropdown(false), 200);
                    }}
                    className={`px-4 py-3 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full transition-colors ${
                      selectedArtistId
                        ? "border-green-500 dark:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                    }`}
                  />
                  {selectedArtistId && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                  {showArtistDropdown && artistSearchQuery.trim() && (
                    <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl shadow-2xl max-h-60 overflow-auto backdrop-blur-sm">
                      {filteredArtists.length > 0 &&
                        filteredArtists.map((artist: any) => {
                          const query = artistSearchQuery.toLowerCase().trim();
                          const isMainNameMatch = artist.name
                            .toLowerCase()
                            .includes(query);
                          const matchingAliases =
                            artist.aliases?.filter((alias: any) =>
                              alias.alias.toLowerCase().includes(query)
                            ) || [];

                          return (
                            <div key={artist.id}>
                              {/* 메인 이름이 검색어와 일치하면 표시 */}
                              {isMainNameMatch && (
                                <>
                                  <div
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleArtistSelect(artist, artist.name);
                                    }}
                                    className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
                                  >
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                      {artist.name}
                                    </div>
                                    {artist.aliases &&
                                      artist.aliases.length > 0 && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                                          다른 명의:{" "}
                                          {artist.aliases
                                            .map((a: any) => a.alias)
                                            .join(", ")}
                                        </div>
                                      )}
                                  </div>
                                  {/* 메인 이름이 일치할 때도 모든 alias를 표시하여 선택 가능하게 함 */}
                                  {artist.aliases &&
                                    artist.aliases.length > 0 &&
                                    artist.aliases.map((alias: any) => (
                                      <div
                                        key={`${artist.id}-${alias.alias}`}
                                        onMouseDown={(e) => {
                                          e.preventDefault();
                                          handleArtistSelect(
                                            artist,
                                            alias.alias
                                          );
                                        }}
                                        className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0 pl-8 transition-colors"
                                      >
                                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                                          {alias.alias}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                                          메인: {artist.name}
                                        </div>
                                      </div>
                                    ))}
                                </>
                              )}

                              {/* 별명이 검색어와 일치하는 경우만 별명들 표시 (메인 이름과 중복 제거) */}
                              {!isMainNameMatch &&
                                matchingAliases.map((alias: any) => (
                                  <div
                                    key={`${artist.id}-${alias.alias}`}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      handleArtistSelect(artist, alias.alias);
                                    }}
                                    className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0 pl-8 transition-colors"
                                  >
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                      {alias.alias}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                                      메인: {artist.name}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          );
                        })}
                      {/* 완전히 일치하는 작곡가가 없으면 "새로 추가" 버튼 표시 */}
                      {!hasExactMatch && (
                        <>
                          {filteredArtists.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700"></div>
                          )}
                          <div
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleCreateNewArtist(artistSearchQuery);
                            }}
                            className="px-4 py-3 hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-5 h-5 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <div className="font-semibold text-green-600 dark:text-green-400">
                                "{artistSearchQuery}" 작곡가 추가
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                              클릭하여 새 작곡가를 추가합니다
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="isVariableBpm"
                      checked={formValues.isVariableBpm}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 transition-all cursor-pointer"
                    />
                    <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      BPM 변경 있는 곡
                    </span>
                  </label>
                  {formValues.isVariableBpm ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="minBpm"
                        placeholder="최소 BPM (선택)"
                        value={formValues.minBpm || ""}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        min="0"
                      />
                      <input
                        type="number"
                        name="maxBpm"
                        placeholder="최대 BPM (선택)"
                        value={formValues.maxBpm || ""}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        min="0"
                      />
                    </div>
                  ) : (
                    <input
                      type="number"
                      name="bpm"
                      placeholder="BPM (선택)"
                      value={formValues.bpm || ""}
                      onChange={handleChange}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      min="0"
                    />
                  )}
                </div>

                <select
                  name="versionId"
                  value={formValues.versionId}
                  onChange={(e) => {
                    const selectedVersionId = e.target.value;
                    const selectedVersion = sortedVersions.find(
                      (v) => String(v.id) === selectedVersionId
                    );
                    setFormValues((prev) => ({
                      ...prev,
                      versionId: selectedVersionId,
                      version: selectedVersion ? selectedVersion.name : "",
                    }));
                  }}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">버전 선택</option>
                  {sortedVersions.map((version) => (
                    <option key={version.id} value={String(version.id)}>
                      {version.name}
                    </option>
                  ))}
                </select>

                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    {formValues.imageUrl && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formValues.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500 dark:text-gray-400
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          dark:file:bg-blue-900/20 dark:file:text-blue-400
                        "
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        이미지는 /image/thumbnail 경로에 저장됩니다.
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="이미지 URL (직접 입력 또는 업로드 시 자동 입력)"
                    value={formValues.imageUrl || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full"
                  />
                </div>

                {/* 태그 선택 섹션 */}
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    placeholder="태그 검색"
                    value={tagSearchQuery}
                    onChange={(e) => {
                      setTagSearchQuery(e.target.value);
                      setShowTagDropdown(true);
                    }}
                    onFocus={() => {
                      if (tagSearchQuery.trim()) {
                        setShowTagDropdown(true);
                      }
                    }}
                    onBlur={(e) => {
                      // 양옆 공백 제거
                      const trimmedValue = e.target.value.trim();
                      if (trimmedValue !== e.target.value) {
                        setTagSearchQuery(trimmedValue);
                      }
                      setTimeout(() => setShowTagDropdown(false), 200);
                    }}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full"
                  />
                  {showTagDropdown && tagSearchQuery.trim() && (
                    <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl shadow-2xl max-h-60 overflow-auto backdrop-blur-sm">
                      {/* 검색 결과 태그 목록 */}
                      {tags.filter((tag) => !selectedTagIds.includes(tag.id))
                        .length > 0 && (
                        <>
                          {tags
                            .filter((tag) => !selectedTagIds.includes(tag.id))
                            .map((tag) => (
                              <div
                                key={tag.id}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  if (!selectedTagIds.includes(tag.id)) {
                                    setSelectedTagIds([
                                      ...selectedTagIds,
                                      tag.id,
                                    ]);
                                  }
                                  setTagSearchQuery("");
                                  setShowTagDropdown(false);
                                }}
                                className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                              >
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                  {tag.name}
                                </div>
                              </div>
                            ))}
                        </>
                      )}
                      {/* 완전히 일치하는 태그가 없으면 "새로 추가" 버튼 표시 */}
                      {!hasExactTagMatch && (
                        <>
                          {tags.filter(
                            (tag) => !selectedTagIds.includes(tag.id)
                          ).length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700"></div>
                          )}
                          <div
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleCreateNewTag(tagSearchQuery);
                            }}
                            className="px-4 py-3 hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-5 h-5 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <div className="font-semibold text-green-600 dark:text-green-400">
                                "{tagSearchQuery}" 태그 추가
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                              클릭하여 새 태그를 추가합니다
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 선택된 태그 표시 */}
              {selectedTagIds.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTagIds.map((tagId) => {
                    // 전체 태그 목록에서 찾기
                    let tag = allTags.find((t) => t.id === tagId);
                    // 없으면 수정 중인 곡의 태그에서 찾기
                    if (!tag && editingId) {
                      const song = songs.find((s) => s.id === editingId);
                      tag = song?.tags?.find((t) => t.tag.id === tagId)?.tag;
                    }
                    if (!tag) return null;
                    const tagColor = tag.color || "#3b82f6";
                    return (
                      <span
                        key={tagId}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: tagColor }}
                      >
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTagIds(
                              selectedTagIds.filter((id) => id !== tagId)
                            );
                          }}
                          className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                          aria-label={`${tag.name} 태그 제거`}
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isExist"
                    checked={formValues.isExist}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 transition-all cursor-pointer"
                  />
                  <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    활성화
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isHot"
                    checked={formValues.isHot}
                    onChange={handleChange}
                    className="w-5 h-5 text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500 dark:focus:ring-red-400 focus:ring-2 transition-all cursor-pointer"
                  />
                  <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    핫곡
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isLicense"
                    checked={formValues.isLicense}
                    onChange={handleChange}
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-400 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:ring-2 transition-all cursor-pointer"
                  />
                  <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    라이센스
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isLong"
                    checked={formValues.isLong}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-2 transition-all cursor-pointer"
                  />
                  <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    롱곡
                  </span>
                </label>
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
                노래 리스트
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as "all" | "active" | "inactive"
                  )
                }
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="all">전체 상태</option>
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
              </select>
              <input
                type="text"
                placeholder="제목, 작곡가, 버전으로 검색..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                  });
                }}
                onBlur={(e) => {
                  // 양옆 공백 제거
                  const trimmedValue = e.target.value.trim();
                  if (trimmedValue !== e.target.value) {
                    setSearchQuery(trimmedValue);
                    setPagination({
                      pageIndex: 0,
                      pageSize: pagination.pageSize,
                    });
                  }
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
                  const song = row.original;
                  const isInactive = song.isExist === false;

                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm ${
                        isInactive
                          ? idx % 2 === 0
                            ? "bg-red-50 dark:bg-red-900/20"
                            : "bg-red-100 dark:bg-red-900/30"
                          : idx % 2 === 0
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
