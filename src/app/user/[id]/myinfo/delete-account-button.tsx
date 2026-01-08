'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import ConfirmModal from '@/shared/components/ConfirmModal';

export default function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStep, setDeleteStep] = useState<0 | 1 | 2>(0); // 0: 닫힘, 1: 1차 확인, 2: 2차 확인
  const router = useRouter();

  const handleStartDelete = () => {
    setDeleteStep(1);
  };

  const handleConfirmStep1 = () => {
    setDeleteStep(2);
  };

  const handleCancel = () => {
    setDeleteStep(0);
  };

  const handleFinalDelete = async () => {
    setDeleteStep(0); // 모달 닫기
    try {
      setIsDeleting(true);
      const response = await fetch('/api/auth/me', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // 로그아웃 처리 및 홈으로 이동
      await signOut({ callbackUrl: '/' });
      
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">회원 탈퇴</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          계정을 삭제하면 프로필, 스킬 기록, 댓글 등 모든 데이터가 영구적으로 삭제됩니다.
        </p>
        <button
          onClick={handleStartDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isDeleting ? '탈퇴 처리 중...' : '회원 탈퇴'}
        </button>
      </div>

      {/* 1차 확인 모달 */}
      <ConfirmModal
        isOpen={deleteStep === 1}
        onClose={handleCancel}
        onConfirm={handleConfirmStep1}
        title="회원 탈퇴 확인"
        message="정말로 탈퇴하시겠습니까? 탈퇴 시 모든 게임 데이터와 기록이 영구적으로 삭제되며 복구할 수 없습니다."
        confirmText="계속"
        isDestructive={true}
      />

      {/* 2차 확인 모달 (최종) */}
      <ConfirmModal
        isOpen={deleteStep === 2}
        onClose={handleCancel}
        onConfirm={handleFinalDelete}
        title="정말 삭제하시겠습니까?"
        message="이 작업은 되돌릴 수 없습니다. 삭제된 데이터는 절대 복구할 수 없습니다. 계속하시겠습니까?"
        confirmText="탈퇴하기"
        cancelText="취소"
        isDestructive={true}
      />
    </>
  );
}
