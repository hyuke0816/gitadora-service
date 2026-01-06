import { useMutation, useQueryClient } from "@tanstack/react-query";

import { songKeys } from "./songs.queries";
import {
  createSong,
  updateSong,
  updateSongById,
  deleteSong,
  createSongLevel,
  updateSongLevel,
  deleteSongLevel,
} from "./songs.service";

export const useCreateSong = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSong,
    onSuccess: async () => {
      // 곡 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // staleTime: Infinity 설정 때문에 명시적으로 refetchType 지정
      await qc.invalidateQueries({
        queryKey: songKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useUpdateSong = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateSong,
    onSuccess: async () => {
      // 곡 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // staleTime: Infinity 설정 때문에 명시적으로 refetchType 지정
      await qc.invalidateQueries({
        queryKey: songKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useUpdateSongById = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) =>
      updateSongById(id, data),
    onSuccess: async (_, variables) => {
      // 곡 목록과 상세 정보 쿼리를 무효화
      await qc.invalidateQueries({
        queryKey: songKeys.all,
      });
      await qc.invalidateQueries({
        queryKey: songKeys.detail(variables.id),
      });
      // staleTime: Infinity 설정 때문에 명시적으로 refetch 호출
      // 곡 목록 페이지로 돌아갔을 때 수정된 정보가 보이도록
      await qc.refetchQueries({
        queryKey: songKeys.all,
      });
      await qc.refetchQueries({
        queryKey: songKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteSong = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteSong,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: songKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useCreateSongLevel = (songId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createSongLevel(songId, data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: songKeys.levels(songId),
      });
      qc.invalidateQueries({
        queryKey: songKeys.detail(songId),
      });
    },
  });
};

export const useUpdateSongLevel = (songId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateSongLevel(songId, data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: songKeys.levels(songId),
      });
      qc.invalidateQueries({
        queryKey: songKeys.detail(songId),
      });
    },
  });
};

export const useDeleteSongLevel = (songId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (levelId: number) => deleteSongLevel(songId, levelId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: songKeys.levels(songId),
      });
      qc.invalidateQueries({
        queryKey: songKeys.detail(songId),
      });
    },
  });
};
