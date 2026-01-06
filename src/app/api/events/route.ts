import { NextResponse } from "next/server";
import { prisma } from "@shared/lib/prisma";

// GET /api/events -> 모든 이벤트 조회
export async function GET() {
  try {
    const events = await prisma.tb_events.findMany({
      orderBy: { startedAt: "desc" },
    });
    return NextResponse.json(events);
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST /api/events -> 새 이벤트 생성
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, startedAt, endedAt, eventType } = body;

    if (!name) {
      return NextResponse.json(
        { message: "이벤트명은 필수입니다" },
        { status: 400 }
      );
    }

    if (!startedAt) {
      return NextResponse.json(
        { message: "시작일은 필수입니다" },
        { status: 400 }
      );
    }

    if (!eventType) {
      return NextResponse.json(
        { message: "이벤트 타입은 필수입니다" },
        { status: 400 }
      );
    }

    const event = await prisma.tb_events.create({
      data: {
        name,
        startedAt: new Date(startedAt),
        endedAt: endedAt ? new Date(endedAt) : null,
        eventType,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT /api/events -> 이벤트 정보 수정
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, startedAt, endedAt, eventType } = body;

    if (!id) {
      return NextResponse.json(
        { message: "이벤트 ID는 필수입니다" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { message: "이벤트명은 필수입니다" },
        { status: 400 }
      );
    }

    if (!startedAt) {
      return NextResponse.json(
        { message: "시작일은 필수입니다" },
        { status: 400 }
      );
    }

    if (!eventType) {
      return NextResponse.json(
        { message: "이벤트 타입은 필수입니다" },
        { status: 400 }
      );
    }

    const event = await prisma.tb_events.update({
      where: { id },
      data: {
        name,
        startedAt: new Date(startedAt),
        endedAt: endedAt ? new Date(endedAt) : null,
        eventType,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(event);
  } catch (error: any) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE /api/events -> 이벤트 삭제
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "이벤트 ID는 필수입니다" },
        { status: 400 }
      );
    }

    await prisma.tb_events.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete event" },
      { status: 500 }
    );
  }
}
