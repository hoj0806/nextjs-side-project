"use client";

import { useSearchParams } from "next/navigation";
import CategoryLink from "./categoty-link";

const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className='flex gap-8 mb-8'>
      <CategoryLink
        value={null}
        label='전체'
        currentCategory={currentCategory}
      />
      <CategoryLink
        value='프로젝트'
        label='프로젝트'
        currentCategory={currentCategory}
      />
      <CategoryLink
        value='스터디'
        label='스터디'
        currentCategory={currentCategory}
      />
    </div>
  );
};

export default CategoryFilter;
