import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseSharp, IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openAddBtn, settingHandler } from "../redux/slice";
import { FaPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = useSelector((state) => state.allTasks);
  const AddHandler = () => {
    dispatch(openAddBtn());
  };
  return (
    <div className='flex justify-center  border-zinc-500 rounded-lg py-5'>
      <div className='flex justify-between w-11/12    items-center '>
        <div className='flex gap-10 items-center'>
          <span className=' uppercase text-xl font-black tracking-wider'>
            Donut 
          </span>
          {/* Search */}
          {/* <div className=' bg-zinc-600 flex items-center rounded-full gap-3 px-4 py-1 '>
            <span className='text-xl '>
              <FiSearch />
            </span>

            <input
              placeholder='Search someting'
              className='bg-transparent outline-none'
            />
          </div> */}
        </div>
        {data.user && (
          <div className='flex items-center gap-10 text-zinc-300'>
            <button className='hover:border-b' onClick={() => navigate("/")}>
              Home
            </button>
            <button
              className='hover:border-b'
              onClick={() => navigate("/assined")}
            >
              Assined tasks
            </button>
            <button
              className='hover:border-b'
              onClick={() => dispatch(settingHandler())}
            >
              Setting
            </button>
            <button className='hover:border-b'>Help</button>
            <button className=' font-bold text-xl bg-gradient-to-r from-blue-600 to-violet-700 bg-clip-text text-transparent '>
              AI
            </button>
          </div>
        )}
        {data.user && (
          <button
            className={`text-xl border p-2 rounded-md border-zinc-500 ${
              location.pathname === "/" ? "visible" : "invisible"
            }  `}
            onClick={AddHandler}
          >
            {data.isaddTask ? <IoCloseSharp /> : <GoPlus />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
