import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, LoginRequest, LoginResponse } from "./auth.service";
import { authKeys } from "./auth.queries";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: () => {
      // 로그인 성공 시 인증 정보 쿼리 무효화하여 재조회
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
