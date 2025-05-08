"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("🔴 전역 에러 발생:", error);

  return (
    <html>
      <body>
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100 text-red-700'>
          <h1 className='text-2xl font-bold mb-4'>❌ 에러가 발생했어요</h1>
          <p className='mb-4'>{error.message}</p>
          <button
            onClick={reset}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            다시 시도하기
          </button>
        </div>
      </body>
    </html>
  );
}
