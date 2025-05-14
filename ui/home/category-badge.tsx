const CategoryBadge = ({ category }: { category: string }) => {
  return (
    <span className='bg-gray-200 rounded-full p-1 px-2 text-[12px] font-bold'>
      {category === "스터디" ? "✏️ 스터디" : "🗂 프로젝트"}
    </span>
  );
};

export default CategoryBadge;
