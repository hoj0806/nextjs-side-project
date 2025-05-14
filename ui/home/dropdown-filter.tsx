"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownToggleButton from "./dropdown-toggle-button";
import DropdownMenu from "./dropdown-menu";

type DropdownFilterProps = {
  paramsName: string;
  labelName: string;
  data: string[];
};

const DropdownFilter = ({
  paramsName,
  data,
  labelName,
}: DropdownFilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "전체") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      params.set("page", "1");
      return params.toString();
    },
    [searchParams]
  );

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentValue = searchParams.get(paramsName);

  const handleSelect = (value: string) => {
    const query = createQueryString(paramsName, value);
    router.push(`${pathname}${query ? `?${query}` : ""}`);
    setIsOpen(false);
  };

  return (
    <div className='relative w-[150px]' ref={dropdownRef}>
      <DropdownToggleButton
        label={currentValue || labelName}
        onClick={() => setIsOpen((prev) => !prev)}
        icon={true}
      />

      {isOpen && <DropdownMenu data={data} handleSelect={handleSelect} />}
    </div>
  );
};

export default DropdownFilter;
