export interface AuthUser {
  userId: number;
  gameUserId: number | null;
  username: string;
  role: "ADMIN" | "USER";
  name: string | null;
  ingamename: string | null;
  title: string | null;
}

export interface AuthMeResponse {
  authenticated: boolean;
  user?: AuthUser;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: number;
    gameUserId: number | null;
    username: string;
    role: "ADMIN" | "USER";
    name: string | null;
    ingamename: string | null;
    title: string | null;
  };
  role: "ADMIN" | "USER";
  gameUserId: number | null;
  message?: string;
}

/**
 * 현재 로그인한 사용자 정보 조회
 * @method GET
 * @returns
 */
export const getAuthMe = async (): Promise<AuthMeResponse> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  // 401은 "로그인되지 않음"을 의미하는 정상적인 응답이므로 에러로 처리하지 않음
  if (res.status === 401) {
    return { authenticated: false };
  }

  if (!res.ok) {
    throw new Error("Failed to fetch auth info");
  }

  return res.json();
};

/**
 * 로그인
 * @method POST
 * @param data 로그인 정보
 * @returns
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "로그인에 실패했습니다.");
  }

  return responseData;
};
