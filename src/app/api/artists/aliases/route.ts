import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/artists/aliases -> 모든 다른 명의 조회
export async function GET() {
  const aliases = await prisma.tb_artist_aliases.findMany({
    include: {
      artist: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(aliases);
}

// POST /api/artists/aliases -> 새 다른 명의 추가
export async function POST(req: Request) {
  const body = await req.json();
  const { artistId, alias } = body;

  if (!artistId) {
    return NextResponse.json(
      { message: "artistId is required" },
      { status: 400 }
    );
  }

  if (!alias) {
    return NextResponse.json({ message: "alias is required" }, { status: 400 });
  }

  const trimmedAlias = alias.trim();
  const lowerTrimmedAlias = trimmedAlias.toLowerCase();

  // 중복 체크 (대소문자 구분 없이, 공백 제거 후)
  const existing = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM tb_artist_aliases 
    WHERE artistId = ${artistId} AND LOWER(alias) = ${lowerTrimmedAlias}
    LIMIT 1
  `;

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { message: "이미 존재하는 다른 명의입니다" },
      { status: 400 }
    );
  }

  const artistAlias = await prisma.tb_artist_aliases.create({
    data: { artistId, alias: trimmedAlias },
  });

  return NextResponse.json(artistAlias, { status: 201 });
}

// PUT /api/artists/aliases -> 다른 명의 수정
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, alias } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  if (!alias) {
    return NextResponse.json({ message: "alias is required" }, { status: 400 });
  }

  const trimmedAlias = alias.trim();
  const lowerTrimmedAlias = trimmedAlias.toLowerCase();

  // 기존 다른 명의 정보 가져오기
  const existing = await prisma.tb_artist_aliases.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "다른 명의를 찾을 수 없습니다" },
      { status: 404 }
    );
  }

  // 같은 작곡가의 다른 명의와 중복 체크 (대소문자 구분 없이, 공백 제거 후)
  const duplicate = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM tb_artist_aliases 
    WHERE artistId = ${existing.artistId} AND LOWER(alias) = ${lowerTrimmedAlias} AND id != ${id}
    LIMIT 1
  `;

  if (duplicate && duplicate.length > 0) {
    return NextResponse.json(
      { message: "이미 존재하는 다른 명의입니다" },
      { status: 400 }
    );
  }

  const artistAlias = await prisma.tb_artist_aliases.update({
    where: { id },
    data: {
      alias: trimmedAlias,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(artistAlias);
}

// DELETE /api/artists/aliases -> 다른 명의 삭제
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const artistAlias = await prisma.tb_artist_aliases.delete({
    where: { id },
  });

  return NextResponse.json(artistAlias);
}

