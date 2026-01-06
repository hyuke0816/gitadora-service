import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArtists,
  updateArtists,
  deleteArtists,
  createArtistAlias,
  deleteArtistAlias,
} from "./artists.service";
import { artistsKeys } from "./artists.queries";

export const useCreateArtists = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createArtists,
    onSuccess: async () => {
      // 작곡가 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // staleTime: Infinity 설정 때문에 명시적으로 refetchType 지정
      await qc.invalidateQueries({
        queryKey: artistsKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useUpdateArtists = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateArtists,
    onSuccess: async () => {
      // 작곡가 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // staleTime: Infinity 설정 때문에 명시적으로 refetchType 지정
      await qc.invalidateQueries({
        queryKey: artistsKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useDeleteArtists = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteArtists,
    onSuccess: async () => {
      // 작곡가 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // staleTime: Infinity 설정 때문에 명시적으로 refetchType 지정
      await qc.invalidateQueries({
        queryKey: artistsKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useCreateArtistAlias = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createArtistAlias,
    onSuccess: async () => {
      // 작곡가 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // 별명 추가 시 목록에 반영되어야 함
      await qc.invalidateQueries({
        queryKey: artistsKeys.all,
        refetchType: "active",
      });
    },
  });
};

export const useDeleteArtistAlias = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteArtistAlias,
    onSuccess: async () => {
      // 작곡가 목록 쿼리를 무효화하고 활성 쿼리들을 다시 조회
      // 별명 삭제 시 목록에 반영되어야 함
      await qc.invalidateQueries({
        queryKey: artistsKeys.all,
        refetchType: "active",
      });
    },
  });
};
