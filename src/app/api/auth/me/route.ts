import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/shared/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get("session_data");

    if (!sessionData) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
      const decoded = JSON.parse(
        Buffer.from(sessionData.value, "base64").toString("utf-8")
      );

      // gameUserId가 있으면 tb_users 정보도 함께 조회
      let gameUser = null;
      if (decoded.gameUserId) {
        gameUser = await prisma.tb_users.findUnique({
          where: { id: decoded.gameUserId },
          select: {
            id: true,
            name: true,
            ingamename: true,
            title: true,
          },
        });
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          ...decoded,
          name: gameUser?.name || null,
          ingamename: gameUser?.ingamename || null,
          title: gameUser?.title || null,
        },
      });
    } catch (error) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { message: "사용자 정보를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
