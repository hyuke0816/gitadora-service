import { useQuery } from "@tanstack/react-query";
import {
  getUserList,
  getUserSkill,
  UserList,
  SkillData,
  SkillRecord,
  SkillHistory,
} from "./users.service";

// 타입 re-export
export { type SkillRecord, type SkillHistory, type SkillData };

export const userKeys = {
  all: ["users"] as const,
  userList: (instrumentType: "GUITAR" | "DRUM") =>
    ["users", "user-list", instrumentType] as const,
  skill: (
    userId: number,
    instrumentType: "GUITAR" | "DRUM",
    historyId?: number,
    version?: string
  ) => ["users", userId, "skill", instrumentType, historyId, version] as const,
};

export const useUserList = (instrumentType: "GUITAR" | "DRUM") => {
  return useQuery<UserList[]>({
    queryKey: userKeys.userList(instrumentType),
    queryFn: () => getUserList(instrumentType),
  });
};

export const useUserSkill = (
  userId: number,
  instrumentType: "GUITAR" | "DRUM",
  options?: {
    historyId?: number;
    version?: string;
    enabled?: boolean;
  }
) => {
  return useQuery<SkillData>({
    queryKey: userKeys.skill(
      userId,
      instrumentType,
      options?.historyId,
      options?.version
    ),
    queryFn: () =>
      getUserSkill(userId, instrumentType, {
        historyId: options?.historyId,
        version: options?.version,
      }),
    enabled: (options?.enabled ?? true) && !!userId && !isNaN(userId),
  });
};
