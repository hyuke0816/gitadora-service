import { auth } from "@/auth";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import DeleteAccountButton from "./delete-account-button";
import { UserRole } from "@prisma/client";
import { OnboardingForm } from "@/features/onboarding/ui/OnboardingForm";

export default async function MyInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  // "me" 키워드 처리 또는 숫자 ID 파싱
  let targetGameProfileId: number | null = null;
  const isMe = resolvedParams.id === "me";

  if (!isMe) {
    const parsedId = parseInt(resolvedParams.id);
    if (isNaN(parsedId)) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">잘못된 접근입니다.</h1>
            </div>
        );
    }
    targetGameProfileId = parsedId;
  }

  // 현재 로그인한 사용자의 게임 프로필 조회
  const myGameProfile = await prisma.tb_users.findFirst({
    where: { socialUserId: session.user.id },
  });

  // 게임 프로필이 없는 경우 (신규 유저)
  if (!myGameProfile) {
    // "me"로 접근했거나, 아직 프로필이 없는데 특정 ID로 접근하려 했다면
    // 여기서 온보딩(프로필 생성) 폼을 보여줍니다.
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          프로필 설정
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          서비스 이용을 위해 프로필을 설정해주세요.
        </p>
        <OnboardingForm
          defaultNickname={session.user.nickname || ""}
          defaultBio={session.user.bio || ""}
          defaultInstrument={session.user.preferredInstrument as "GUITAR" | "DRUM"}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 mb-4">
            계정을 삭제하시겠습니까?
          </p>
          <DeleteAccountButton />
        </div>
      </div>
    );
  }

  // 타인 프로필 접근 차단 (현재는 내 정보만 볼 수 있음)
  if (targetGameProfileId && targetGameProfileId !== myGameProfile.id) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">접근 권한이 없습니다.</h1>
        <p className="text-gray-600 dark:text-gray-400">자신의 정보만 관리할 수 있습니다.</p>
      </div>
    );
  }
  
  // 여기까지 왔다면 내 프로필을 보여주는 것임 (targetGameProfileId가 내 ID거나, "me"로 접근했고 프로필이 있음)
  const user = myGameProfile;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">내 정보 관리</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">프로필 정보</h2>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {session.user.role === UserRole.ADMIN ? '관리자' : '일반 유저'}
            </span>
        </div>
        
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">닉네임</label>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">{session.user.nickname || '-'}</div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">한 줄 소개</label>
                    <div className="text-lg text-gray-900 dark:text-white">{session.user.bio || '-'}</div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">선호 악기</label>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">{session.user.preferredInstrument}</div>
                </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">게임 연동 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">게임 닉네임</label>
                        <div className="text-gray-900 dark:text-white">{user.ingamename || '연동 안됨'}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">GITADORA ID</label>
                        <div className="text-gray-900 dark:text-white">{user.gitadoraId || '-'}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      {/* 프로필 수정 폼 (이미 프로필이 있는 경우 수정 기능 제공 가능) */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
         <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">프로필 수정</h2>
         <OnboardingForm 
            defaultNickname={session.user.nickname || ""} 
            defaultBio={session.user.bio || ""}
            defaultInstrument={session.user.preferredInstrument as "GUITAR" | "DRUM"}
            isEditMode={true}
         />
      </div>

      <DeleteAccountButton />
    </div>
  );
}
