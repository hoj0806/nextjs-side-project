"use client";

import { useState } from "react";

type MultiSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
};

export default function MultiSelect({
  name,
  label,
  placeholder,
  options,
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const removeOption = (option: string) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  return (
    <div>
      <label className='block font-semibold mb-1'>{label}</label>
      <div className='relative w-[488px]'>
        {selected.map((value) => (
          <input key={value} type='hidden' name={name} value={value} />
        ))}

        {/* input 영역 */}
        <div
          className='border px-3 py-2 min-h-[56px] rounded bg-white text-black flex items-center flex-wrap gap-2 cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          {selected.length === 0 ? (
            <span className='text-gray-400'>{placeholder}</span>
          ) : (
            selected.map((item) => (
              <span
                key={item}
                className='flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm'
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

        {/* 옵션 드롭다운 */}
        {open && (
          <div className='absolute top-full left-0 right-0 border mt-1 bg-white rounded shadow z-10 text-black max-h-60 overflow-y-auto'>
            {options.map((option) => (
              <div
                key={option}
                className={`p-2 hover:bg-purple-100 cursor-pointer ${
                  selected.includes(option) ? "bg-purple-50" : ""
                }`}
                onClick={() => {
                  toggleOption(option);
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
