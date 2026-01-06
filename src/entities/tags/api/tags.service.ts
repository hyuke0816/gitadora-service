import { apiClient } from "@shared/api/instances";

export interface Tag {
  id: number;
  key: string; // 영어 키 (예: "rock", "pop", "electronic")
  name: string; // 표시 이름 (현재는 한국어, 나중에 다국어 지원)
  color?: string | null; // 태그 색상 (HEX 코드)
  createdAt: string;
  updatedAt: string;
}

/**
 * 모든 태그 조회 (검색 가능)
 * @method GET
 * @param search 검색어 (선택적)
 * @returns
 */
export const getAllTags = async (search?: string): Promise<Tag[]> => {
  const url = search ? `tags?search=${encodeURIComponent(search)}` : `tags`;
  const data: Tag[] = await apiClient.get(url).json();
  return data;
};

/**
 * 새 태그 생성
 * @method POST
 * @param key 태그 키 (영어)
 * @param name 태그 표시 이름
 * @param color 태그 색상 (HEX 코드)
 * @returns
 */
export const createTag = async (key: string, name: string, color?: string): Promise<Tag> => {
  const data: Tag = await apiClient.post("tags", { json: { key, name, color } }).json();
  return data;
};

/**
 * 태그 수정
 * @method PUT
 * @param id 태그 ID
 * @param key 태그 키 (영어)
 * @param name 태그 표시 이름
 * @param color 태그 색상 (HEX 코드)
 * @returns
 */
export const updateTag = async (id: number, key: string, name: string, color?: string): Promise<Tag> => {
  const data: Tag = await apiClient.put("tags", { json: { id, key, name, color } }).json();
  return data;
};

/**
 * 태그 삭제
 * @method DELETE
 * @param id 태그 ID
 * @returns
 */
export const deleteTag = async (id: number): Promise<Tag> => {
  const data: Tag = await apiClient.delete("tags", { json: { id } }).json();
  return data;
};

