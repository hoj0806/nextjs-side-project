import Link from "next/link";
import HeaderAuth from "@/components/home/header-auth";
import RegisterButton from "../../ui/home/register-button";

const Navigation = () => {
  return (
    <nav className='w-full flex justify-center h-16'>
      <div className='w-full flex justify-between items-center px-5 text-sm'>
        <Link href='/'>메인으로</Link>
        <div className='flex items-center gap-8'>
          <RegisterButton />
          <HeaderAuth />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
