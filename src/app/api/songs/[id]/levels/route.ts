import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/songs/[id]/levels -> 곡의 레벨 정보 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const songId = parseInt(resolvedParams.id);

  if (isNaN(songId)) {
    return NextResponse.json({ message: "Invalid song id" }, { status: 400 });
  }

  const levels = await prisma.tb_song_levels.findMany({
    where: { songId },
    include: {
      version: true,
    },
    orderBy: [
      { versionId: "desc" },
      { instrumentType: "asc" },
      { difficulty: "asc" },
    ],
  });

  return NextResponse.json(levels);
}

// POST /api/songs/[id]/levels -> 곡의 레벨 정보 생성
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const songId = parseInt(resolvedParams.id);

  if (isNaN(songId)) {
    return NextResponse.json({ message: "Invalid song id" }, { status: 400 });
  }

  const body = await req.json();
  const { versionId, instrumentType, difficulty, level } = body;

  if (!versionId || !instrumentType || !difficulty) {
    return NextResponse.json(
      { message: "versionId, instrumentType, difficulty are required" },
      { status: 400 }
    );
  }

  // 곡이 존재하는지 확인
  const song = await prisma.tb_song_informations.findUnique({
    where: { id: songId },
  });

  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  // 버전이 존재하는지 확인
  const version = await prisma.tb_gitadora_versions.findUnique({
    where: { id: versionId },
  });

  if (!version) {
    return NextResponse.json({ message: "Version not found" }, { status: 404 });
  }

  // 같은 곡, 같은 버전, 같은 악기, 같은 난이도가 이미 존재하는지 확인
  const existingLevel = await prisma.tb_song_levels.findUnique({
    where: {
      songId_versionId_instrumentType_difficulty: {
        songId,
        versionId,
        instrumentType,
        difficulty,
      },
    },
  });

  if (existingLevel) {
    return NextResponse.json(
      {
        message:
          "이미 같은 버전, 같은 악기, 같은 난이도의 레벨이 존재합니다. 수정을 사용해주세요.",
      },
      { status: 400 }
    );
  }

  try {
    // level 값 처리: null, undefined, 빈 문자열이면 0으로 설정
    let levelValue = 0;
    if (level !== null && level !== undefined && level !== "") {
      const parsed = parseFloat(level);
      if (!isNaN(parsed)) {
        levelValue = parsed;
      }
    }

    const songLevel = await prisma.tb_song_levels.create({
      data: {
        songId,
        versionId,
        instrumentType,
        difficulty,
        level: levelValue,
      },
      include: {
        version: true,
      },
    });

    return NextResponse.json(songLevel, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create song level" },
      { status: 500 }
    );
  }
}

// PUT /api/songs/[id]/levels -> 곡의 레벨 정보 수정
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const songId = parseInt(resolvedParams.id);

  if (isNaN(songId)) {
    return NextResponse.json({ message: "Invalid song id" }, { status: 400 });
  }

  const body = await req.json();
  const { id, level } = body;

  if (!id) {
    return NextResponse.json(
      { message: "level id is required" },
      { status: 400 }
    );
  }

  if (level === undefined) {
    return NextResponse.json({ message: "level is required" }, { status: 400 });
  }

  // 레벨이 해당 곡에 속하는지 확인
  const existingLevel = await prisma.tb_song_levels.findUnique({
    where: { id },
  });

  if (!existingLevel) {
    return NextResponse.json({ message: "Level not found" }, { status: 404 });
  }

  if (existingLevel.songId !== songId) {
    return NextResponse.json(
      { message: "Level does not belong to this song" },
      { status: 403 }
    );
  }

  try {
    const updatedLevel = await prisma.tb_song_levels.update({
      where: { id },
      data: {
        level: parseFloat(level),
      },
      include: {
        version: true,
      },
    });

    return NextResponse.json(updatedLevel);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update song level" },
      { status: 500 }
    );
  }
}

// DELETE /api/songs/[id]/levels -> 곡의 레벨 정보 삭제
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const songId = parseInt(resolvedParams.id);

  if (isNaN(songId)) {
    return NextResponse.json({ message: "Invalid song id" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const levelId = searchParams.get("levelId");

  if (!levelId) {
    return NextResponse.json(
      { message: "levelId is required" },
      { status: 400 }
    );
  }

  const id = parseInt(levelId);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid level id" }, { status: 400 });
  }

  // 레벨이 해당 곡에 속하는지 확인
  const existingLevel = await prisma.tb_song_levels.findUnique({
    where: { id },
  });

  if (!existingLevel) {
    return NextResponse.json({ message: "Level not found" }, { status: 404 });
  }

  if (existingLevel.songId !== songId) {
    return NextResponse.json(
      { message: "Level does not belong to this song" },
      { status: 403 }
    );
  }

  try {
    await prisma.tb_song_levels.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Level deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete song level" },
      { status: 500 }
    );
  }
}
