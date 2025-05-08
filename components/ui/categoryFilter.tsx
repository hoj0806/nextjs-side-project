"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const CategoryFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const currentCategory = searchParams.get("category");

  return (
    <div className='flex gap-5 mb-6'>
      <Link
        href={pathname}
        className={!currentCategory ? "font-bold underline" : ""}
      >
        전체
      </Link>
      <Link
        href={pathname + "?" + createQueryString("category", "프로젝트")}
        className={currentCategory === "프로젝트" ? "font-bold underline" : ""}
      >
        프로젝트
      </Link>
      <Link
        href={pathname + "?" + createQueryString("category", "스터디")}
        className={currentCategory === "스터디" ? "font-bold underline" : ""}
      >
        스터디
      </Link>
    </div>
  );
};

export default CategoryFilter;
