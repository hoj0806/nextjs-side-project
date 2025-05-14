import { ReactNode } from "react";

type PostFormBlockProps = {
  children: ReactNode;
  title: string;
  number: string;
};

const PostFormBlock = ({ children, title, number }: PostFormBlockProps) => {
  return (
    <div>
      <div className='p-4 border-b-2 flex gap-2 mb-10'>
        <span className='w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center'>
          {number}
        </span>
        <p className='text-2xl font-bold'>{title}</p>
      </div>
      {children}
    </div>
  );
};

export default PostFormBlock;
