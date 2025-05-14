"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className='cursor-pointer'>
      <Image
        src={"/icons/arrow-left.png"}
        width={32}
        height={32}
        alt='arrow-left'
      />
    </button>
  );
};

export default BackButton;
