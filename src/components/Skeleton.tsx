// 스켈레톤 로딩 컴포넌트들

export function TableSkeleton({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr
          key={rowIdx}
          className={`animate-pulse border-b border-gray-200 dark:border-gray-700 ${
            rowIdx % 2 === 0
              ? "bg-white dark:bg-gray-800"
              : "bg-gray-50 dark:bg-gray-800/50"
          }`}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-4">
              <div
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                style={{
                  width: colIdx === 1 ? "100%" : colIdx === 0 ? "2rem" : "6rem",
                }}
              ></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="shadow-lg rounded-lg p-4 bg-gray-200">
        <div className="h-3 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-md px-6">
        <div className="animate-pulse space-y-8">
          {/* 로고/제목 스켈레톤 */}
          <div className="text-center space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>

          {/* 카드 스켈레톤 */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>

          {/* 통계 카드 스켈레톤 */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-4">
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* 헤더 스켈레톤 */}
      <div className="mb-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
      </div>

      {/* 악기 타입 선택 스켈레톤 */}
      <div className="mb-6 flex gap-2">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>

      {/* 스킬 카드 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableSkeleton rows={5} columns={5} />
            </tbody>
          </table>
        </div>
      </div>

      {/* 두 번째 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableSkeleton rows={5} columns={5} />
            </tbody>
          </table>
        </div>
      </div>

      {/* 히스토리 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableSkeleton rows={5} columns={3} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function SkillRankSkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* 헤더 스켈레톤 */}
      <div className="mb-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
      </div>

      {/* 악기 타입 선택 스켈레톤 */}
      <div className="mb-6 flex gap-2">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableSkeleton rows={10} columns={3} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
