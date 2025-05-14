"use client";

import { useRouter } from "next/navigation";

const FormBackButton = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };
  return (
    <button
      type='button'
      onClick={handleCancel} // 취소 버튼 클릭 시 뒤로 가기
      className='bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded'
    >
      취소
    </button>
  );
};

export default FormBackButton;
