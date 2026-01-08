import { httpGet } from "@shared/lib/http";

export interface UserList {
  rank: number;
  userId: number;
  ingamename: string | null;
  title: string | null;
  totalSkill: number;
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN";
}

export interface SkillRecord {
  id: number;
  songTitle: string;
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN";
  difficulty: "BASIC" | "ADVANCED" | "EXTREME" | "MASTER";
  achievement: number;
  skillScore: number;
  level: number; // 레벨 추가
  isHot: boolean;
  playedAt: string;
  songId?: number; // 곡 ID (상세 페이지 이동용)
}

export interface SkillHistory {
  id: number;
  totalSkill: number;
  hotSkill: number;
  otherSkill: number;
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN";
  recordedAt: string;
}

export interface SkillData {
  totalSkill: number;
  hotSkill: number;
  otherSkill: number;
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN";
  hotRecords: SkillRecord[];
  otherRecords: SkillRecord[];
  history: SkillHistory[];
  user?: {
    ingamename: string | null;
    title: string | null;
  };
}

/**
 * 유저 스킬 순위 조회
 * @method GET
 * @param instrumentType 악기 타입
 * @returns
 */
export const getUserList = async (
  instrumentType: "GUITAR" | "DRUM"
): Promise<UserList[]> => {
  return httpGet<UserList[]>(
    `/api/users/list?instrumentType=${instrumentType}`
  );
};

/**
 * 유저 스킬 데이터 조회
 * @method GET
 * @param userId 유저 ID
 * @param instrumentType 악기 타입
 * @param historyId 히스토리 ID (선택)
 * @param versionId 버전 ID (선택)
 * @returns
 */
export const getUserSkill = async (
  userId: number,
  instrumentType: "GUITAR" | "DRUM",
  options?: {
    historyId?: number;
    versionId?: number;
  }
): Promise<SkillData> => {
  const url = new URL(`/api/users/${userId}/skill`, window.location.origin);
  url.searchParams.set("instrumentType", instrumentType);
  if (options?.historyId) {
    url.searchParams.set("historyId", options.historyId.toString());
  }
  if (options?.versionId) {
    url.searchParams.set("versionId", options.versionId.toString());
  }
  return httpGet<SkillData>(url.toString());
};
