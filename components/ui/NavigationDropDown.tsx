"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOutAction } from "@/app/actions/auth-actions";

const NavigationDropDown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫히기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
      >
        내정보
      </button>

      {open && (
        <div className='absolute mt-2 w-40 bg-white border rounded shadow-lg z-10'>
          <Link
            href='/myPosts'
            className='block px-4 py-2 text-sm hover:bg-gray-100'
          >
            내 작성글
          </Link>
          <Link
            href='/myLikes'
            className='block px-4 py-2 text-sm hover:bg-gray-100'
          >
            내 관심글
          </Link>
          <Link
            href='/setting'
            className='block px-4 py-2 text-sm hover:bg-gray-100'
          >
            설정
          </Link>
          <form action={signOutAction}>
            <button
              type='submit'
              className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500'
            >
              로그아웃
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NavigationDropDown;
