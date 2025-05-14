type DropdownMenuProps = {
  data: string[];
  handleSelect: (value: string) => void;
};

const DropdownMenu = ({ data, handleSelect }: DropdownMenuProps) => {
  return (
    <div className='absolute mt-3 bg-white border-2 z-50 py-2 rounded-2xl flex flex-col w-[150px] gap-2'>
      {data.map((item) => (
        <button
          key={item}
          onClick={() => handleSelect(item)}
          className='px-3 py-2 text-left font-bold hover:bg-gray-100 transition-colors font-lg text-gray-600'
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;
