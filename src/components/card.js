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
  refrence,
}) => {
  console.log("tagBg", tagBg);
  return (
    <motion.div drag dragConstraints={refrence}>
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
        className='bg-zinc-900 border border-zinc-700 px-5 py-4 text-white w-full rounded-lg drop-shadow-md flex flex-col justify-between gap-3 cursor-grab active:cursor-grabbing'
      >
        {/* Header */}

        <div className='flex items-center justify-between'>
          <div
            className={`px-7 py-0.5 rounded-full font-semibold ${tagBg} ${tagtext}  `}
          >
            {tagTitle}
          </div>
          <button className='text-2xl text-zinc-400'>
            <BsThreeDots />
          </button>
        </div>
        {/* Text */}
        <div>
          <div className='font-semibold border-b border-zinc-700 mb-3 capitalize text-zinc-500'>
            {title}
          </div>
          <div className='text-zinc-200'>{content}</div>
        </div>

        {/* Footer */}
        <div className='flex justify-end text-slate-400'>
          <div className='flex items-center gap-1'>
            <CiCalendarDate className='text-xl' />
            <span>{dateOfCompilation}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
