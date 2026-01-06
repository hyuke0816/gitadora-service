import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/versions/[id] -> 특정 버전 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const version = await prisma.tb_gitadora_versions.findUnique({
    where: { id },
  });

  if (!version) {
    return NextResponse.json({ message: "Version not found" }, { status: 404 });
  }

  return NextResponse.json(version);
}

// DELETE /api/versions/[id] -> 버전 삭제
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  try {
    const version = await prisma.tb_gitadora_versions.delete({
      where: { id },
    });

    return NextResponse.json(version);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete version", error: error.message },
      { status: 500 }
    );
  }
}
