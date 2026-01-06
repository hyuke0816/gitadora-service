import { apiClient } from "@shared/api/instances";

export interface Event {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string | null;
  eventType: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 모든 이벤트 조회
 * @method GET
 * @returns
 */
export const getAllEvents = async (): Promise<Event[]> => {
  const data: any = await apiClient.get(`events`).json();
  return data;
};

/**
 * ID로 이벤트 정보 조회
 * @method GET
 * @param id 이벤트 ID
 * @returns
 */
export const getEventById = async (id: number): Promise<Event> => {
  const data: any = await apiClient.get(`events/${id}`).json();
  return data;
};

/**
 * 이벤트 정보 등록
 * @method POST
 * @param param 이벤트 정보
 * @returns
 */
export const createEvent = async (param: {
  name: string;
  startedAt: string;
  endedAt?: string;
  eventType: string;
}): Promise<Event> => {
  const data: any = await apiClient.post(`events`, { json: param }).json();
  return data;
};

/**
 * 이벤트 정보 수정
 * @method PUT
 * @param param 이벤트 정보
 * @returns
 */
export const updateEvent = async (param: {
  id: number;
  name: string;
  startedAt: string;
  endedAt?: string;
  eventType: string;
}): Promise<Event> => {
  const data: any = await apiClient.put(`events`, { json: param }).json();
  return data;
};

/**
 * 이벤트 정보 삭제
 * @method DELETE
 * @param param 이벤트 ID
 * @returns
 */
export const deleteEvent = async (param: { id: number }): Promise<void> => {
  await apiClient.delete(`events`, { json: param }).json();
};
