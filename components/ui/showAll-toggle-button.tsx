"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import DropdownToggleButton from "./home/dropdown-toggle-button";

const ShowAllToggleButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const showAll = searchParams.get("showAll");

  const createQueryString = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete("showAll");
      } else {
        params.set("showAll", value);
      }

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

  const isActive = showAll !== "true";

  return (
    <div className='relative mb-6 w-[150px]'>
      <DropdownToggleButton
        label='👀 모집 중만 보기'
        onClick={handleToggle}
        icon={false}
      />
    </div>
  );
};

export default ShowAllToggleButton;
