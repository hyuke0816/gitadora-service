import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/artists/[id] -> 특정 작곡가 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const artist = await prisma.tb_artist_informations.findUnique({
    where: { id },
  });

  if (!artist) {
    return NextResponse.json({ message: "Artist not found" }, { status: 404 });
  }

  return NextResponse.json(artist);
}

