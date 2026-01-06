import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "./tags.service";

export const tagsKeys = {
  all: ["tags"] as const,
  search: (search: string) => ["tags", "search", search] as const,
};

export const useTags = (search?: string) =>
  useQuery({
    queryKey: search ? tagsKeys.search(search) : tagsKeys.all,
    queryFn: () => getAllTags(search),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
