import PositionBadge from "./position-badge";

const PositionBox = ({ positions }: { positions: string[] }) => {
  return (
    <div className='flex gap-3 mb-4'>
      {positions.map((position) => (
        <PositionBadge key={position}>{position}</PositionBadge>
      ))}
    </div>
  );
};

export default PositionBox;
