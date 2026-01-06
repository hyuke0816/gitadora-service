import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// CORS 헤더 설정
function setCorsHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get("origin");

  // credentials를 사용할 때는 origin을 정확히 지정해야 함 (* 사용 불가)
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else if (process.env.NODE_ENV === "development") {
    // 개발 환경에서 origin이 없을 때만 * 사용 (credentials 없이)
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  return response;
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, request);
}

interface SkillRecordInput {
  songTitle: string; // 곡명
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN"; // 악기 타입
  difficulty: "BASIC" | "ADVANCED" | "EXTREME" | "MASTER"; // 난이도
  achievement: number; // 달성률
  skillScore: number; // 스킬점수
  isHot: boolean; // HOT 곡 여부
  playedAt?: string; // ISO date string
}

interface ProfileInfo {
  title?: string | null; // 칭호
  name?: string | null; // 이름
  gitadoraId?: string | null; // Gitadora ID
}

interface BulkSkillRecordInput {
  records: SkillRecordInput[];
  profileInfo?: ProfileInfo | null; // 프로필 정보 (칭호, 이름)
}

// POST /api/users/[id]/skill-records -> 스킬 기록 일괄 업로드
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    const body: BulkSkillRecordInput = await request.json();

    if (isNaN(userId)) {
      const response = NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
      return setCorsHeaders(response, request);
    }

    if (
      !body.records ||
      !Array.isArray(body.records) ||
      body.records.length === 0
    ) {
      console.error("Invalid request body:", { body, userId });
      const response = NextResponse.json(
        { message: "records array is required" },
        { status: 400 }
      );
      return setCorsHeaders(response, request);
    }

    // 모든 곡 제목 수집 (곡 정보 존재 여부 확인용)
    const songTitles = [...new Set(body.records.map((r) => r.songTitle))];

    // 곡 정보를 일괄 조회 (존재 여부 확인용, 저장은 곡명으로만)
    const songs = await prisma.tb_song_informations.findMany({
      where: {
        title: { in: songTitles },
      },
      select: {
        id: true,
        title: true,
      },
    });

    const songMap = new Map(songs.map((s) => [s.title, s.id]));

    // 누락된 곡 확인 (경고용, 저장은 계속 진행)
    const missingSongs = songTitles.filter((title) => !songMap.has(title));

    if (missingSongs.length > 0) {
      console.warn(
        "Some songs are not found in database (will be stored anyway):",
        {
          userId,
          missingSongs,
          totalRecords: body.records.length,
        }
      );
    }

    // 업로드 시간을 기록 (같은 배치의 기록들은 같은 시간 사용)
    const uploadTime = new Date();
    uploadTime.setSeconds(0, 0); // 초 단위 제거하여 같은 분 단위로 그룹화

    // 프로필 정보 업데이트 (칭호와 게임 내 이름)
    if (body.profileInfo) {
      try {
        const updateData: {
          ingamename?: string | null;
          title?: string | null;
          gitadoraId?: string | null;
        } = {};

        // 게임 내 이름이 있으면 업데이트 (null도 허용)
        if (body.profileInfo.name !== undefined) {
          updateData.ingamename = body.profileInfo.name || null;
        }

        // 칭호가 있으면 업데이트 (null도 허용)
        if (body.profileInfo.title !== undefined) {
          updateData.title = body.profileInfo.title || null;
        }

        // gitadoraId가 있으면 업데이트 (null도 허용)
        if (body.profileInfo.gitadoraId !== undefined) {
          updateData.gitadoraId = body.profileInfo.gitadoraId || null;
        }

        // 업데이트할 데이터가 있으면 실행
        if (Object.keys(updateData).length > 0) {
          await prisma.tb_users.update({
            where: { id: userId },
            data: updateData,
          });
          console.log("사용자 프로필 정보 업데이트 완료:", {
            userId,
            updateData,
          });
        }
      } catch (error: any) {
        console.error("프로필 정보 업데이트 실패:", error, {
          userId,
          profileInfo: body.profileInfo,
        });
        // 프로필 업데이트 실패해도 스킬 기록 업로드는 계속 진행
      }
    }

    // 스킬 기록 생성
    const createdRecords = [];
    const errors = [];
    const recordsByInstrumentType = new Map<
      string,
      Array<{
        songTitle: string;
        instrumentType: string;
        difficulty: string;
        achievement: number;
        skillScore: number;
        isHot: boolean;
        playedAt: Date;
      }>
    >();

    for (const record of body.records) {
      try {
        // 데이터 검증
        if (!record.songTitle || typeof record.songTitle !== "string") {
          errors.push({
            record,
            error: "songTitle is required and must be a string",
          });
          continue;
        }

        if (
          !record.instrumentType ||
          !["GUITAR", "BASS", "DRUM", "OPEN"].includes(record.instrumentType)
        ) {
          errors.push({
            record,
            error: `instrumentType is required and must be one of: GUITAR, BASS, DRUM, OPEN. Got: ${record.instrumentType}`,
          });
          continue;
        }

        if (
          !record.difficulty ||
          !["BASIC", "ADVANCED", "EXTREME", "MASTER"].includes(
            record.difficulty
          )
        ) {
          errors.push({
            record,
            error: `difficulty is required and must be one of: BASIC, ADVANCED, EXTREME, MASTER. Got: ${record.difficulty}`,
          });
          continue;
        }

        if (
          typeof record.achievement !== "number" ||
          isNaN(record.achievement)
        ) {
          errors.push({
            record,
            error: `achievement must be a number. Got: ${typeof record.achievement}`,
          });
          continue;
        }

        if (typeof record.skillScore !== "number" || isNaN(record.skillScore)) {
          errors.push({
            record,
            error: `skillScore must be a number. Got: ${typeof record.skillScore}`,
          });
          continue;
        }

        if (typeof record.isHot !== "boolean") {
          errors.push({
            record,
            error: `isHot must be a boolean. Got: ${typeof record.isHot}`,
          });
          continue;
        }

        const playedAt = record.playedAt
          ? new Date(record.playedAt)
          : uploadTime;

        // 항상 새로운 레코드로 생성 (기존 데이터 교체 없이 히스토리 추적)
        const skillRecord = await prisma.tb_user_skill_records.create({
          data: {
            userId,
            songTitle: record.songTitle.trim(),
            instrumentType: record.instrumentType,
            difficulty: record.difficulty,
            achievement: record.achievement,
            skillScore: record.skillScore,
            isHot: record.isHot,
            version: "GITADORA GALAXY WAVE DELTA", // 버전 정보 저장
            playedAt,
          },
        });

        createdRecords.push(skillRecord);

        // 악기 타입별로 기록 수집 (히스토리 생성용)
        const instrumentType = record.instrumentType;
        if (!recordsByInstrumentType.has(instrumentType)) {
          recordsByInstrumentType.set(instrumentType, []);
        }
        recordsByInstrumentType.get(instrumentType)!.push({
          songTitle: record.songTitle.trim(),
          instrumentType: record.instrumentType,
          difficulty: record.difficulty,
          achievement: record.achievement,
          skillScore: record.skillScore,
          isHot: record.isHot,
          playedAt,
        });
      } catch (error: any) {
        console.error("Error creating skill record:", error, {
          record,
          userId,
        });
        errors.push({
          record,
          error: error.message || "Failed to create record",
          prismaError: error.code || error.meta || undefined,
        });
      }
    }

    // 각 악기 타입별로 스킬 이력 생성
    for (const [instrumentType, records] of recordsByInstrumentType.entries()) {
      try {
        // 해당 날짜 이전의 모든 기록 조회하여 스킬 합계 계산
        const allRecords = await prisma.tb_user_skill_records.findMany({
          where: {
            userId,
            instrumentType: instrumentType as any,
            playedAt: {
              lte: uploadTime,
            },
          },
        });

        // 같은 곡/악기타입/난이도/HOT여부의 최신 기록만 필터링
        const latestRecordsMap = new Map<string, (typeof allRecords)[0]>();
        for (const record of allRecords) {
          const key = `${record.songTitle}_${record.instrumentType}_${record.difficulty}_${record.isHot}`;
          const existing = latestRecordsMap.get(key);
          if (!existing || record.playedAt > existing.playedAt) {
            latestRecordsMap.set(key, record);
          }
        }

        const latestRecords = Array.from(latestRecordsMap.values());

        // HOT/OTHER 구분하여 스킬 합계 계산
        const hotRecords = latestRecords
          .filter((r) => r.isHot)
          .sort((a, b) => b.skillScore - a.skillScore)
          .slice(0, 25);
        const otherRecords = latestRecords
          .filter((r) => !r.isHot)
          .sort((a, b) => b.skillScore - a.skillScore)
          .slice(0, 25);

        const totalHotSkill = hotRecords.reduce(
          (sum, record) => sum + record.skillScore,
          0
        );
        const totalOtherSkill = otherRecords.reduce(
          (sum, record) => sum + record.skillScore,
          0
        );
        const totalSkill = totalHotSkill + totalOtherSkill;

        // 스킬 이력 생성 (항상 새로운 레코드로 insert)
        await prisma.tb_user_skill_history.create({
          data: {
            userId,
            totalSkill,
            hotSkill: totalHotSkill,
            otherSkill: totalOtherSkill,
            instrumentType: instrumentType as any,
            recordedAt: uploadTime,
          },
        });
      } catch (error: any) {
        console.error("Error creating skill history:", error, {
          userId,
          instrumentType,
        });
        // 히스토리 생성 실패해도 기록 생성은 성공했으므로 계속 진행
      }
    }

    const response = NextResponse.json({
      success: true,
      created: createdRecords.length,
      errorCount: errors.length,
      createdRecords,
      errors: errors.length > 0 ? errors : undefined,
    });
    return setCorsHeaders(response, request);
  } catch (error: any) {
    console.error("Error uploading skill records:", error);
    const response = NextResponse.json(
      { message: error.message || "Failed to upload skill records" },
      { status: 500 }
    );
    return setCorsHeaders(response, request);
  }
}
