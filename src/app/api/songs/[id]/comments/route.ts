import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/songs/[id]/comments -> 곡별 코멘트 조회
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const comments = await prisma.tb_comments.findMany({
    where: {
      commentType: "SONG",
      targetId: id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          ingamename: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(comments);
}

// POST /api/songs/[id]/comments -> 곡 코멘트 작성
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const body = await req.json();
  const { content, userId } = body;

  if (!content || !content.trim()) {
    return NextResponse.json(
      { message: "Content is required" },
      { status: 400 }
    );
  }

  const comment = await prisma.tb_comments.create({
    data: {
      commentType: "SONG",
      targetId: id,
      content: content.trim(),
      userId: userId || null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          ingamename: true,
        },
      },
    },
  });

  return NextResponse.json(comment);
}
