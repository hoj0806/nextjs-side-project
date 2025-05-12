import { ReactNode } from "react";

const PostDescriptionLabel = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className='text-bold text-lg font-bold flex gap-5'>
      <span>{label}</span>
      <span className='text-black'>{children}</span>
    </div>
  );
};

export default PostDescriptionLabel;
