"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// Tech Stack Data
const techStacks = [
  { name: "javascript", category: ["frontend"], popular: true },
  { name: "typescript", category: ["frontend", "etc"], popular: true },
  { name: "react", category: ["frontend", "etc"], popular: true },
  { name: "vue", category: ["frontend", "etc"], popular: true },
  { name: "nodejs", category: ["backend", "etc"], popular: true },
  { name: "spring", category: ["backend", "etc"], popular: true },
  { name: "java", category: ["backend", "etc"], popular: true },
  { name: "nextjs", category: ["frontend", "etc"], popular: true },
  { name: "nestjs", category: ["backend", "etc"], popular: true },
  { name: "express", category: ["backend", "etc"], popular: false },
  { name: "go", category: ["backend", "etc"], popular: false },
  { name: "python", category: ["backend", "etc"], popular: false },
  { name: "django", category: ["backend", "etc"], popular: false },
  { name: "swift", category: ["mobile", "etc"], popular: true },
  { name: "kotlin", category: ["backend", "mobile", "etc"], popular: true },
  { name: "mysql", category: ["backend", "etc"], popular: false },
  { name: "mongodb", category: ["backend", "etc"], popular: false },
  { name: "php", category: ["backend", "etc"], popular: false },
  { name: "graphql", category: ["backend", "etc"], popular: false },
  { name: "firebase", category: ["backend", "etc"], popular: false },
  { name: "reactnative", category: ["mobile", "etc"], popular: false },
  { name: "unity", category: ["mobile", "etc"], popular: false },
  { name: "flutter", category: ["mobile", "etc"], popular: true },
  { name: "aws", category: ["etc"], popular: false },
  { name: "kubernetes", category: ["etc"], popular: false },
  { name: "docker", category: ["etc"], popular: false },
  { name: "git", category: ["etc"], popular: false },
  { name: "figma", category: ["etc"], popular: true },
  { name: "zeplin", category: ["etc"], popular: false },
  { name: "jest", category: ["etc"], popular: false },
  { name: "svelte", category: ["frontend", "etc"], popular: false },
];

type MultiSelectDropdownFilterProps = {
  paramsName: string;
  labelName: string;
  data: any[]; // 데이터는 기술 스택 객체 배열
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
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("popular"); // 기본 "인기" 탭

  // URL 파라미터를 초기 선택값으로 반영
  useEffect(() => {
    const initial = searchParams.get(paramsName);
    if (initial) {
      setSelectedValues(initial.split(","));
    }
  }, [searchParams, paramsName]);

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

    setSelectedValues(newValues);
    const query = createQueryString(paramsName, newValues);
    router.push(`${pathname}?${query}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

  // 탭에 맞는 데이터를 필터링
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
      return data; // "모두보기"
    }
  };

  return (
    <div className='relative mb-6 w-full' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-full border border-gray-300 rounded px-3 py-2 text-sm text-left bg-white shadow-sm hover:border-gray-400'
      >
        {selectedValues.length > 0 ? selectedValues.join(", ") : labelName}
      </button>

      {isOpen && (
        <div className='absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-20 max-h-60 overflow-auto'>
          {/* 탭 */}
          <div className='flex'>
            {["popular", "frontend", "backend", "mobile", "etc", "all"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                    activeTab === tab ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {tab === "all"
                    ? "모두보기"
                    : tab === "popular"
                      ? "인기"
                      : tab}
                </button>
              )
            )}
          </div>

          {/* 필터링된 기술 스택 */}
          {getFilteredData().map((item) => {
            const isSelected = selectedValues.includes(item.name);
            return (
              <button
                key={item.name}
                onClick={() => handleSelect(item.name)}
                className={`px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors flex justify-between ${
                  isSelected ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                <span>{item.name}</span>
                {isSelected && <span>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdownFilter;
