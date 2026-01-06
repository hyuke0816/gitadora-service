import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/versions -> 모든 버전 조회
export async function GET() {
  const versions = await prisma.tb_gitadora_versions.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(versions);
}

// POST /api/versions -> 새 버전 생성
export async function POST(req: Request) {
  const body = await req.json();
  const { name, startedAt, endedAt } = body;

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  if (!startedAt) {
    return NextResponse.json(
      { message: "startedAt is required" },
      { status: 400 }
    );
  }

  // 날짜만 선택한 경우 시간을 00:00:00으로 설정
  const startDate = new Date(startedAt);
  startDate.setHours(0, 0, 0, 0);

  const endDate = endedAt ? new Date(endedAt) : null;
  if (endDate) {
    endDate.setHours(0, 0, 0, 0);
  }

  const version = await prisma.tb_gitadora_versions.create({
    data: {
      name,
      startedAt: startDate,
      endedAt: endDate,
    },
  });

  return NextResponse.json(version, { status: 201 });
}

// PUT /api/versions -> 버전 정보 수정
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, name, startedAt, endedAt } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ message: "name is required" }, { status: 400 });
  }

  if (!startedAt) {
    return NextResponse.json(
      { message: "startedAt is required" },
      { status: 400 }
    );
  }

  // 날짜만 선택한 경우 시간을 00:00:00으로 설정
  const startDate = new Date(startedAt);
  startDate.setHours(0, 0, 0, 0);

  const endDate = endedAt ? new Date(endedAt) : null;
  if (endDate) {
    endDate.setHours(0, 0, 0, 0);
  }

  const version = await prisma.tb_gitadora_versions.update({
    where: { id },
    data: {
      name,
      startedAt: startDate,
      endedAt: endDate,
      updatedAt: new Date(), // 수정 시에는 현재 시간으로 설정
    },
  });

  return NextResponse.json(version);
}

// DELETE /api/versions -> 버전 삭제
export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const version = await prisma.tb_gitadora_versions.delete({
    where: { id },
  });

  return NextResponse.json(version);
}
