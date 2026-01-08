import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";
import { auth } from "@/auth";

// CORS 헤더 설정
function setCorsHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get("origin");

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
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, request);
}

interface SkillRecordInput {
  songTitle: string;
  instrumentType: "GUITAR" | "BASS" | "DRUM" | "OPEN";
  difficulty: "BASIC" | "ADVANCED" | "EXTREME" | "MASTER";
  achievement: number;
  skillScore: number;
  level?: number; // 레벨 추가 (선택적)
  isHot: boolean;
  playedAt?: string;
}

interface ProfileInfo {
  title?: string | null;
  name?: string | null;
  gitadoraId: string; // 필수값으로 변경
}

interface BulkSkillRecordInput {
  records: SkillRecordInput[];
  profileInfo: ProfileInfo; // 필수값으로 변경
  version: string; // 버전명 (예: "GITADORA GALAXY WAVE DELTA")
}

// POST /api/skill-records -> Gitadora ID 기반 스킬 기록 업로드
export async function POST(request: NextRequest) {
  try {
    const body: BulkSkillRecordInput = await request.json();

    // 1. Gitadora ID 검증
    if (!body.profileInfo?.gitadoraId) {
      const response = NextResponse.json(
        { message: "gitadoraId is required in profileInfo" },
        { status: 400 }
      );
      return setCorsHeaders(response, request);
    }

    const { gitadoraId, name, title } = body.profileInfo;
    const versionName = body.version || "GITADORA GALAXY WAVE DELTA"; // 기본값 설정

    // 버전 정보 조회
    const version = await prisma.tb_gitadora_versions.findFirst({
      where: { name: versionName },
    });

    if (!version) {
      const response = NextResponse.json(
        { message: `Version not found: ${versionName}` },
        { status: 404 }
      );
      return setCorsHeaders(response, request);
    }
    const versionId = version.id;

    const session = await auth();

    // 2. 유저 조회 및 매핑 로직
    let user = await prisma.tb_users.findUnique({
      where: { gitadoraId },
    });

    // 로그인 상태일 경우 충돌 체크 및 매핑 처리
    if (session?.user?.id) {
      const currentUserId = session.user.id;

      // 1. 이미 다른 계정에 연동된 데이터인지 확인 (소셜 ID 불일치)
      if (user && user.socialUserId && user.socialUserId !== currentUserId) {
        const response = NextResponse.json(
          { 
            message: "이미 다른 계정에 연동된 데이터입니다. 관리자에게 문의해주세요.",
            code: "DUPLICATE_MAPPING_OTHER_ACCOUNT" 
          },
          { status: 409 }
        );
        return setCorsHeaders(response, request);
      }

      // 2. 현재 로그인한 계정이 이미 다른 데이터와 연동되어 있는지 확인 (Gitadora ID 불일치)
      // 단, 사용자가 "연동 해제"를 요청하거나 "새 데이터로 덮어쓰기"를 원할 수 있으므로,
      // API 응답 코드를 명확히 하여 클라이언트에서 처리 가능하도록 함.
      const myLinkedProfile = await prisma.tb_users.findUnique({
        where: { socialUserId: currentUserId },
      });

      if (myLinkedProfile && myLinkedProfile.gitadoraId !== gitadoraId) {
        const response = NextResponse.json(
          { 
            message: `현재 계정은 이미 다른 Gitadora ID(${myLinkedProfile.gitadoraId})와 연동되어 있습니다. 관리자에게 문의해주세요.`,
            code: "ALREADY_MAPPED_TO_DIFFERENT_DATA"
          },
          { status: 409 }
        );
        return setCorsHeaders(response, request);
      }
    }

    if (!user) {
      console.log(`Creating new user for gitadoraId: ${gitadoraId}`);
      // 신규 생성 시, 로그인 상태라면 바로 매핑
      user = await prisma.tb_users.create({
        data: {
          gitadoraId,
          name: name || `User-${gitadoraId}`,
          ingamename: name || null,
          title: title || null,
          socialUserId: session?.user?.id || null, 
        },
      });
    } else {
      // 기존 유저 정보 업데이트
      const updateData: any = {};
      if (name) updateData.ingamename = name;
      if (title) updateData.title = title;

      // 로그인 상태이고
      if (session?.user?.id) {
        // 3. 아직 연동되지 않은 데이터라면 연동 처리 (매핑)
        if (!user.socialUserId) {
             updateData.socialUserId = session.user.id;
             console.log(`Mapping existing anonymous user ${gitadoraId} to social user ${session.user.id}`);
        } 
        // 4. (추가) 내 계정과 이미 연동된 데이터라면? -> 정상 진행 (이미 내 거니까)
        else if (user.socialUserId === session.user.id) {
             console.log(`User ${gitadoraId} is already mapped to current session user.`);
        }
      }
      
      if (Object.keys(updateData).length > 0) {
        user = await prisma.tb_users.update({
          where: { id: user.id },
          data: updateData,
        });
      }
    }

    const userId = user.id;

    // 3. 기존 스킬 기록 처리 로직 재사용
    if (!body.records || !Array.isArray(body.records) || body.records.length === 0) {
      // 기록이 없어도 유저 생성/갱신만으로 성공 처리할 수도 있지만, 여기선 경고
      const response = NextResponse.json({ 
        success: true, 
        message: "User updated, but no records provided",
        userId
      });
      return setCorsHeaders(response, request);
    }

    // --- 여기서부터는 기존 로직과 동일 (userId 사용) ---

    // 모든 곡 제목 수집
    const songTitles = [...new Set(body.records.map((r) => r.songTitle))];

    // 곡 정보를 일괄 조회 (존재 여부 확인용)
    const songs = await prisma.tb_song_informations.findMany({
      where: { title: { in: songTitles } },
      select: { id: true, title: true },
    });

    const songMap = new Map(songs.map((s) => [s.title, s.id]));
    const missingSongs = songTitles.filter((title) => !songMap.has(title));

    if (missingSongs.length > 0) {
      console.warn("Some songs are not found in database:", {
        userId,
        missingSongsCount: missingSongs.length,
      });
    }

    const uploadTime = new Date();
    uploadTime.setSeconds(0, 0);

    const createdRecords = [];
    const errors = [];
    const recordsByInstrumentType = new Map<string, any[]>();

    console.log(`Processing ${body.records.length} records for user ${userId}`);

    for (const record of body.records) {
      try {
        // 유효성 검사
        if (!record.songTitle || typeof record.songTitle !== "string") {
            console.warn("Invalid songTitle:", record);
            continue;
        }
        if (!["GUITAR", "BASS", "DRUM", "OPEN"].includes(record.instrumentType)) {
            console.warn("Invalid instrumentType:", record);
            continue;
        }
        if (!["BASIC", "ADVANCED", "EXTREME", "MASTER"].includes(record.difficulty)) {
            console.warn("Invalid difficulty:", record);
            continue;
        }

        const playedAt = record.playedAt ? new Date(record.playedAt) : uploadTime;

        // 스킬 기록 생성
        const skillRecord = await prisma.tb_user_skill_records.create({
          data: {
            userId,
            songTitle: record.songTitle.trim(),
            instrumentType: record.instrumentType,
            difficulty: record.difficulty,
            achievement: record.achievement,
            skillScore: record.skillScore,
            level: record.level || 0,
            isHot: record.isHot,
            versionId: versionId,
            playedAt,
          },
        });

        createdRecords.push(skillRecord);

        // 히스토리용 집계
        if (!recordsByInstrumentType.has(record.instrumentType)) {
          recordsByInstrumentType.set(record.instrumentType, []);
        }
        recordsByInstrumentType.get(record.instrumentType)!.push({
          ...record,
          playedAt,
        });

      } catch (error: any) {
        errors.push({ record, error: error.message });
      }
    }

    // 히스토리 생성 (집계)
    for (const [instrumentType, records] of recordsByInstrumentType.entries()) {
      try {
        const allRecords = await prisma.tb_user_skill_records.findMany({
          where: {
            userId,
            instrumentType: instrumentType as any,
            playedAt: { lte: uploadTime },
          },
        });

        const latestRecordsMap = new Map<string, (typeof allRecords)[0]>();
        for (const record of allRecords) {
          const key = `${record.songTitle}_${record.instrumentType}_${record.difficulty}_${record.isHot}`;
          const existing = latestRecordsMap.get(key);
          if (!existing || record.playedAt > existing.playedAt) {
            latestRecordsMap.set(key, record);
          }
        }

        const latestRecords = Array.from(latestRecordsMap.values());
        
        const hotRecords = latestRecords
          .filter((r) => r.isHot)
          .sort((a, b) => b.skillScore - a.skillScore)
          .slice(0, 25);
          
        const otherRecords = latestRecords
          .filter((r) => !r.isHot)
          .sort((a, b) => b.skillScore - a.skillScore)
          .slice(0, 25);

        const totalHotSkill = hotRecords.reduce((sum, r) => sum + r.skillScore, 0);
        const totalOtherSkill = otherRecords.reduce((sum, r) => sum + r.skillScore, 0);
        const totalSkill = totalHotSkill + totalOtherSkill;

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
      } catch (error) {
        console.error("History creation failed", error);
      }
    }

    const response = NextResponse.json({
      success: true,
      created: createdRecords.length,
      errors: errors.length > 0 ? errors : undefined,
      gameUserId: userId, // 클라이언트가 리다이렉트할 때 사용
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

