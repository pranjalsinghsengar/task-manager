import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import DropIndicator from "./dropIndicator";
import { motion } from "framer-motion";

// title: "",
//     content: "",
//     tagTitle: "",
//     tagColor: {
//       Bg: "",
//       text: "",
//       hero: "",
//     },
//     status: "New Task",
//     dateOfCompilation: "",

const Card = ({
  _id,
  title,
  tagTitle,
  tagBg,
  tagtext,
  taghero,
  content,
  status,
  dateOfCompilation,
  HandleDragStart,
  motionRef,
}) => {
  console.log("tagBg", tagBg);
  return (
    <motion.div dragConstraints={motionRef}>
      <DropIndicator status={status} beforeId={_id} />
      <div
        draggable='true'
        onDragStart={(e) =>
          HandleDragStart(e, {
            _id,
            title,
            tagTitle,
            tagBg,
            tagtext,
            taghero,
            content,
            status,
            dateOfCompilation,
          })
        }
        className='bg-zinc-900 border border-zinc-700 px-3 lg:px-5 py-4  w-full rounded-lg drop-shadow-md flex flex-col justify-between gap-3 cursor-grab active:cursor-grabbing'
      >
        {/* Header */}

        <div className='flex items-center justify-between gap-3 lg:text-base text-xs'>
          <div
            className={`px-4 lg:px-7 py-0.5 rounded-full font-semibold ${tagBg} ${tagtext}  `}
          >
            {tagTitle}
          </div>
          <button className=' text-zinc-400 lg:text-2xl text-sm'>
            <BsThreeDots />
          </button>
        </div>
        {/* Text */}
        <div>
          <div className='font-semibold border-b border-zinc-700 mb-3 capitalize text-zinc-500 lg:text-base text-sm'>
            {title}
          </div>
          <div className='text-zinc-200 lg:text-base text-sm whitespace-pre'>
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end text-slate-400'>
          <div className='flex items-center gap-1'>
            <CiCalendarDate className=' text-xl' />
            <span className='lg:text-base text-sm'>{dateOfCompilation}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
