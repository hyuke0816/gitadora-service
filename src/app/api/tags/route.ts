import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/tags -> 모든 태그 조회 (검색 가능)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  const tags = await prisma.tb_tags.findMany({
    where: search
      ? {
          OR: [
            { key: { contains: search } },
            { name: { contains: search } },
          ],
        }
      : undefined,
    orderBy: { key: "asc" },
    take: 50, // 최대 50개만 반환
  });

  return NextResponse.json(tags);
}

// POST /api/tags -> 새 태그 생성
export async function POST(req: Request) {
  const body = await req.json();
  const { key, name, color } = body;

  if (!key) {
    return NextResponse.json({ message: "key is required" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  const trimmedKey = key.trim().toLowerCase();
  const trimmedName = name.trim();

  // 키는 영어, 숫자, 하이픈, 언더스코어만 허용
  if (!/^[a-z0-9_-]+$/.test(trimmedKey)) {
    return NextResponse.json(
      { message: "태그 키는 영어 소문자, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있습니다" },
      { status: 400 }
    );
  }

  if (!trimmedName) {
    return NextResponse.json(
      { message: "태그 표시 이름을 입력해주세요" },
      { status: 400 }
    );
  }

  // 중복 체크 (키 기준)
  const existingTag = await prisma.tb_tags.findFirst({
    where: { key: trimmedKey },
  });

  if (existingTag) {
    return NextResponse.json(
      { message: "이미 존재하는 태그 키입니다" },
      { status: 400 }
    );
  }

  // 색상 검증 (HEX 코드 형식)
  let tagColor = color?.trim() || "#3b82f6";
  if (!/^#[0-9A-Fa-f]{6}$/.test(tagColor)) {
    tagColor = "#3b82f6"; // 기본값
  }

  const tag = await prisma.tb_tags.create({
    data: { key: trimmedKey, name: trimmedName, color: tagColor },
  });

  return NextResponse.json(tag, { status: 201 });
}

// PUT /api/tags -> 태그 수정
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, key, name, color } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json({ message: "key is required" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  const trimmedKey = key.trim().toLowerCase();
  const trimmedName = name.trim();

  // 키는 영어, 숫자, 하이픈, 언더스코어만 허용
  if (!/^[a-z0-9_-]+$/.test(trimmedKey)) {
    return NextResponse.json(
      { message: "태그 키는 영어 소문자, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있습니다" },
      { status: 400 }
    );
  }

  if (!trimmedName) {
    return NextResponse.json(
      { message: "태그 표시 이름을 입력해주세요" },
      { status: 400 }
    );
  }

  // 중복 체크 (키 기준, 자기 자신 제외)
  const existingTag = await prisma.tb_tags.findFirst({
    where: { key: trimmedKey, id: { not: id } },
  });

  if (existingTag) {
    return NextResponse.json(
      { message: "이미 존재하는 태그 키입니다" },
      { status: 400 }
    );
  }

  // 색상 검증 (HEX 코드 형식)
  let tagColor = color?.trim() || "#3b82f6";
  if (!/^#[0-9A-Fa-f]{6}$/.test(tagColor)) {
    tagColor = "#3b82f6"; // 기본값
  }

  const tag = await prisma.tb_tags.update({
    where: { id },
    data: { key: trimmedKey, name: trimmedName, color: tagColor, updatedAt: new Date() },
  });

  return NextResponse.json(tag);
}

// DELETE /api/tags -> 태그 삭제
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const tag = await prisma.tb_tags.delete({
    where: { id },
  });

  return NextResponse.json(tag);
}

