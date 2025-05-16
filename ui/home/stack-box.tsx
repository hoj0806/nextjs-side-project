import Image from "next/image";

const StackBox = ({ stacks }: { stacks: string[] }) => {
  return (
    <ul className='flex gap-3 mb-4'>
      {stacks.map((stack) => (
        <li key={stack} className='w-[32px] h-[32px] relative'>
          <Image
            src={`/images/languages/${stack}.png`} // ✅ 슬래시로 시작하는 절대 경로
            alt={stack}
            fill
          />
        </li>
      ))}
    </ul>
  );
};

export default StackBox;
