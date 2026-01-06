import { queryOptions } from "@tanstack/react-query";
import { getAllVersions, getVersionById } from "./versions.service";

export const versionsKeys = {
  all: () => ["versions"] as const,
  detail: (id: number) => [...versionsKeys.all(), "detail", id] as const,
};

export const versionsQueries = {
  getAllVersions: () =>
    queryOptions({
      queryKey: versionsKeys.all(),
      queryFn: () => {
        console.log("[useVersions] queryFn 호출됨 - 네트워크 요청 발생");
        return getAllVersions();
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      gcTime: Infinity,
    }),

  getVersionById: (id: number) =>
    queryOptions({
      queryKey: versionsKeys.detail(id),
      queryFn: () => getVersionById(id),
      enabled: !!id && !isNaN(id),
      staleTime: 0,
    }),
};
