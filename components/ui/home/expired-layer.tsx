const ExpiredLayer = () => {
  return (
    <div className='absolute inset-0 bg-black opacity-50 flex items-center justify-center z-10'>
      <span className='text-white text-xl font-bold'>모집 마감</span>
    </div>
  );
};

export default ExpiredLayer;
