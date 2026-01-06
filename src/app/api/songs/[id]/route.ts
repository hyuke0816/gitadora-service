import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/songs/[id] -> 특정 곡 조회 (레벨 정보 포함)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const song = await prisma.tb_song_informations.findUnique({
    where: { id },
    include: {
      artistInfo: {
        include: {
          aliases: true,
        },
      },
      levels: {
        include: {
          version: true,
        },
        orderBy: [
          { versionId: "desc" },
          { instrumentType: "asc" },
          { difficulty: "asc" },
        ],
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  const processedSong = {
    ...song,
    imageUrl:
      song.imageUrl || `/image/thumbnail/${encodeURIComponent(song.title)}.png`,
  };

  return NextResponse.json(processedSong);
}

// PUT /api/songs/[id] -> 곡 정보 수정
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();
  const {
    title,
    artist,
    bpm,
    version,
    imageUrl,
    isExist,
    isLicense,
    isCover,
    isLong,
    tagIds,
  } = body;

  if (!title) {
    return NextResponse.json({ message: "title is required" }, { status: 400 });
  }

  if (!version) {
    return NextResponse.json(
      { message: "version is required" },
      { status: 400 }
    );
  }

  // 작곡가 이름으로 작곡가 찾기 (메인 이름 또는 다른 명의로 검색)
  let artistId: number | null = null;
  if (artist) {
    // 1. 메인 이름으로 검색
    const artistByName = await prisma.tb_artist_informations.findFirst({
      where: { name: artist },
    });

    if (artistByName) {
      artistId = artistByName.id;
    } else {
      // 2. 다른 명의로 검색
      const artistByAlias = await prisma.tb_artist_aliases.findFirst({
        where: { alias: artist },
        include: { artist: true },
      });

      if (artistByAlias) {
        artistId = artistByAlias.artistId;
      }
    }
  }

  // 기존 태그 삭제
  await prisma.tb_song_tags.deleteMany({
    where: { songId: id },
  });

  // update data 객체 구성
  const updateData: any = {
    title,
    artist, // 표시용 이름 유지
    bpm,
    version,
    imageUrl: imageUrl || null,
    isExist: isExist ?? true,
    isLicense: isLicense ?? false,
    isCover: isCover ?? false,
    isLong: isLong ?? false,
    artistId: artistId ?? null, // 작곡가 ID 연결 (null 허용)
  };

  // 태그가 있으면 추가
  if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
    updateData.tags = {
      create: tagIds.map((tagId: number) => ({
        tagId,
      })),
    };
  }

  const song = await prisma.tb_song_informations.update({
    where: { id },
    data: updateData,
    include: {
      artistInfo: {
        include: {
          aliases: true,
        },
      },
      levels: {
        include: {
          version: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json(song);
}
