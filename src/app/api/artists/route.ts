import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/artists -> 모든 작곡가 조회 (다른 명의 포함)
export async function GET() {
  const artists = await prisma.tb_artist_informations.findMany({
    include: {
      aliases: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(artists);
}

// POST /api/artists -> 새 작곡가 생성
export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  const trimmedName = name.trim();
  const lowerTrimmedName = trimmedName.toLowerCase();

  // 중복 체크: 메인 이름으로 이미 등록되어 있는지 확인 (대소문자 구분 없이)
  const existingArtist = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM tb_artist_informations 
    WHERE LOWER(name) = ${lowerTrimmedName}
    LIMIT 1
  `;

  if (existingArtist && existingArtist.length > 0) {
    return NextResponse.json(
      { message: "이미 등록된 작곡가입니다" },
      { status: 400 }
    );
  }

  // 중복 체크: 다른 명의로 이미 등록되어 있는지 확인 (대소문자 구분 없이)
  const existingAlias = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM tb_artist_aliases 
    WHERE LOWER(alias) = ${lowerTrimmedName}
    LIMIT 1
  `;

  if (existingAlias && existingAlias.length > 0) {
    return NextResponse.json(
      { message: "이미 다른 명의로 등록된 작곡가입니다" },
      { status: 400 }
    );
  }

  const artist = await prisma.tb_artist_informations.create({
    data: { name: trimmedName },
  });

  return NextResponse.json(artist, { status: 201 });
}

// PUT /api/artists -> 작곡가 정보 수정
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  const trimmedName = name.trim();
  const lowerTrimmedName = trimmedName.toLowerCase();

  // 중복 체크: 다른 작곡가의 메인 이름과 중복되는지 확인 (대소문자 구분 없이)
  const existingArtist = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM tb_artist_informations 
    WHERE LOWER(name) = ${lowerTrimmedName} AND id != ${id}
    LIMIT 1
  `;

  if (existingArtist && existingArtist.length > 0) {
    return NextResponse.json(
      { message: "이미 등록된 작곡가명입니다" },
      { status: 400 }
    );
  }

  // 중복 체크: 다른 명의와 중복되는지 확인 (대소문자 구분 없이)
  const existingAlias = await prisma.$queryRaw<Array<{ id: number }>>`
    SELECT id FROM tb_artist_aliases 
    WHERE LOWER(alias) = ${lowerTrimmedName}
    LIMIT 1
  `;

  if (existingAlias && existingAlias.length > 0) {
    return NextResponse.json(
      { message: "이미 다른 명의로 등록된 이름입니다" },
      { status: 400 }
    );
  }

  const artist = await prisma.tb_artist_informations.update({
    where: { id },
    data: {
      name: trimmedName,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(artist);
}

// DELETE /api/artists -> 작곡가 삭제
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const artist = await prisma.tb_artist_informations.delete({
    where: { id },
  });

  return NextResponse.json(artist);
}

