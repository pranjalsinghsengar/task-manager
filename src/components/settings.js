import React from "react";
import { HiPower } from "react-icons/hi2";
import { IoIosConstruct } from "react-icons/io";
import { useDispatch } from "react-redux";
import { allTabCloseHandler, logoutHandler } from "../redux/slice";

const Settings = ({ user }) => {
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(logoutHandler());
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  return (
    <div className='absolute backdrop-blur-2xl rounded-lg lg:rounded-2xl overflow-hidden w-9/12 md:10/12 lg:w-9/12 p-10 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10'>
      <div className='bg-zinc-950 p-10 rounded-2xl relative '>
        {/* close */}
        <div className='flex justify-end absolute top-2 right-6'>
          <button
            className='border px-4 rounded-lg'
            onClick={() => dispatch(allTabCloseHandler())}
          >
            close
          </button>
        </div>

        <h1 className='font-bold text-5xl'>User Details</h1>
        <div className='px-10 py-5 flex flex-col gap-3 my-7'>
          {/* setting */}
          <div className='flex gap-10'>
            <ShowUserContainer label='First Name' title={user?.firstName} />
            <ShowUserContainer label='Last Name' title={user?.firstName} />
          </div>
          <ShowUserContainer label='email id' title={user?.email} />
        </div>
        <div>
          <h1 className='font-bold text-5xl'>History</h1>
          <div className='py-14 bg-zinc-700 rounded-lg my-7'>
            {/* history */}

            <p className='text-center w-full flex items-center justify-center gap-2'>
              <IoIosConstruct className='text-orange-700 text-2xl' /> History
              section is under construction{" "}
              <IoIosConstruct className='text-orange-700 text-2xl' />
            </p>
          </div>
        </div>

        <div className='text-2xl flex justify-center'>
          <button
            className='flex gap-2 items-center bg-red-500/10 text-red-500 border border-red-500/30 rounded-md px-4 py-2 '
            onClick={LogoutHandler}
          >
            <HiPower /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

const ShowUserContainer = ({ label, title }) => {
  return (
    <div className='flex flex-col w-full'>
      <span className='capitalize'>{label}</span>
      <span className='px-5 bg-zinc-800 rounded-md py-1 text-xl'>{title}</span>
    </div>
  );
};
