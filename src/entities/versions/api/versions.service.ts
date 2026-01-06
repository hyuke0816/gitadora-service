import { apiClient } from "@shared/api/instances";

/**
 * 모든 버전명 조회
 * @method GET
 * @returns
 */
export const getAllVersions = async (): Promise<any> => {
  const data: any = await apiClient.get(`versions`).json();
  return data;
};

/**
 * ID로 버전 정보 조회
 * @method GET
 * @param id 버전 ID
 * @returns
 */
export const getVersionById = async (id: number): Promise<any> => {
  const data: any = await apiClient.get(`versions/${id}`).json();
  return data;
};

/**
 * 버전 정보 등록
 * @method POST
 * @returns
 */
export const createVersions = async (param: any): Promise<any> => {
  const data: any = await apiClient.post(`versions`, { json: param }).json();
  return data;
};

/**
 * 버전 정보 수정
 * @method PUT
 * @returns
 */
export const updateVersions = async (param: any): Promise<any> => {
  const data: any = await apiClient.put(`versions`, { json: param }).json();
  return data;
};

/**
 * 버전 정보 삭제
 * @method DELETE
 * @returns
 */
export const deleteVersions = async (param: { id: number }): Promise<any> => {
  const data: any = await apiClient.delete(`versions/${param.id}`).json();
  return data;
};
