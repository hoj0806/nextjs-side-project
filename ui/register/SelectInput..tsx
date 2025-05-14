"use client";

import { useEffect, useState } from "react";

type CustomSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  defaultValue?: string; // ✅ 추가
  id: string; // 고유 ID를 prop으로 받음
};

export default function CustomSelect({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  id, // 고유 ID prop
}: CustomSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // ✅ defaultValue가 있으면 초기 선택값으로 설정
  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  // 드롭다운 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById(`dropdown-${id}`); // 고유 ID 추가
      const input = document.getElementById(`custom-select-input-${id}`); // 고유 ID 추가
      if (
        dropdown &&
        input &&
        !dropdown.contains(event.target as Node) &&
        !input.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 이벤트 리스너 정리
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]); // 고유 ID가 바뀔 때마다 업데이트

  return (
    <div>
      <label className='block font-semibold mb-1 text-lg'>{label}</label>
      <div className='relative'>
        <input type='hidden' name={name} value={selected ?? ""} />

        <div
          id={`custom-select-input-${id}`} // 고유 ID 추가
          className='border-2 px-2 h-[56px] flex items-center rounded bg-white text-black pr-8 cursor-default'
          onClick={() => setOpen(!open)}
        >
          <span className={`${!selected ? "text-gray-500" : "text-black"}`}>
            {selected || placeholder}
          </span>
        </div>

        {open && (
          <div
            id={`dropdown-${id}`} // 고유 ID 추가
            className='absolute top-full left-0 right-0 border mt-1 bg-white rounded shadow z-10 text-black scroll-auto'
          >
            {options.map((option) => (
              <div
                key={option}
                className={`p-2 hover:bg-purple-100 ${
                  selected === option ? "bg-purple-100 font-semibold" : ""
                }`}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
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
          onClick={() => setOpen(!open)} // 클릭 시 드롭다운 열기/닫기
        >
          <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
        </svg>
      </div>
    </div>
  );
}
