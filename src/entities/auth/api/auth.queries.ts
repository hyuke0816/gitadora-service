import { useQuery } from "@tanstack/react-query";
import { getAuthMe, AuthMeResponse } from "./auth.service";

export const authKeys = {
  all: ["auth"] as const,
  me: () => ["auth", "me"] as const,
};

export const useAuthMe = () => {
  return useQuery<AuthMeResponse>({
    queryKey: authKeys.me(),
    queryFn: getAuthMe,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false, // 401 등 인증 에러는 재시도하지 않음
    staleTime: Infinity,
  });
};
