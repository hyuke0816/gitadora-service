import { apiClient } from "@shared/api/instances";

/**
 * 모든 노래 조회
 * @method GET
 * @param params 검색 파라미터 (title, version 등)
 * @returns
 */
export const getAllSongs = async (params?: {
  title?: string;
  version?: string;
}): Promise<any> => {
  const searchParams = new URLSearchParams();
  if (params?.title) searchParams.append("title", params.title);
  if (params?.version) searchParams.append("version", params.version);

  const queryString = searchParams.toString();
  const url = queryString ? `songs?${queryString}` : `songs`;

  const data: any = await apiClient.get(url).json();
  return data;
};

/**
 * ID로 노래 정보 조회
 * @method GET
 * @param id 노래 ID
 * @returns
 */
export const getSongInfoById = async (id: number): Promise<any> => {
  const data: any = await apiClient.get(`songs/${id}`).json();
  return data;
};

/**
 * 이름으로 노래 정보 조회
 * @method GET
 * @param name 노래 이름
 * @returns
 */
export const getSongInfoByName = async (name: string): Promise<any> => {
  const data: any = await apiClient
    .get(`songs?title=${encodeURIComponent(name)}`)
    .json();
  return data;
};

/**
 * 노래 정보 등록
 * @method POST
 * @param param 노래 정보
 * @returns
 */
export const createSong = async (param: any): Promise<any> => {
  const data: any = await apiClient.post(`songs`, { json: param }).json();
  return data;
};

/**
 * 노래 정보 수정 (ID별)
 * @method PUT
 * @param id 노래 ID
 * @param param 노래 정보
 * @returns
 */
export const updateSongById = async (id: number, param: any): Promise<any> => {
  const data: any = await apiClient.put(`songs/${id}`, { json: param }).json();
  return data;
};

/**
 * 노래 정보 수정
 * @method PUT
 * @param param 노래 정보
 * @returns
 */
export const updateSong = async (param: any): Promise<any> => {
  const data: any = await apiClient.put(`songs`, { json: param }).json();
  return data;
};

/**
 * 노래 삭제
 * @method DELETE
 * @param id 노래 ID
 * @returns
 */
export const deleteSong = async (id: number): Promise<any> => {
  const data: any = await apiClient.delete(`songs/${id}`).json();
  return data;
};

/**
 * 곡의 레벨 정보 조회
 * @method GET
 * @param songId 노래 ID
 * @returns
 */
export const getSongLevels = async (songId: number): Promise<any> => {
  const data: any = await apiClient.get(`songs/${songId}/levels`).json();
  return data;
};

/**
 * 곡의 레벨 정보 생성
 * @method POST
 * @param songId 노래 ID
 * @param param 레벨 정보
 * @returns
 */
export const createSongLevel = async (
  songId: number,
  param: any
): Promise<any> => {
  const data: any = await apiClient
    .post(`songs/${songId}/levels`, { json: param })
    .json();
  return data;
};

/**
 * 곡의 레벨 정보 수정
 * @method PUT
 * @param songId 노래 ID
 * @param param 레벨 정보
 * @returns
 */
export const updateSongLevel = async (
  songId: number,
  param: any
): Promise<any> => {
  const data: any = await apiClient
    .put(`songs/${songId}/levels`, { json: param })
    .json();
  return data;
};

/**
 * 곡의 레벨 정보 삭제
 * @method DELETE
 * @param songId 노래 ID
 * @param levelId 레벨 ID
 * @returns
 */
export const deleteSongLevel = async (
  songId: number,
  levelId: number
): Promise<any> => {
  const data: any = await apiClient
    .delete(`songs/${songId}/levels?levelId=${levelId}`)
    .json();
  return data;
};
