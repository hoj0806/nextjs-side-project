"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const ShowAllToggleButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const showAll = searchParams.get("showAll");

  const createQueryString = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        // 모집중만 보기 (기본값)
        params.delete("showAll");
      } else {
        // 전체 보기
        params.set("showAll", value);
      }

      // 페이지를 1로 리셋
      params.set("page", "1");

      return params.toString();
    },
    [searchParams]
  );

  const handleToggle = () => {
    const newValue = showAll === "true" ? null : "true";
    const query = createQueryString(newValue);
    router.push(`${pathname}?${query}`);
  };

  const isActive = showAll !== "true"; // 기본: 모집중만 보기 (활성화 상태)

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 text-sm rounded border border-gray-300 shadow-sm transition-colors
        ${isActive ? "bg-purple-100 text-purple-700 hover:bg-purple-200" : "bg-white text-gray-600 hover:bg-gray-100"}
      `}
    >
      모집중만 보기
    </button>
  );
};

export default ShowAllToggleButton;
