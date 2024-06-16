import React, { useEffect } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/slice";
import Settings from "./settings";

const Layout = ({ children }) => {
  const data = useSelector((state) => state.allTasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  // console.log("data", data);
  return (
    <div className='bg-black h-screen relative text-white overflow-hidden'>
      {/* <BG_Blur /> */}
      <Header />

      <div className='z-10 relative h-[89%] pb-5 '>{children}</div>

      {data.user && data.isSetting && <Settings user={data.user} />}
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
