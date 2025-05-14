"use client";

import { useEffect, useState } from "react";

type CustomSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  defaultValue?: string; // ✅ 추가
};

export default function CustomSelect({
  name,
  label,
  placeholder,
  options,
  defaultValue,
}: CustomSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // ✅ defaultValue가 있으면 초기 선택값으로 설정
  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <label className='block font-semibold mb-1'>{label}</label>
      <div className='relative w-[488px]'>
        <input type='hidden' name={name} value={selected ?? ""} />

        <div
          className='border px-4 h-[56px] flex items-center rounded cursor-pointer bg-white text-black'
          onClick={() => setOpen(!open)}
        >
          {selected || placeholder}
        </div>

        {open && (
          <div className='absolute top-full left-0 right-0 border mt-1 bg-white rounded shadow z-10 text-black'>
            {options.map((option) => (
              <div
                key={option}
                className={`p-2 hover:bg-purple-100 cursor-pointer ${
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
      </div>
    </div>
  );
}
