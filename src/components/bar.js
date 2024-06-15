const Bar = ({ color }) => {
  return (
    <div className='flex flex-col bg-white p-3 pt-1 gap-2 rounded-md'>
      <div className='flex justify-between items-center'>
        <label className='font-semibold'>Blender</label>
        <span className='text-zinc-400'>3/8</span>
      </div>
      <div className='bg-black/20 w-full h-1.5 rounded-full '>
        <div
          className={` bg-${color}-400 w-1/2 rounded-full h-full flex justify-end items-center`}
        >
          {/* <span className="w-4 h-4 bg-pink-500 rounded-full"></span> */}
        </div>
      </div>
    </div>
  );
};

export default Bar;
