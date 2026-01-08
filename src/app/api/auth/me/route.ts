import { auth } from "@/auth";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    await prisma.$transaction(async (tx) => {
      // 1. 게임 프로필(tb_users) 찾기
      const gameProfile = await tx.tb_users.findFirst({
        where: { socialUserId: userId },
      });

      if (gameProfile) {
        // 2. 댓글 삭제 (tb_comments는 onDelete: SetNull이므로 수동 삭제 필요)
        await tx.tb_comments.deleteMany({
          where: { userId: gameProfile.id },
        });

        // 3. 게임 프로필 삭제 (skillRecords, skillHistory는 Cascade로 자동 삭제됨)
        await tx.tb_users.delete({
          where: { id: gameProfile.id },
        });
      }

      // 4. 소셜 계정(User) 삭제 (Account, Session은 Cascade로 자동 삭제됨)
      await tx.user.delete({
        where: { id: userId },
      });
    });

    return new NextResponse(JSON.stringify({ message: "Account deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to delete account:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

