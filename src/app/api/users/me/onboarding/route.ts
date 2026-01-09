import { auth } from "@/auth";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { InstrumentType } from "@prisma/client";

const onboardingSchema = z.object({
  nickname: z.string().optional().or(z.literal("")),
  bio: z.string().max(50, "자기소개는 50자 이내로 작성해주세요.").optional(),
  preferredInstrument: z.enum(["GUITAR", "DRUM", "BASS", "OPEN"]).optional(),
});

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = onboardingSchema.parse(body);

    const nicknameToSave = validatedData.nickname?.trim() || null;

    // 입력된 닉네임 유효성 검사 (입력된 경우에만)
    if (nicknameToSave) {
      if (nicknameToSave.length < 2 || nicknameToSave.length > 12) {
         return NextResponse.json(
          { error: "닉네임은 2자 이상 12자 이하여야 합니다." },
          { status: 400 }
        );
      }
      if (!/^[a-zA-Z0-9가-힣]+$/.test(nicknameToSave)) {
         return NextResponse.json(
          { error: "닉네임은 한글, 영문, 숫자만 사용 가능합니다." },
          { status: 400 }
        );
      }
    }

    // 사용자 정보 업데이트 (isOnboarded: true 설정)
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        nickname: nicknameToSave,
        bio: validatedData.bio || "",
        isOnboarded: true,
        preferredInstrument: validatedData.preferredInstrument || "GUITAR",
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          nickname: updatedUser.nickname,
          bio: updatedUser.bio,
          isOnboarded: updatedUser.isOnboarded,
          preferredInstrument: updatedUser.preferredInstrument,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
