"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className='mb-4 flex gap-2'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='검색어 입력'
        className='w-full p-2 border border-gray-300 rounded-md'
      />
      <button
        onClick={handleSearch}
        className='p-2 bg-blue-500 text-white rounded-md'
      >
        검색
      </button>
    </div>
  );
};

export default SearchInput;
