import { auth } from "@/auth";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import DeleteAccountButton from "./delete-account-button";

export default async function MyInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const userId = parseInt(resolvedParams.id);

  if (isNaN(userId)) {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">잘못된 접근입니다.</h1>
        </div>
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 현재 로그인한 사용자의 게임 프로필 ID 확인
  const user = await prisma.tb_users.findFirst({
    where: { socialUserId: session.user.id },
  });

  // 게임 프로필이 없거나(아직 연동 안됨) 자신의 프로필이 아닌 경우
  if (!user || user.id !== userId) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">접근 권한이 없습니다.</h1>
        <p className="text-gray-600 dark:text-gray-400">자신의 정보만 관리할 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">내 정보 관리</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">프로필 정보</h2>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
                <div className="mt-1 text-gray-900 dark:text-white">{user.name}</div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">게임 닉네임</label>
                <div className="mt-1 text-gray-900 dark:text-white">{user.ingamename || '-'}</div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GITADORA ID</label>
                <div className="mt-1 text-gray-900 dark:text-white">{user.gitadoraId || '-'}</div>
            </div>
        </div>
      </div>

      <DeleteAccountButton />
    </div>
  );
}

