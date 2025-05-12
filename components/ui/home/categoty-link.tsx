"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

type CategoryLinkProps = {
  value: string | null;
  label: string;
  currentCategory: string | null;
};

export default function CategoryLink({
  value,
  label,
  currentCategory,
}: CategoryLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.set("page", "1");
      return params.toString();
    },
    [searchParams]
  );

  const isActive = value === currentCategory || (!value && !currentCategory);
  const href = value
    ? `${pathname}?${createQueryString("category", value)}`
    : pathname;

  return (
    <Link
      href={href}
      className={`font-bold text-2xl ${isActive ? "text-black" : "text-gray-400"}`}
    >
      {label}
    </Link>
  );
}
