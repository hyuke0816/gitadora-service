import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/users/[id]/skill?instrumentType=DRUM
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    const { searchParams } = new URL(request.url);
    const instrumentType = searchParams.get("instrumentType") || "DRUM";
    const historyId = searchParams.get("historyId"); // 히스토리 ID
    const version = searchParams.get("version"); // 버전 필터

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // 히스토리 ID가 있으면 해당 히스토리의 날짜를 가져옴
    let targetDate: Date | null = null;
    if (historyId) {
      const historyIdNum = parseInt(historyId);
      if (!isNaN(historyIdNum)) {
        const history = await prisma.tb_user_skill_history.findUnique({
          where: {
            id: historyIdNum,
          },
        });
        if (history && history.userId === userId) {
          targetDate = history.recordedAt;
        }
      }
    }

    // 날짜 필터 조건 구성
    const whereClause: any = {
      userId,
      instrumentType: instrumentType as any,
    };

    // 버전 필터 추가
    if (version) {
      whereClause.version = version;
    }

    // 특정 날짜 이전의 기록만 조회
    if (targetDate) {
      whereClause.playedAt = {
        lte: targetDate, // 해당 날짜 이전 또는 같은 날짜
      };
    }

    // 스킬 기록 조회 (악기 타입 필터링) - 저장된 데이터만 그대로 반환
    const allRecords = await prisma.tb_user_skill_records.findMany({
      where: whereClause,
      orderBy: {
        playedAt: "desc", // 최신 기록 먼저
      },
    });

    // 같은 곡/악기타입/난이도/HOT여부의 최신 기록만 필터링 (중복 제거)
    const latestRecordsMap = new Map<string, (typeof allRecords)[0]>();
    for (const record of allRecords) {
      const key = `${record.songTitle}_${record.instrumentType}_${record.difficulty}_${record.isHot}`;
      if (!latestRecordsMap.has(key)) {
        latestRecordsMap.set(key, record);
      }
    }

    // 최신 기록만 추출
    const latestRecords = Array.from(latestRecordsMap.values());

    // 저장된 데이터 그대로 반환 (곡 정보 조인 없이)
    const records = latestRecords.map((record) => ({
      id: record.id,
      songTitle: record.songTitle,
      instrumentType: record.instrumentType,
      difficulty: record.difficulty,
      achievement: record.achievement,
      skillScore: record.skillScore,
      isHot: record.isHot,
      playedAt: record.playedAt.toISOString(),
    }));

    // HOT/OTHER 구분하여 정렬
    const hotRecords = records
      .filter((r) => r.isHot)
      .sort((a, b) => b.skillScore - a.skillScore)
      .slice(0, 25);
    const otherRecords = records
      .filter((r) => !r.isHot)
      .sort((a, b) => b.skillScore - a.skillScore)
      .slice(0, 25);

    // 스킬 합계 계산
    const totalHotSkill = hotRecords.reduce(
      (sum, record) => sum + record.skillScore,
      0
    );
    const totalOtherSkill = otherRecords.reduce(
      (sum, record) => sum + record.skillScore,
      0
    );
    const totalSkill = totalHotSkill + totalOtherSkill;

    // 스킬 이력 조회 (히스토리 테이블에서 직접 가져오기)
    const historyRecords = await prisma.tb_user_skill_history.findMany({
      where: {
        userId,
        instrumentType: instrumentType as any,
      },
      orderBy: {
        recordedAt: "desc",
      },
      take: 100,
    });

    const history = historyRecords.map((h) => ({
      id: h.id,
      totalSkill: h.totalSkill,
      hotSkill: h.hotSkill,
      otherSkill: h.otherSkill,
      instrumentType: h.instrumentType,
      recordedAt: h.recordedAt.toISOString(),
    }));

    return NextResponse.json({
      totalSkill,
      hotSkill: totalHotSkill,
      otherSkill: totalOtherSkill,
      instrumentType,
      hotRecords,
      otherRecords,
      history,
    });
  } catch (error: any) {
    console.error("Error fetching skill data:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch skill data" },
      { status: 500 }
    );
  }
}
