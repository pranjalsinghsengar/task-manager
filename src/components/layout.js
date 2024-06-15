import React from "react";

const Layout = ({ children }) => {
  return (
    <div className='bg-black h-screen relative '>
      {/* <BG_Blur /> */}
      <div className='z-10 relative h-full invisible lg:visible '>
        {children}
      </div>
    </div>
  );
};

export default Layout;

export const BG_Blur = () => {
  return (
    <div
      className='h-full absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-pink-100 to-slate-200
    blur-sm  '
    >
      {/* <div className='w-96 h-96 bg-pink-200 blur-[10rem] absolute left-[50%]'></div> */}
    </div>
  );
};
// bg-gradient-to-b from-pink-100 to-zinc-200
