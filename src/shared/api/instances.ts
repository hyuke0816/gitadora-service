import ky from "ky";
import { API_BASE_URL, IS_PROD } from "../config/index";

const DEFAULT_API_TIMEOUT = 15 * 1000;

export const createApiClient = (hooks: {
  beforeRequest?: any[];
  afterResponse?: any[];
}) => {
  const instance = ky.create({
    prefixUrl: IS_PROD ? API_BASE_URL + "/api/v1" : "/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    timeout: DEFAULT_API_TIMEOUT,
  });

  return instance.extend({ hooks });
};

// 기본 인스턴스 (인증 없음)
export const apiClient = createApiClient({});
