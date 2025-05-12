import { ReactNode } from "react";

const PositionBadge = ({ children }: { children: ReactNode }) => {
  return (
    <span className='text-[10px] font-bold text-blue-700 bg-gray-400 rounded-full px-[4px] gap-1'>
      {children}
    </span>
  );
};

export default PositionBadge;
