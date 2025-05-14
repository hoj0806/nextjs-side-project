"use client";

import { useEffect, useState } from "react";

type MultiSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  defaultValue?: string[];
  id: string;
  maxCapacity?: number; // maxCapacity 추가
};

export default function MultiSelect({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  id,
  maxCapacity = Infinity, // 기본값은 무제한
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // defaultValue 있을 경우 초기값 설정
  useEffect(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById(`dropdown-${id}`);
      const input = document.getElementById(`multi-select-input-${id}`);
      if (
        dropdown &&
        input &&
        !dropdown.contains(event.target as Node) &&
        !input.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected((prev) => prev.filter((item) => item !== option));
    } else {
      if (selected.length < maxCapacity) {
        setSelected((prev) => [...prev, option]);
      }
    }
  };

  const removeOption = (option: string) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  const isMaxCapacityReached = selected.length >= maxCapacity; // 최대 용량 도달 여부

  return (
    <div>
      <label className='block font-semibold mb-1 text-lg'>{label}</label>
      <div className='relative w-[488px]'>
        {selected.map((value) => (
          <input key={value} type='hidden' name={name} value={value} />
        ))}

        <div
          id={`multi-select-input-${id}`}
          className='border-2 px-2 h-[56px] flex items-center rounded bg-white text-black pr-8 cursor-default'
          onClick={() => setOpen(!open)}
        >
          <div className='flex gap-2 max-w-full overflow-hidden'>
            {selected.length === 0 ? (
              <span className='text-gray-500'>{placeholder}</span>
            ) : (
              selected.map((item) => (
                <span
                  key={item}
                  className='flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm truncate'
                  onClick={(e) => e.stopPropagation()}
                >
                  {item}
                  <button
                    type='button'
                    onClick={() => removeOption(item)}
                    className='hover:text-red-500'
                  >
                    X
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* 옵션 드롭다운 */}
        {open && (
          <div
            id={`dropdown-${id}`}
            className={`absolute top-full left-0 right-0 border mt-1 bg-white rounded shadow z-10 text-black max-h-60 overflow-y-auto ${
              isMaxCapacityReached ? "backdrop-blur-sm cursor-not-allowed" : ""
            }`}
            style={{
              pointerEvents: isMaxCapacityReached ? "none" : "auto", // 최대 용량 도달 시 클릭 불가
            }}
          >
            {options.map((option) => (
              <div
                key={option}
                className={`p-2 hover:bg-purple-100 cursor-default ${
                  selected.includes(option) ? "bg-purple-50" : ""
                }`}
                onClick={() => toggleOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* 오른쪽 끝에 SVG 추가 */}
        <svg
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-500'
          height='20'
          width='20'
          viewBox='0 0 20 20'
          aria-hidden='true'
          focusable='false'
          onClick={() => setOpen(!open)}
        >
          <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
        </svg>
      </div>
    </div>
  );
}
