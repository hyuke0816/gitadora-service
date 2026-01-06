// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/songs -> 모든 노래 조회 (작곡가 정보 포함)
export async function GET() {
  const posts = await prisma.tb_song_informations.findMany({
    include: {
      artistInfo: {
        include: {
          aliases: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

// POST /api/songs -> 새 노래 생성
export async function POST(req: Request) {
  const body = await req.json();
  const {
    title,
    artist,
    bpm,
    version,
    versionId,
    imageUrl,
    isExist,
    isLicense,
    isCover,
    isLong,
    isHot,
    tagIds,
  } = body;

  if (!title) {
    return NextResponse.json({ message: "title is required" }, { status: 400 });
  }

  // 버전 ID로 버전명 조회 (버전 ID가 있으면 최신 버전명 사용)
  let versionName = version;
  if (versionId) {
    const versionInfo = await prisma.tb_gitadora_versions.findUnique({
      where: { id: parseInt(versionId) },
    });
    if (versionInfo) {
      versionName = versionInfo.name; // 최신 버전명 사용
    }
  }

  if (!versionName) {
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

  const post = await prisma.tb_song_informations.create({
    data: {
      title,
      artist, // 표시용 이름 유지
      artistId, // 작곡가 ID 연결
      bpm,
      version: versionName, // 버전 ID로 조회한 최신 버전명 사용
      imageUrl: imageUrl || null,
      isExist: isExist ?? true,
      isHot: isHot ?? false,
      isLicense: isLicense ?? false,
      isCover: isCover ?? false,
      isLong: isLong ?? false,
      tags:
        tagIds && Array.isArray(tagIds) && tagIds.length > 0
          ? {
              create: tagIds.map((tagId: number) => ({
                tagId,
              })),
            }
          : undefined,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json(post, { status: 201 });
}

// PUT /api/songs -> 노래 정보 수정
export async function PUT(req: Request) {
  const body = await req.json();
  const {
    id,
    title,
    artist,
    bpm,
    version,
    versionId,
    imageUrl,
    isExist,
    isLicense,
    isCover,
    isLong,
    isHot,
    tagIds,
  } = body;

  // 체크박스 값을 명시적으로 boolean으로 변환 (프론트엔드에서 항상 전달되므로)
  const isExistValue =
    typeof isExist === "boolean" ? isExist : Boolean(isExist ?? true);
  const isHotValue =
    typeof isHot === "boolean" ? isHot : Boolean(isHot ?? false);
  const isLicenseValue =
    typeof isLicense === "boolean" ? isLicense : Boolean(isLicense ?? false);
  const isCoverValue =
    typeof isCover === "boolean" ? isCover : Boolean(isCover ?? false);
  const isLongValue =
    typeof isLong === "boolean" ? isLong : Boolean(isLong ?? false);

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  if (!title) {
    return NextResponse.json({ message: "title is required" }, { status: 400 });
  }

  // 버전 ID로 버전명 조회 (버전 ID가 있으면 최신 버전명 사용)
  let versionName = version;
  if (versionId) {
    const versionInfo = await prisma.tb_gitadora_versions.findUnique({
      where: { id: parseInt(versionId) },
    });
    if (versionInfo) {
      versionName = versionInfo.name; // 최신 버전명 사용
    }
  }

  if (!versionName) {
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

  // 새 태그 연결
  if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
    await prisma.tb_song_tags.createMany({
      data: tagIds.map((tagId: number) => ({
        songId: id,
        tagId,
      })),
    });
  }

  const song = await prisma.tb_song_informations.update({
    where: { id },
    data: {
      title,
      artist, // 표시용 이름 유지
      artistId, // 작곡가 ID 연결
      bpm,
      version: versionName, // 버전 ID로 조회한 최신 버전명 사용
      imageUrl: imageUrl || null,
      isExist: isExistValue,
      isHot: isHotValue,
      isLicense: isLicenseValue,
      isCover: isCoverValue,
      isLong: isLongValue,
      updatedAt: new Date(),
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json(song);
}
