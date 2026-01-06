import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { cookies } from "next/headers";
import crypto from "crypto";

// 간단한 비밀번호 해시 (실제 프로덕션에서는 bcrypt 사용 권장)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// CORS 헤더 설정
function setCorsHeaders(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get("origin");

  // credentials를 사용할 때는 origin을 정확히 지정해야 함 (* 사용 불가)
  if (origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else if (process.env.NODE_ENV === "development") {
    // 개발 환경에서 origin이 없을 때만 * 사용 (credentials 없이)
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  return response;
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response, request);
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "사용자명과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 사용자 조회
    const user = await prisma.tb_auth_users.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { message: "사용자명 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 비밀번호 확인
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { message: "사용자명 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // 세션 생성 (간단한 토큰)
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7일 후 만료

    // 쿠키 설정
    const cookieStore = await cookies();
    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    // tb_users의 id 가져오기 (DB에서 조회한 값 사용)
    let gameUserId: number | null = user.gameUserId ?? null;
    let gameUser = null;

    // USER 역할이고 gameUserId가 있으면 tb_users 정보 조회
    if (user.role === "USER" && gameUserId) {
      gameUser = await prisma.tb_users.findUnique({
        where: { id: gameUserId },
        select: {
          id: true,
          name: true,
          ingamename: true,
          title: true,
        },
      });
    }

    // USER 역할이고 gameUserId가 없으면 tb_users에서 조회 시도
    if (user.role === "USER" && !gameUserId) {
      // username이 "user"인 경우 tb_users id 2를 사용
      // 실제로는 tb_auth_users의 gameUserId 필드에 저장되어 있어야 함
      if (user.username === "user") {
        const foundGameUser = await prisma.tb_users.findUnique({
          where: { id: 2 },
          select: {
            id: true,
            name: true,
            ingamename: true,
            title: true,
          },
        });
        if (foundGameUser) {
          gameUserId = foundGameUser.id;
          gameUser = foundGameUser;
          // DB에도 저장 (다음 로그인 시 바로 사용 가능)
          await prisma.tb_auth_users.update({
            where: { id: user.id },
            data: { gameUserId: foundGameUser.id },
          });
        }
      }
    }

    console.log(
      "Login - user.gameUserId from DB:",
      user.gameUserId,
      "final gameUserId:",
      gameUserId,
      "gameUser:",
      gameUser
    );

    // 세션 정보를 쿠키에 저장 (실제로는 DB나 Redis에 저장해야 함)
    // 여기서는 간단하게 쿠키에 사용자 정보를 인코딩해서 저장
    const sessionData = JSON.stringify({
      userId: user.id, // auth_users id
      gameUserId: gameUserId, // tb_users id (USER 역할일 때만)
      username: user.username,
      role: user.role,
      ingamename: gameUser?.ingamename || null,
      title: gameUser?.title || null,
    });

    cookieStore.set(
      "session_data",
      Buffer.from(sessionData).toString("base64"),
      {
        httpOnly: false, // 클라이언트에서 읽을 수 있도록
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
      }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        gameUserId: gameUserId, // tb_users id 추가
        username: user.username,
        role: user.role,
        name: user.name,
        ingamename: gameUser?.ingamename || null,
        title: gameUser?.title || null,
      },
      role: user.role,
      gameUserId: gameUserId,
    });

    return setCorsHeaders(response, request);
  } catch (error) {
    console.error("Login error:", error);
    const response = NextResponse.json(
      { message: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
    return setCorsHeaders(response, request);
  }
}
