"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { versionsQueries } from "@entities/versions/api/versions.queries";
import { useUpdateVersions } from "@entities/versions/api/versions.mutaions";
import { z } from "zod";
import { format } from "date-fns";

interface FormValues {
  name: string;
  startedAt: string;
  endedAt?: string;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "버전명을 입력해주세요"),
  startedAt: z.string().min(1, "시작일을 선택해주세요"),
  endedAt: z.string().optional(),
});

export default function VersionDetail() {
  const params = useParams();
  const router = useRouter();
  const versionId = parseInt(params.id as string);
  const { data: version, isLoading } = useQuery(
    versionsQueries.getVersionById(versionId)
  );
  const { mutateAsync: updateVersion } = useUpdateVersions();

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    startedAt: "",
    endedAt: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (version) {
      setFormValues({
        name: version.name,
        startedAt: format(new Date(version.startedAt), "yyyy-MM-dd"),
        endedAt: version.endedAt
          ? format(new Date(version.endedAt), "yyyy-MM-dd")
          : "",
      });
    }
  }, [version]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationResult = formSchema.safeParse(formValues);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      setError(firstError.message);
      return;
    }

    const validatedData = validationResult.data;

    try {
      await updateVersion({ id: versionId, ...validatedData });
      router.push("/admin/versions");
    } catch (error: any) {
      alert(`버전 정보를 수정하는데 실패했습니다: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <div className="text-center text-gray-900 dark:text-gray-100">
          로딩 중...
        </div>
      </main>
    );
  }

  if (!version) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <div className="text-center text-red-600 dark:text-red-400">
          버전 정보를 찾을 수 없습니다.
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-gray-100">
            버전 정보 수정
          </h1>
          <button
            onClick={() => router.push("/admin/versions")}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
          >
            ← 버전 목록으로 돌아가기
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                버전명
              </label>
              <input
                type="text"
                name="name"
                placeholder="버전명"
                value={formValues.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                시작일
              </label>
              <input
                type="date"
                name="startedAt"
                value={formValues.startedAt}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                종료일 (선택)
              </label>
              <input
                type="date"
                name="endedAt"
                value={formValues.endedAt || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/versions")}
              className="px-6 py-2 bg-gray-500 dark:bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
