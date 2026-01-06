import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/users/list?instrumentType=GUITAR
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const instrumentType = searchParams.get("instrumentType") || "GUITAR";

    // 모든 사용자의 최신 스킬 히스토리 조회
    const allUsers = await prisma.tb_users.findMany({
      select: {
        id: true,
        ingamename: true,
        title: true,
      },
    });

    // 각 사용자의 최신 스킬 히스토리 조회
    const userList = await Promise.all(
      allUsers.map(async (user) => {
        const latestHistory = await prisma.tb_user_skill_history.findFirst({
          where: {
            userId: user.id,
            instrumentType: instrumentType as any,
          },
          orderBy: {
            recordedAt: "desc",
          },
        });

        return {
          userId: user.id,
          ingamename: user.ingamename,
          title: user.title,
          totalSkill: latestHistory?.totalSkill || 0,
          instrumentType: instrumentType as any,
        };
      })
    );

    // 스킬 점수로 정렬 (내림차순)
    const sortedUserList = userList
      .filter((r) => r.totalSkill > 0) // 스킬이 0보다 큰 사용자만
      .sort((a, b) => b.totalSkill - a.totalSkill)
      .map((user, index) => ({
        rank: index + 1,
        ...user,
      }));

    return NextResponse.json(sortedUserList);
  } catch (error: any) {
    console.error("Error fetching user list:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch user list" },
      { status: 500 }
    );
  }
}
