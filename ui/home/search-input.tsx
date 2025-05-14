"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='relative flex items-center w-[300px]'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='제목, 글 내용을 입력해보세요'
        className='bg-gray-100 px-5 py-2  pl-10 w-full rounded-full outline-none text-lg'
      />
      <button onClick={handleSearch} className='absolute left-2 p-2'>
        <Image alt='search' src='/icons/search.png' width={18} height={18} />
      </button>
    </div>
  );
};

export default SearchInput;
