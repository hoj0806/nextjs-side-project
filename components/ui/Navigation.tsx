import Link from "next/link";
import HeaderAuth from "@/components/header-auth";

const Navigation = () => {
  return (
    <nav className='w-full flex justify-center h-16'>
      <div className='w-full flex justify-between items-center px-5 text-sm'>
        <Link href='/'>메인으로</Link>
        <div className='flex items-center gap-8'>
          <Link href='/register'>팀원 모집하기</Link>
          <HeaderAuth />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
