import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/songs/[id]/skill-distribution -> 곡별 난이도별 유저 기록 분포
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  // 곡 정보 조회
  const song = await prisma.tb_song_informations.findUnique({
    where: { id },
    select: { title: true },
  });

  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  // 해당 곡의 모든 유저 기록 조회
  const rawRecords = await prisma.tb_user_skill_records.findMany({
    where: {
      songTitle: song.title,
    },
    select: {
      userId: true,
      instrumentType: true,
      difficulty: true,
      achievement: true,
      skillScore: true,
      user: {
        select: {
          name: true,
          ingamename: true,
        },
      },
    },
  });

  // 유저별 최고 기록만 추출 (userId + instrumentType + difficulty 기준)
  const uniqueRecordsMap = new Map<string, typeof rawRecords[0]>();

  rawRecords.forEach((record) => {
    const key = `${record.userId}-${record.instrumentType}-${record.difficulty}`;
    const existing = uniqueRecordsMap.get(key);

    if (!existing || record.achievement > existing.achievement) {
      uniqueRecordsMap.set(key, record);
    }
  });

  const records = Array.from(uniqueRecordsMap.values());

  // 난이도별, 악기별로 그룹화
  const distribution: Record<
    string,
    Record<
      string,
      {
        count: number;
        avgAchievement: number;
        avgSkillScore: number;
        records: number[];
        skillScores: number[];
        points: { x: number; y: number; username: string }[];
      }
    >
  > = {};

  records.forEach((record) => {
    const instrument = record.instrumentType;
    const difficulty = record.difficulty;

    if (!distribution[instrument]) {
      distribution[instrument] = {};
    }

    if (!distribution[instrument][difficulty]) {
      distribution[instrument][difficulty] = {
        count: 0,
        avgAchievement: 0,
        avgSkillScore: 0,
        records: [],
        skillScores: [],
        points: [],
      };
    }

    distribution[instrument][difficulty].count++;
    distribution[instrument][difficulty].records.push(record.achievement);
    distribution[instrument][difficulty].skillScores.push(record.skillScore);
    distribution[instrument][difficulty].points.push({
      x: record.skillScore,
      y: record.achievement,
      username: record.user.ingamename || record.user.name,
    });
  });

  // 평균 계산
  Object.keys(distribution).forEach((instrument) => {
    Object.keys(distribution[instrument]).forEach((difficulty) => {
      const data = distribution[instrument][difficulty];
      if (data.records.length > 0) {
        data.avgAchievement =
          data.records.reduce((a, b) => a + b, 0) / data.records.length;
        data.avgSkillScore =
          data.skillScores.reduce((a, b) => a + b, 0) / data.skillScores.length;
      }
    });
  });

  // 히스토그램 데이터 생성 (0-100%를 10개 구간으로)
  const histogram: Record<string, Record<string, number[]>> = {};

  Object.keys(distribution).forEach((instrument) => {
    histogram[instrument] = {};
    Object.keys(distribution[instrument]).forEach((difficulty) => {
      const records = distribution[instrument][difficulty].records;
      const bins = Array(10).fill(0); // 0-10, 10-20, ..., 90-100

      records.forEach((achievement) => {
        const binIndex = Math.min(Math.floor(achievement / 10), 9);
        bins[binIndex]++;
      });

      histogram[instrument][difficulty] = bins;
    });
  });

  return NextResponse.json({
    distribution,
    histogram,
    totalRecords: records.length,
  });
}
