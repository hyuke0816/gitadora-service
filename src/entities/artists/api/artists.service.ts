import { apiClient } from "@shared/api/instances";

/**
 * 모든 작곡가 조회
 * @method GET
 * @returns
 */
export const getAllArtists = async (): Promise<any> => {
  const data: any = await apiClient.get(`artists`).json();
  return data;
};

/**
 * ID로 작곡가 정보 조회
 * @method GET
 * @param id 작곡가 ID
 * @returns
 */
export const getArtistById = async (id: number): Promise<any> => {
  const data: any = await apiClient.get(`artists/${id}`).json();
  return data;
};

/**
 * 작곡가 정보 등록
 * @method POST
 * @returns
 */
export const createArtists = async (param: any): Promise<any> => {
  try {
    const data: any = await apiClient.post(`artists`, { json: param }).json();
    return data;
  } catch (error: any) {
    // ky HTTPError에서 메시지 추출
    if (error?.response) {
      try {
        // response body를 JSON으로 파싱
        const errorData = await error.response.json();
        // API에서 반환한 message 필드가 있으면 그대로 사용
        if (errorData && typeof errorData === 'object' && 'message' in errorData) {
          throw new Error(String(errorData.message));
        }
      } catch (jsonError: any) {
        // JSON 파싱 실패 시, 이미 Error 객체로 throw된 경우 재throw
        if (jsonError instanceof Error && jsonError.message && jsonError.message !== 'Unexpected end of JSON input') {
          throw jsonError;
        }
      }
      // JSON 파싱 실패 또는 message가 없는 경우 상태 코드 표시
      throw new Error(
        `작곡가 등록에 실패했습니다 (HTTP ${error.response.status})`
      );
    }
    // 네트워크 에러나 기타 에러
    const errorMessage = error?.message || "알 수 없는 오류가 발생했습니다";
    throw new Error(`작곡가 등록에 실패했습니다: ${errorMessage}`);
  }
};

/**
 * 작곡가 정보 수정
 * @method PUT
 * @returns
 */
export const updateArtists = async (param: any): Promise<any> => {
  try {
    const data: any = await apiClient.put(`artists`, { json: param }).json();
    return data;
  } catch (error: any) {
    // ky HTTPError에서 메시지 추출
    if (error?.response) {
      try {
        // response body를 JSON으로 파싱
        const errorData = await error.response.json();
        // API에서 반환한 message 필드가 있으면 그대로 사용
        if (errorData && typeof errorData === 'object' && 'message' in errorData) {
          throw new Error(String(errorData.message));
        }
      } catch (jsonError: any) {
        // JSON 파싱 실패 시, 이미 Error 객체로 throw된 경우 재throw
        if (jsonError instanceof Error && jsonError.message && jsonError.message !== 'Unexpected end of JSON input') {
          throw jsonError;
        }
      }
      // JSON 파싱 실패 또는 message가 없는 경우 상태 코드 표시
      throw new Error(
        `작곡가 수정에 실패했습니다 (HTTP ${error.response.status})`
      );
    }
    // 네트워크 에러나 기타 에러
    const errorMessage = error?.message || "알 수 없는 오류가 발생했습니다";
    throw new Error(`작곡가 수정에 실패했습니다: ${errorMessage}`);
  }
};

/**
 * 작곡가 정보 삭제
 * @method DELETE
 * @returns
 */
export const deleteArtists = async (param: { id: number }): Promise<any> => {
  const data: any = await apiClient.delete(`artists`, { json: param }).json();
  return data;
};

/**
 * 작곡가 다른 명의 추가
 * @method POST
 * @returns
 */
export const createArtistAlias = async (param: {
  artistId: number;
  alias: string;
}): Promise<any> => {
  try {
    const data: any = await apiClient
      .post(`artists/aliases`, { json: param })
      .json();
    return data;
  } catch (error: any) {
    // ky HTTPError에서 메시지 추출
    if (error?.response) {
      try {
        // response body를 JSON으로 파싱
        const errorData = await error.response.json();
        // API에서 반환한 message 필드가 있으면 그대로 사용
        if (errorData && typeof errorData === 'object' && 'message' in errorData) {
          throw new Error(String(errorData.message));
        }
      } catch (jsonError: any) {
        // JSON 파싱 실패 시, 이미 Error 객체로 throw된 경우 재throw
        if (jsonError instanceof Error && jsonError.message && jsonError.message !== 'Unexpected end of JSON input') {
          throw jsonError;
        }
      }
      // JSON 파싱 실패 또는 message가 없는 경우 상태 코드 표시
      throw new Error(
        `다른 명의 추가에 실패했습니다 (HTTP ${error.response.status})`
      );
    }
    // 네트워크 에러나 기타 에러
    const errorMessage = error?.message || "알 수 없는 오류가 발생했습니다";
    throw new Error(`다른 명의 추가에 실패했습니다: ${errorMessage}`);
  }
};

/**
 * 작곡가 다른 명의 삭제
 * @method DELETE
 * @returns
 */
export const deleteArtistAlias = async (param: { id: number }): Promise<any> => {
  try {
    const data: any = await apiClient
      .delete(`artists/aliases`, { json: param })
      .json();
    return data;
  } catch (error: any) {
    // ky HTTPError에서 메시지 추출
    if (error?.response) {
      try {
        // response body를 JSON으로 파싱
        const errorData = await error.response.json();
        // API에서 반환한 message 필드가 있으면 그대로 사용
        if (errorData && typeof errorData === 'object' && 'message' in errorData) {
          throw new Error(String(errorData.message));
        }
      } catch (jsonError: any) {
        // JSON 파싱 실패 시, 이미 Error 객체로 throw된 경우 재throw
        if (jsonError instanceof Error && jsonError.message && jsonError.message !== 'Unexpected end of JSON input') {
          throw jsonError;
        }
      }
      // JSON 파싱 실패 또는 message가 없는 경우 상태 코드 표시
      throw new Error(
        `다른 명의 삭제에 실패했습니다 (HTTP ${error.response.status})`
      );
    }
    // 네트워크 에러나 기타 에러
    const errorMessage = error?.message || "알 수 없는 오류가 발생했습니다";
    throw new Error(`다른 명의 삭제에 실패했습니다: ${errorMessage}`);
  }
};

