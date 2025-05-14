import Link from "next/link";

const RegisterButton = () => {
  return (
    <Link
      href='/register'
      className='inline-block border px-5 py-2 rounded-full font-bold bg-[#81e1cf] text-white text-lg'
    >
      팀원 모집하기
    </Link>
  );
};

export default RegisterButton;
