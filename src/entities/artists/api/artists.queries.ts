import { useQuery } from "@tanstack/react-query";
import { getAllArtists, getArtistById } from "./artists.service";

export const artistsKeys = {
  all: ["artists"] as const,
  detail: (id: number) => ["artists", id] as const,
};

export const useArtists = () =>
  useQuery({
    queryKey: artistsKeys.all,
    queryFn: getAllArtists,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

export const useArtist = (id: number) =>
  useQuery({
    queryKey: artistsKeys.detail(id),
    queryFn: () => getArtistById(id),
    enabled: !!id && !isNaN(id),
  });
