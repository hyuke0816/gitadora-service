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
