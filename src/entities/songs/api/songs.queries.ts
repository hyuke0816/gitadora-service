import { useQuery } from "@tanstack/react-query";
import { getAllSongs, getSongInfoById, getSongLevels } from "./songs.service";

export const songKeys = {
  all: ["songs"] as const,
  detail: (id: number) => ["songs", id] as const,
  levels: (songId: number) => ["songs", songId, "levels"] as const,
};

export const useSongs = () =>
  useQuery({
    queryKey: songKeys.all,
    queryFn: getAllSongs,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

export const useSong = (id: number) =>
  useQuery({
    queryKey: songKeys.detail(id),
    queryFn: () => getSongInfoById(id),
    enabled: !!id, // id 없으면 쿼리 비활성화
  });

export const useSongLevels = (songId: number) =>
  useQuery({
    queryKey: songKeys.levels(songId),
    queryFn: () => getSongLevels(songId),
    enabled: !!songId,
  });
