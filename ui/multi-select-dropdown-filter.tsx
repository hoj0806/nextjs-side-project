"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import DropdownToggleButton from "./home/dropdown-toggle-button";
import Image from "next/image";
import TechStackButton from "@/components/home/techstack-button";

type MultiSelectDropdownFilterProps = {
  paramsName: string;
  labelName: string;
  data: any[];
};

const MultiSelectDropdownFilter = ({
  paramsName,
  labelName,
  data,
}: MultiSelectDropdownFilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("popular");

  // ✅ searchParams에서 직접 선택된 값 추론
  const selectedValues = searchParams.get(paramsName)?.split(",") ?? [];

  const createQueryString = useCallback(
    (name: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (values.length === 0) {
        params.delete(name);
      } else {
        params.set(name, values.join(","));
      }

      params.set("page", "1");
      return params.toString();
    },
    [searchParams]
  );

  const handleSelect = (value: string) => {
    let newValues = [...selectedValues];

    if (value === "전체") {
      newValues = [];
    } else if (selectedValues.includes(value)) {
      newValues = selectedValues.filter((v) => v !== value);
    } else {
      newValues.push(value);
    }

    const query = createQueryString(paramsName, newValues);
    router.push(`${pathname}?${query}`);
  };

  const handleSelectAll = () => {
    const allSelected = selectedValues.length === data.length;
    const newValues = allSelected ? [] : data.map((item) => item.name);
    const query = createQueryString(paramsName, newValues);
    router.push(`${pathname}?${query}`);
  };

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

  const tabs = [
    { label: "인기", key: "popular" },
    { label: "프론트엔드", key: "frontend" },
    { label: "백엔드", key: "backend" },
    { label: "모바일", key: "mobile" },
    { label: "기타", key: "etc" },
    { label: "모두보기", key: "all" },
  ];

  const getFilteredData = () => {
    if (activeTab === "popular") {
      return data.filter((item) => item.popular);
    } else if (activeTab === "frontend") {
      return data.filter((item) => item.category.includes("frontend"));
    } else if (activeTab === "backend") {
      return data.filter((item) => item.category.includes("backend"));
    } else if (activeTab === "mobile") {
      return data.filter((item) => item.category.includes("mobile"));
    } else if (activeTab === "etc") {
      return data.filter((item) => item.category.includes("etc"));
    } else {
      return data;
    }
  };

  return (
    <div className='relative w-[150px]' ref={dropdownRef}>
      <DropdownToggleButton
        label={
          selectedValues.length > 0 ? selectedValues.join(", ") : labelName
        }
        onClick={() => setIsOpen((prev) => !prev)}
        icon={true}
      />

      {isOpen && (
        <div className='absolute mt-3 bg-white border-2 z-50 py-2 w-[1000px] rounded-2xl'>
          {/* 탭 */}
          <div className='flex gap-8 p-5 border-gray-300'>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative pb-2 text-lg font-semibold transition-colors
                    ${isActive ? "text-black" : "text-gray-400"}`}
                >
                  {tab.label}
                  {isActive && (
                    <span className='absolute bottom-0 left-0 w-full h-[3px] bg-yellow-400 rounded'></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 기술 스택 리스트 */}
          <div className='flex gap-4 flex-wrap px-5'>
            {getFilteredData().map((item) => {
              const isSelected = selectedValues.includes(item.name);
              const isNoneSelected = selectedValues.length === 0;

              return (
                <TechStackButton
                  key={item.name}
                  name={item.name}
                  isSelected={isSelected}
                  isNoneSelected={isNoneSelected}
                  onClick={handleSelect}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdownFilter;
