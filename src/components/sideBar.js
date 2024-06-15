import React, { useState } from "react";
import AddTask from "./addTask";
import Bar from "./bar";
import { useDispatch } from "react-redux";
import { deleteTask, removeTask } from "../redux/slice";
import { FaFire } from "react-icons/fa";

// When i make tag also assign color

const SideBar = () => {
  const [color, setColor] = useState("pink");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const DragOverHandler = (e) => {
    e.preventDefault();
    setActive(true);
  };
  const DragLeaveHandle = () => {
    setActive(false);
  };

  const DragEndHandler = (e) => {
    const data = e.dataTransfer.getData("card");
    const cardData = JSON.parse(data);
    console.log("card", cardData._id);
    // dispatch(removeTask(cardData.id));

    dispatch(deleteTask(cardData._id));
    setActive(false);
  };

  return (
    <div className='border-l-2 border-zinc-500 h-full w-1/4 px-10  flex flex-col gap-3'>
      <h1 className='text-xl mb-5 font-bold'>Task Progress</h1>
      {/* <div className='flex flex-col gap-2'>
        <Bar color={color} />
        <Bar color={color} />
      </div> */}
      <div>
        <AddTask add={true} />
      </div>
      <div
        onDragOver={DragOverHandler}
        onDragLeave={DragLeaveHandle}
        onDrop={DragEndHandler}
        className={`border w-full  py-20 flex justify-center  rounded-lg  transition duration-500 ease-in-out text-3xl  ${
          active ? "border-red-600 text-red-600  " : "bg-inherit text-white "
        }`}
      >
        <FaFire />
      </div>
    </div>
  );
};

export default SideBar;
