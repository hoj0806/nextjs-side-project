import { ReactNode } from "react";

const PositionBadge = ({ children }: { children: ReactNode }) => {
  return (
    <span className='text-md font-bold text-blue-600 bg-gray-200 rounded-full px-2'>
      {children}
    </span>
  );
};

export default PositionBadge;
