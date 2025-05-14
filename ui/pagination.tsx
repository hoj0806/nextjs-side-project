"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCallback, useMemo } from "react";

interface PaginationProps {
  total: number;
  pageSize: number;
}

const Pagination = ({ total, pageSize }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(total / pageSize);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const getPageNumbers = useCallback((): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first
      pages.push(1);

      // Show left ...
      if (currentPage > 3) pages.push("...");

      // Show currentPage -1, currentPage, currentPage +1
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show right ...
      if (currentPage < totalPages - 2) pages.push("...");

      // Always show last
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const pageNumbers = useMemo(getPageNumbers, [getPageNumbers]);

  if (totalPages <= 1) return null;

  return (
    <div className='flex gap-2 mt-8 justify-center'>
      {pageNumbers.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className='px-3 py-1 text-gray-400'>
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={pathname + "?" + createQueryString("page", String(page))}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {page}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
