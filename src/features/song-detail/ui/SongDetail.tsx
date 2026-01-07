"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useSong } from "@entities/songs/api/songs.queries";
import { getSongInfoByName } from "@entities/songs/api/songs.service";
import { useUpdateSongById } from "@entities/songs/api/songs.mutaions";
import {
  useCreateSongLevel,
  useUpdateSongLevel,
} from "@entities/songs/api/songs.mutaions";
import { versionsQueries } from "@entities/versions/api/versions.queries";
import { useArtists } from "@entities/artists/api/artists.queries";
import { useTags, Tag } from "@entities/tags";
import { z } from "zod";

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

interface FormValues {
  title: string;
  artist: string;
  minBpm?: string;
  maxBpm?: string;
  bpm?: string; // 단일 BPM (BPM 변경 없는 경우)
  isVariableBpm: boolean; // BPM 변경 여부
  version: string;
  imageUrl: string;
  isExist: boolean;
  isLicense: boolean;
  isCover: boolean;
  isLong: boolean;
}

interface SongDetailProps {
  songId: number;
  isAdmin?: boolean;
  backPath?: string;
}

const formSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요"),
  artist: z.string().trim().min(1, "작곡가를 입력해주세요"),
  minBpm: z.string().optional(),
  maxBpm: z.string().optional(),
  bpm: z.string().optional(),
  isVariableBpm: z.boolean().default(false),
  version: z.string().trim().min(1, "버전을 입력해주세요"),
  imageUrl: z.string().optional(),
});

export function SongDetail({
  songId,
  isAdmin = false,
  backPath = "/admin/songs",
}: SongDetailProps) {
  const router = useRouter();
  const { data: song, isLoading } = useSong(songId);
  const { data: versions = [] } = useQuery(
    versionsQueries.getAllVersions()
  ) as { data: any[] };
  const { data: artists = [] } = useArtists() as { data: any[] };
  const { mutateAsync: updateSong } = useUpdateSongById();
  const createSongLevel = useCreateSongLevel(songId);
  const updateSongLevel = useUpdateSongLevel(songId);

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    artist: "",
    minBpm: "",
    maxBpm: "",
    bpm: "",
    isVariableBpm: false, // 기본값: 체크 해제
    version: "",
    imageUrl: "",
    isExist: true,
    isLicense: false,
    isCover: false,
    isLong: false,
  });
  const [duplicateWarning, setDuplicateWarning] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [editingVersionId, setEditingVersionId] = useState<number | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [artistSearchQuery, setArtistSearchQuery] = useState<string>("");
  const [showArtistDropdown, setShowArtistDropdown] = useState<boolean>(false);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [tagSearchQuery, setTagSearchQuery] = useState<string>("");
  const [showTagDropdown, setShowTagDropdown] = useState<boolean>(false);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  const { data: allTags = [] } = useTags();
  const { data: searchTags = [] } = useTags(tagSearchQuery || undefined);

  // 중복 곡 체크
  useEffect(() => {
    const checkDuplicate = async () => {
      if (!formValues.title.trim()) {
        setDuplicateWarning("");
        return;
      }

      try {
        const songs = await getSongInfoByName(formValues.title.trim());
        // 수정 중일 때는 현재 곡은 제외하고 체크
        const duplicates = songs.filter((s: any) =>
          songId ? s.id !== songId : true
        );

        if (duplicates.length > 0) {
          setDuplicateWarning("이미 존재하는 곡 제목입니다.");
        } else {
          setDuplicateWarning("");
        }
      } catch (error) {
        console.error("Failed to check duplicate", error);
      }
    };

    const timer = setTimeout(checkDuplicate, 500);
    return () => clearTimeout(timer);
  }, [formValues.title, songId]);

  const songLevels = useMemo(() => {
    return (song?.levels || []) as SongLevel[];
  }, [song]);

  const hasInitializedLevels = useRef(false);

  // 버전을 classic/gitadora로 분류하는 함수
  const getVersionType = useCallback(
    (versionName: string): "classic" | "gitadora" => {
      // v6까지는 classic (v1, v2, v3, v4, v5, v6)
      const classicPattern = /^v[1-6]$/i;
      if (classicPattern.test(versionName)) {
        return "classic";
      }
      // XG 이후는 gitadora
      return "gitadora";
    },
    []
  );

  // 버전 목록 (레벨이 있는 버전만)
  const versionList = useMemo(() => {
    const versionIds = new Set(songLevels.map((level) => level.versionId));
    return versions
      .filter((v: any) => versionIds.has(v.id))
      .sort(
        (a: any, b: any) =>
          new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
      );
  }, [songLevels, versions]);

  // 버전 목록을 classic/gitadora로 그룹화
  const groupedVersions = useMemo(() => {
    const classic: any[] = [];
    const gitadora: any[] = [];

    versionList.forEach((version: any) => {
      const type = getVersionType(version.name);
      if (type === "classic") {
        classic.push(version);
      } else {
        gitadora.push(version);
      }
    });

    return { classic, gitadora };
  }, [versionList, getVersionType]);

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
    const songVersion = versions.find(
      (v: any) => v.name === song.version
    ) as any;

    if (!songVersion) {
      console.warn(
        `[AutoLevel] Version not found for song: ${song.title}, version: ${song.version}`
      );
      return;
    }

    // 해당 버전부터 현재까지의 모든 버전 찾기 (startedAt 기준)
    const songVersionStartedAt = new Date(songVersion.startedAt).getTime();
    const targetVersions = versions.filter((v: any) => {
      const vStartedAt = new Date(v.startedAt).getTime();
      return vStartedAt >= songVersionStartedAt;
    });

    if (targetVersions.length === 0) {
      console.warn(
        `[AutoLevel] No target versions found for song: ${song.title}`
      );
      return;
    }

    // 자동 생성 시작
    hasInitializedLevels.current = true;
    toast.info("레벨 데이터가 없어 자동으로 생성합니다...");

    const createLevels = async () => {
      const difficulties = ["BASIC", "ADVANCED", "EXTREME", "MASTER"];
      let createdCount = 0;

      for (const version of targetVersions) {
        const versionType = getVersionType(version.name);
        // classic은 DRUM, GUITAR, BASS, OPEN, gitadora는 DRUM, GUITAR, BASS
        const instruments =
          versionType === "classic"
            ? ["DRUM", "GUITAR", "BASS", "OPEN"]
            : ["DRUM", "GUITAR", "BASS"];

        for (const instrument of instruments) {
          for (const difficulty of difficulties) {
            try {
              await createSongLevel.mutateAsync({
                versionId: version.id,
                instrumentType: instrument,
                difficulty: difficulty,
                level: 0,
              });
              createdCount++;
            } catch (error) {
              // 이미 존재하는 레벨이면 무시
              console.log(
                `Level already exists: ${version.name} - ${instrument} - ${difficulty}`
              );
            }
          }
        }
      }

      if (createdCount > 0) {
        toast.success(`${createdCount}개의 레벨 정보가 생성되었습니다.`);
      }
    };

    createLevels();
  }, [song, versions, songLevels, createSongLevel, getVersionType]);

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

  // 테이블 데이터 준비 (classic/gitadora별로)
  const classicTableData = useMemo(() => {
    return groupedVersions.classic.map((version: any) => {
      const versionLevels = groupedLevels[version.id] || {};
      const rowData: any = {
        version,
        versionId: version.id,
      };

      // classic은 DRUM, GUITAR, BASS, OPEN
      ["DRUM", "GUITAR", "BASS", "OPEN"].forEach((instrument) => {
        ["BASIC", "ADVANCED", "EXTREME", "MASTER"].forEach((difficulty) => {
          const level = versionLevels[instrument]?.[difficulty] || null;
          rowData[`${instrument}_${difficulty}`] = level;
        });
      });

      return rowData;
    });
  }, [groupedVersions.classic, groupedLevels]);

  const gitadoraTableData = useMemo(() => {
    return groupedVersions.gitadora.map((version: any) => {
      const versionLevels = groupedLevels[version.id] || {};
      const rowData: any = {
        version,
        versionId: version.id,
      };

      // gitadora는 DRUM, GUITAR, BASS
      ["DRUM", "GUITAR", "BASS"].forEach((instrument) => {
        ["BASIC", "ADVANCED", "EXTREME", "MASTER"].forEach((difficulty) => {
          const level = versionLevels[instrument]?.[difficulty] || null;
          rowData[`${instrument}_${difficulty}`] = level;
        });
      });

      return rowData;
    });
  }, [groupedVersions.gitadora, groupedLevels]);

  // 컬럼 헬퍼
  const classicColumnHelper =
    createColumnHelper<(typeof classicTableData)[0]>();
  const gitadoraColumnHelper =
    createColumnHelper<(typeof gitadoraTableData)[0]>();

  // 곡 정보의 버전 찾기 (레벨 등록 시 이전 버전 선택 방지용)
  const songVersion = useMemo(() => {
    if (!song?.version || !versions.length) return null;
    return versions.find((v: any) => v.name === song.version);
  }, [song?.version, versions]);

  // 태그 검색 필터링
  const tags = tagSearchQuery ? searchTags : allTags;

  // 작곡가 검색 필터링
  const filteredArtists = useMemo(() => {
    if (!artistSearchQuery.trim()) {
      return [];
    }
    const query = artistSearchQuery.toLowerCase().trim();
    return artists.filter((artist: any) => {
      if (artist.name.toLowerCase().includes(query)) {
        return true;
      }
      if (artist.aliases && artist.aliases.length > 0) {
        return artist.aliases.some((alias: any) =>
          alias.alias.toLowerCase().includes(query)
        );
      }
      return false;
    });
  }, [artists, artistSearchQuery]);

  useEffect(() => {
    if (song) {
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

      setFormValues({
        title: song.title || "",
        artist: song.artist || "",
        minBpm,
        maxBpm,
        bpm,
        isVariableBpm,
        version: song.version || "",
        imageUrl: song.imageUrl || "",
        isExist: song.isExist ?? true,
        isLicense: song.isLicense ?? false,
        isCover: song.isCover ?? false,
        isLong: song.isLong ?? false,
      });
      setSelectedArtistId(song.artistInfo?.id || null);
      setArtistSearchQuery(song.artist || "");
      // 태그 설정
      const tagIds = song.tags?.map((t: any) => t.tag.id) || [];
      setSelectedTagIds(tagIds);
    }
  }, [song]);

  const handleArtistSelect = (artist: any) => {
    setSelectedArtistId(artist.id);
    setFormValues((prev) => ({
      ...prev,
      artist: artist.name,
    }));
    setArtistSearchQuery(artist.name);
    setShowArtistDropdown(false);
  };

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

    // BPM 변경 체크박스 변경 시 관련 필드 초기화
    if (name === "isVariableBpm") {
      setFormValues((prev) => {
        const newValues = {
          ...prev,
          isVariableBpm: target.checked,
        };
        if (target.checked) {
          // 체크박스 체크: 단일 BPM 필드 초기화
          newValues.bpm = "";
        } else {
          // 체크박스 해제: 최소/최대 BPM 필드 초기화
          newValues.minBpm = "";
          newValues.maxBpm = "";
        }
        return newValues;
      });
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]:
          target.type === "checkbox"
            ? (target as HTMLInputElement).checked
            : value,
      }));
    }
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setError("");

    const validationResult = formSchema.safeParse(formValues);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      setError(firstError.message);
      return;
    }

    const validatedData = validationResult.data;

    // BPM 처리
    let bpm: string | undefined = undefined;
    if (validatedData.isVariableBpm) {
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

    try {
      await updateSong({
        id: songId,
        title: validatedData.title,
        artist: validatedData.artist,
        bpm,
        version: validatedData.version,
        imageUrl: validatedData.imageUrl || undefined,
        isExist: formValues.isExist,
        isLicense: formValues.isLicense,
        isCover: formValues.isCover,
        isLong: formValues.isLong,
        tagIds: selectedTagIds,
      });
      toast.success("곡 정보가 수정되었습니다.");
    } catch (error: any) {
      toast.error(`곡 정보를 수정하는데 실패했습니다: ${error.message}`);
    }
  };

  const handleEditVersionLevels = (versionId: number) => {
    if (!isAdmin) return;

    setEditingVersionId(versionId);
    // 입력 필드 초기화는 렌더링 시 처리
  };

  const handleCancelVersionEdit = () => {
    setEditingVersionId(null);
    // 입력 필드 초기화
    Object.values(inputRefs.current).forEach((ref) => {
      if (ref) {
        ref.value = "";
      }
    });
    inputRefs.current = {};
  };

  const handleSaveVersionLevels = async () => {
    if (!isAdmin || !editingVersionId) return;

    // 편집 중인 버전의 타입 확인
    const editingVersion = versions.find((v: any) => v.id === editingVersionId);
    if (!editingVersion) return;

    const versionType = getVersionType(editingVersion.name);
    // classic은 DRUM, GUITAR, BASS, OPEN, gitadora는 DRUM, GUITAR, BASS
    const instruments =
      versionType === "classic"
        ? ["DRUM", "GUITAR", "BASS", "OPEN"]
        : ["DRUM", "GUITAR", "BASS"];
    const difficulties = ["BASIC", "ADVANCED", "EXTREME", "MASTER"];

    // 입력 필드에서 값 읽기
    const levelValues: Record<string, string> = {};
    for (const instrument of instruments) {
      for (const difficulty of difficulties) {
        const key = `${instrument}_${difficulty}`;
        const input = inputRefs.current[key];
        if (input) {
          levelValues[key] = input.value.trim();
        }
      }
    }

    // 입력값 검증 및 보정 (0.00 ~ 9.99, 소수점 2자리)
    for (const instrument of instruments) {
      for (const difficulty of difficulties) {
        const key = `${instrument}_${difficulty}`;
        const value = levelValues[key];

        if (value && value !== "") {
          let numValue = parseFloat(value);
          if (isNaN(numValue)) {
            toast.error(
              `${instrument} ${difficulty}: 올바른 숫자를 입력해주세요.`
            );
            return;
          }

          // 소수점 2자리로 반올림
          numValue = parseFloat(numValue.toFixed(2));

          // 범위 보정 (0.00 ~ 9.99)
          if (numValue > 9.99) numValue = 9.99;
          if (numValue < 0.0) numValue = 0.0;

          // 보정된 값을 다시 문자열로 저장
          levelValues[key] = numValue.toFixed(2);
        }
      }
    }

    try {
      // 각 레벨 업데이트 또는 생성
      for (const instrument of instruments) {
        for (const difficulty of difficulties) {
          const key = `${instrument}_${difficulty}`;
          const value = levelValues[key];

          const existingLevel = songLevels.find(
            (l) =>
              l.versionId === editingVersionId &&
              l.instrumentType === instrument &&
              l.difficulty === difficulty
          );

          if (value && value !== "") {
            const numValue = parseFloat(value);
            if (existingLevel) {
              // 기존 레벨 업데이트
              await updateSongLevel.mutateAsync({
                id: existingLevel.id,
                level: numValue,
              });
            } else {
              // 새 레벨 생성
              await createSongLevel.mutateAsync({
                versionId: editingVersionId,
                instrumentType: instrument,
                difficulty: difficulty,
                level: numValue,
              });
            }
          } else if (existingLevel && existingLevel.level > 0) {
            // 값이 비어있고 기존 레벨이 있으면 0으로 업데이트 (삭제 대신)
            await updateSongLevel.mutateAsync({
              id: existingLevel.id,
              level: 0,
            });
          }
        }
      }

      toast.success("레벨 정보가 저장되었습니다.");
      setEditingVersionId(null);
      // 입력 필드 초기화
      Object.values(inputRefs.current).forEach((ref) => {
        if (ref) {
          ref.value = "";
        }
      });
      inputRefs.current = {};
    } catch (error: any) {
      toast.error(`레벨 정보를 저장하는데 실패했습니다: ${error.message}`);
    }
  };

  // classic 컬럼 정의
  const classicColumns = useMemo(() => {
    const cols: any[] = [
      classicColumnHelper.accessor("version", {
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

    // classic은 DRUM, GUITAR, BASS, OPEN
    ["DRUM", "GUITAR", "BASS", "OPEN"].forEach((instrument) => {
      ["BASIC", "ADVANCED", "EXTREME", "MASTER"].forEach((difficulty) => {
        const difficultyColors: Record<string, string> = {
          BASIC:
            "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
          ADVANCED:
            "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
          EXTREME:
            "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
          MASTER:
            "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
        };

        cols.push(
          classicColumnHelper.accessor(`${instrument}_${difficulty}`, {
            header: difficulty,
            cell: (info) => {
              const level = info.getValue();
              const versionId = info.row.original.versionId;
              const isEditing = isAdmin && editingVersionId === versionId;
              const key = `${instrument}_${difficulty}`;

              if (isEditing) {
                // 기존 레벨 값 가져오기
                const existingLevel = songLevels.find(
                  (l) =>
                    l.versionId === versionId &&
                    l.instrumentType === instrument &&
                    l.difficulty === difficulty
                );

                // 현재 버전보다 이전 버전의 레벨 정보 찾기
                let previousLevelValue = "";
                if (!existingLevel || existingLevel.level === 0) {
                  // 현재 버전의 startedAt 찾기
                  const currentVersion = versions.find(
                    (v: any) => v.id === versionId
                  );
                  if (currentVersion) {
                    const currentStartedAt = new Date(
                      currentVersion.startedAt
                    ).getTime();
                    // 이전 버전들 중 가장 최근 버전의 레벨 찾기
                    const previousVersions = versions
                      .filter((v: any) => {
                        const vStartedAt = new Date(v.startedAt).getTime();
                        return vStartedAt < currentStartedAt;
                      })
                      .sort((a: any, b: any) => {
                        return (
                          new Date(b.startedAt).getTime() -
                          new Date(a.startedAt).getTime()
                        );
                      });

                    // 이전 버전들 중에서 레벨이 있는 버전 찾기
                    for (const prevVersion of previousVersions) {
                      const prevLevel = songLevels.find(
                        (l) =>
                          l.versionId === prevVersion.id &&
                          l.instrumentType === instrument &&
                          l.difficulty === difficulty &&
                          l.level > 0
                      );
                      if (prevLevel) {
                        previousLevelValue = prevLevel.level.toString();
                        break;
                      }
                    }
                  }
                }

                const initialValue =
                  existingLevel && existingLevel.level > 0
                    ? existingLevel.level.toString()
                    : previousLevelValue;

                return (
                  <div className="px-1 py-1">
                    <input
                      ref={(el) => {
                        inputRefs.current[key] = el;
                        // ref가 설정될 때 초기값 설정
                        if (el && !el.value && initialValue) {
                          el.value = initialValue;
                        }
                      }}
                      type="text"
                      inputMode="decimal"
                      defaultValue={initialValue}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        // 숫자와 .만 허용
                        const filteredValue = newValue.replace(/[^0-9.]/g, "");
                        // .이 여러 개인 경우 첫 번째만 허용
                        const parts = filteredValue.split(".");
                        const finalValue =
                          parts.length > 2
                            ? parts[0] + "." + parts.slice(1).join("")
                            : filteredValue;

                        // 입력 필드의 값을 직접 업데이트 (포커스 유지)
                        if (e.target.value !== finalValue) {
                          e.target.value = finalValue;
                        }
                      }}
                      onKeyDown={(e) => {
                        // Enter 키로 포커스가 나가지 않도록
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-2 py-1 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="-"
                      autoComplete="off"
                    />
                  </div>
                );
              }

              const levelValue =
                level && typeof level === "object" && "level" in level
                  ? level.level
                  : null;
              const hasLevel = levelValue && levelValue > 0;

              return (
                <div
                  className={`px-2 py-2 text-center ${
                    hasLevel
                      ? difficultyColors[difficulty] || ""
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {hasLevel ? levelValue?.toFixed(2) : "-"}
                </div>
              );
            },
            enableSorting: false,
            size: 60,
          })
        );
      });
    });

    // 작업 컬럼 (관리자만)
    if (isAdmin) {
      cols.push(
        classicColumnHelper.display({
          id: "actions",
          header: "작업",
          cell: (info) => {
            const versionId = info.row.original.versionId;
            const isEditing = editingVersionId === versionId;

            if (isEditing) {
              return (
                <div className="px-2">
                  <button
                    onClick={handleSaveVersionLevels}
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full transition-colors"
                    title="저장"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              );
            }

            return (
              <button
                onClick={() => handleEditVersionLevels(versionId)}
                className="px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-sm rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                수정
              </button>
            );
          },
          enableSorting: false,
          size: 100,
        })
      );
    }

    return cols;
  }, [
    isAdmin,
    songLevels,
    classicColumnHelper,
    editingVersionId,
    handleEditVersionLevels,
    handleSaveVersionLevels,
    handleCancelVersionEdit,
    versions,
    getVersionType,
  ]);

  // gitadora 컬럼 정의
  const gitadoraColumns = useMemo(() => {
    const cols: any[] = [
      gitadoraColumnHelper.accessor("version", {
        header: "버전",
        cell: (info) => (
          <div className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">
            {info.getValue().name}
          </div>
        ),
        enableSorting: false,
        size: 200,
      }),
    ];

    // gitadora는 DRUM, GUITAR, BASS
    ["DRUM", "GUITAR", "BASS"].forEach((instrument) => {
      ["BASIC", "ADVANCED", "EXTREME", "MASTER"].forEach((difficulty) => {
        const difficultyColors: Record<string, string> = {
          BASIC:
            "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
          ADVANCED:
            "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
          EXTREME:
            "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
          MASTER:
            "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
        };

        cols.push(
          gitadoraColumnHelper.accessor(`${instrument}_${difficulty}`, {
            header: difficulty,
            cell: (info) => {
              const level = info.getValue();
              const versionId = info.row.original.versionId;
              const isEditing = isAdmin && editingVersionId === versionId;
              const key = `${instrument}_${difficulty}`;

              if (isEditing) {
                // 기존 레벨 값 가져오기
                const existingLevel = songLevels.find(
                  (l) =>
                    l.versionId === versionId &&
                    l.instrumentType === instrument &&
                    l.difficulty === difficulty
                );

                // 현재 버전보다 이전 버전의 레벨 정보 찾기
                let previousLevelValue = "";
                if (!existingLevel || existingLevel.level === 0) {
                  // 현재 버전의 startedAt 찾기
                  const currentVersion = versions.find(
                    (v: any) => v.id === versionId
                  );
                  if (currentVersion) {
                    const currentStartedAt = new Date(
                      currentVersion.startedAt
                    ).getTime();
                    // 이전 버전들 중 가장 최근 버전의 레벨 찾기
                    const previousVersions = versions
                      .filter((v: any) => {
                        const vStartedAt = new Date(v.startedAt).getTime();
                        return vStartedAt < currentStartedAt;
                      })
                      .sort((a: any, b: any) => {
                        return (
                          new Date(b.startedAt).getTime() -
                          new Date(a.startedAt).getTime()
                        );
                      });

                    // 이전 버전들 중에서 레벨이 있는 버전 찾기
                    for (const prevVersion of previousVersions) {
                      const prevLevel = songLevels.find(
                        (l) =>
                          l.versionId === prevVersion.id &&
                          l.instrumentType === instrument &&
                          l.difficulty === difficulty &&
                          l.level > 0
                      );
                      if (prevLevel) {
                        previousLevelValue = prevLevel.level.toString();
                        break;
                      }
                    }
                  }
                }

                const initialValue =
                  existingLevel && existingLevel.level > 0
                    ? existingLevel.level.toString()
                    : previousLevelValue;

                return (
                  <div className="px-1 py-1">
                    <input
                      ref={(el) => {
                        inputRefs.current[key] = el;
                        // ref가 설정될 때 초기값 설정
                        if (el && !el.value && initialValue) {
                          el.value = initialValue;
                        }
                      }}
                      type="text"
                      inputMode="decimal"
                      defaultValue={initialValue}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        // 숫자와 .만 허용
                        const filteredValue = newValue.replace(/[^0-9.]/g, "");
                        // .이 여러 개인 경우 첫 번째만 허용
                        const parts = filteredValue.split(".");
                        const finalValue =
                          parts.length > 2
                            ? parts[0] + "." + parts.slice(1).join("")
                            : filteredValue;

                        // 입력 필드의 값을 직접 업데이트 (포커스 유지)
                        if (e.target.value !== finalValue) {
                          e.target.value = finalValue;
                        }
                      }}
                      onKeyDown={(e) => {
                        // Enter 키로 포커스가 나가지 않도록
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-2 py-1 text-center text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="-"
                      autoComplete="off"
                    />
                  </div>
                );
              }

              const levelValue =
                level && typeof level === "object" && "level" in level
                  ? level.level
                  : null;
              const hasLevel = levelValue && levelValue > 0;

              return (
                <div
                  className={`px-2 py-2 text-center ${
                    hasLevel
                      ? difficultyColors[difficulty] || ""
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {hasLevel ? levelValue?.toFixed(2) : "-"}
                </div>
              );
            },
            enableSorting: false,
            size: 60,
          })
        );
      });
    });

    // 작업 컬럼 (관리자만)
    if (isAdmin) {
      cols.push(
        gitadoraColumnHelper.display({
          id: "actions",
          header: "작업",
          cell: (info) => {
            const versionId = info.row.original.versionId;
            const isEditing = editingVersionId === versionId;

            if (isEditing) {
              return (
                <div className="px-2">
                  <button
                    onClick={handleSaveVersionLevels}
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full transition-colors"
                    title="저장"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              );
            }

            return (
              <div className="px-2">
                <button
                  onClick={() => handleEditVersionLevels(versionId)}
                  className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full transition-colors"
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
              </div>
            );
          },
          enableSorting: false,
          size: 100,
        })
      );
    }

    return cols;
  }, [
    isAdmin,
    songLevels,
    gitadoraColumnHelper,
    editingVersionId,
    handleEditVersionLevels,
    handleSaveVersionLevels,
    handleCancelVersionEdit,
    versions,
    getVersionType,
  ]);

  // react-table 인스턴스
  const classicTable = useReactTable({
    data: classicTableData,
    columns: classicColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const gitadoraTable = useReactTable({
    data: gitadoraTableData,
    columns: gitadoraColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <main className="p-8 max-w-6xl mx-auto">
        <div className="text-center text-gray-900 dark:text-gray-100">
          로딩 중...
        </div>
      </main>
    );
  }

  if (!song) {
    return (
      <main className="p-8 max-w-6xl mx-auto">
        <div className="text-center text-red-600 dark:text-red-400">
          곡 정보를 찾을 수 없습니다.
        </div>
      </main>
    );
  }

  const instrumentTypeLabels: Record<string, string> = {
    GUITAR: "GUITAR",
    BASS: "BASS",
    DRUM: "DRUM",
    OPEN: "OPEN",
  };

  const difficultyLabels: Record<string, string> = {
    BASIC: "BSC",
    ADVANCED: "ADV",
    EXTREME: "EXT",
    MASTER: "MAS",
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-gray-100">
            {isAdmin ? "곡 정보 수정" : "곡 정보"}
          </h1>
          {backPath && (
            <button
              onClick={() => router.push(backPath)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
            >
              ← 목록으로 돌아가기
            </button>
          )}
        </div>
      </div>

      {/* Song Info Card */}
      <div className="shadow-xl rounded-xl p-8 mb-10 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-orange-500"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              곡 정보 수정
            </h2>
          </div>
        </div>

        {isAdmin ? (
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
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  placeholder="제목"
                  value={formValues.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                {duplicateWarning && (
                  <p className="absolute left-0 -bottom-5 text-red-500 text-xs ml-1">
                    {duplicateWarning}
                  </p>
                )}
              </div>

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
                  onFocus={() => setShowArtistDropdown(true)}
                  onBlur={() => {
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
                      filteredArtists.map((artist: any) => (
                        <div
                          key={artist.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleArtistSelect(artist);
                          }}
                          className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors"
                        >
                          <div className="font-semibold text-gray-900 dark:text-gray-100">
                            {artist.name}
                          </div>
                          {artist.aliases && artist.aliases.length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                              다른 명의:{" "}
                              {artist.aliases
                                .map((a: any) => a.alias)
                                .join(", ")}
                            </div>
                          )}
                        </div>
                      ))}
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      min="0"
                    />
                    <input
                      type="number"
                      name="maxBpm"
                      placeholder="최대 BPM (선택)"
                      value={formValues.maxBpm || ""}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    min="0"
                  />
                )}
              </div>

              <select
                name="version"
                value={formValues.version}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">버전 선택</option>
                {versions.map((version: any) => (
                  <option key={version.id} value={version.name}>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
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
                  onBlur={() => {
                    setTimeout(() => setShowTagDropdown(false), 200);
                  }}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full"
                />
                {showTagDropdown && tagSearchQuery.trim() && (
                  <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl shadow-2xl max-h-60 overflow-auto backdrop-blur-sm">
                    {tags
                      .filter((tag) => !selectedTagIds.includes(tag.id))
                      .map((tag) => (
                        <div
                          key={tag.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            if (!selectedTagIds.includes(tag.id)) {
                              setSelectedTagIds([...selectedTagIds, tag.id]);
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
                  </div>
                )}
              </div>
            </div>

            {/* 선택된 태그 표시 */}
            {selectedTagIds.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTagIds.map((tagId) => {
                  const tag = allTags.find((t) => t.id === tagId);
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
                  name="isCover"
                  checked={formValues.isCover}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-2 transition-all cursor-pointer"
                />
                <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  커버
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
                수정하기
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  제목
                </label>
                <div className="text-gray-900 dark:text-gray-100">
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
            <div className="flex gap-4 pt-2">
              <span
                className={`px-3 py-1 rounded text-sm ${
                  song.isExist
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                }`}
              >
                {song.isExist ? "활성화" : "비활성화"}
              </span>
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
            {/* 태그 표시 */}
            {song.tags && song.tags.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  태그
                </label>
                <div className="flex flex-wrap gap-2">
                  {song.tags.map((songTag: any) => {
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
        )}
      </div>

      {/* Level Info Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          레벨 정보 등록
        </h2>

        {songLevels.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            등록된 레벨 정보가 없습니다.
          </div>
        ) : (
          <div className="space-y-8">
            {/* Classic 섹션 */}
            {groupedVersions.classic.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Classic (v1 ~ v6)
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      {/* 첫 번째 헤더 행: 악기 그룹 */}
                      <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <th
                          rowSpan={2}
                          className="px-4 py-3 text-left font-medium border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                        >
                          버전
                        </th>
                        {["DRUM", "GUITAR", "BASS", "OPEN"].map(
                          (instrument) => (
                            <th
                              key={instrument}
                              colSpan={4}
                              className="px-2 py-2 text-center font-medium border-r border-gray-300 dark:border-gray-600"
                            >
                              {instrumentTypeLabels[instrument] || instrument}
                            </th>
                          )
                        )}
                        {isAdmin && (
                          <th
                            rowSpan={2}
                            className="px-4 py-3 text-left font-medium border-l border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                          >
                            작업
                          </th>
                        )}
                      </tr>
                      {/* 두 번째 헤더 행: 난이도 */}
                      <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {["DRUM", "GUITAR", "BASS", "OPEN"].map((instrument) =>
                          ["BASIC", "ADVANCED", "EXTREME", "MASTER"].map(
                            (difficulty) => (
                              <th
                                key={`${instrument}-${difficulty}`}
                                className="px-2 py-2 text-center font-medium text-xs border-r border-gray-300 dark:border-gray-600 last:border-r-0"
                              >
                                {difficultyLabels[difficulty] || difficulty}
                              </th>
                            )
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {classicTable.getRowModel().rows.map((row, rowIdx) => {
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
                              const isLastCell =
                                cellIdx === row.getVisibleCells().length - 1;
                              return (
                                <td
                                  key={cell.id}
                                  className={`border-r border-gray-300 dark:border-gray-700 ${
                                    isFirstCell ? "border-l" : ""
                                  } ${isLastCell ? "" : ""}`}
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
              </div>
            )}

            {/* Gitadora 섹션 */}
            {groupedVersions.gitadora.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Gitadora (XG 이후)
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      {/* 첫 번째 헤더 행: 악기 그룹 */}
                      <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <th
                          rowSpan={2}
                          className="px-4 py-3 text-left font-medium border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                        >
                          버전
                        </th>
                        {["DRUM", "GUITAR", "BASS"].map((instrument) => (
                          <th
                            key={instrument}
                            colSpan={4}
                            className="px-2 py-2 text-center font-medium border-r border-gray-300 dark:border-gray-600"
                          >
                            {instrumentTypeLabels[instrument] || instrument}
                          </th>
                        ))}
                        {isAdmin && (
                          <th
                            rowSpan={2}
                            className="px-4 py-3 text-left font-medium border-l border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                          >
                            작업
                          </th>
                        )}
                      </tr>
                      {/* 두 번째 헤더 행: 난이도 */}
                      <tr className="border-b bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {["DRUM", "GUITAR", "BASS"].map((instrument) =>
                          ["BASIC", "ADVANCED", "EXTREME", "MASTER"].map(
                            (difficulty) => (
                              <th
                                key={`${instrument}-${difficulty}`}
                                className="px-2 py-2 text-center font-medium text-xs border-r border-gray-300 dark:border-gray-600 last:border-r-0"
                              >
                                {difficultyLabels[difficulty] || difficulty}
                              </th>
                            )
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {gitadoraTable.getRowModel().rows.map((row, rowIdx) => {
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
                              const isLastCell =
                                cellIdx === row.getVisibleCells().length - 1;
                              return (
                                <td
                                  key={cell.id}
                                  className={`border-r border-gray-300 dark:border-gray-700 ${
                                    isFirstCell ? "border-l" : ""
                                  } ${isLastCell ? "" : ""}`}
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
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
