import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, createTask } from "../redux/slice";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import { GrRotateLeft } from "react-icons/gr";
import { colors } from "../data/taskColor";
import { CiCalendarDate } from "react-icons/ci";

const AddTask = ({ add, setAdd }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.allTasks.user);
  //   const [add, setAdd] = useState(false);
  const intialize = {
    title: "",
    content: "",
    tagTitle: "",
    tagBg: "bg-blue-200",
    tagtext: "text-blue-600",
    taghero: "blue",
    status: "New Task",
    dateOfCompilation: "",
    userId: user._id,
  };
  const [data, setData] = useState(intialize);
  // console.log(data);
  const FormHandler = (e) => {
    e.preventDefault();
    // setCards((prev) => [...prev, data]);
    // dispatch(addTask(data));
    dispatch(createTask(data));
    console.log(data);
    setData(intialize);
  };

  return (
    <>
      {add ? (
        <div className='shadow-xl  border-stone-500 bg-zinc-800 border px-3 py-2 rounded-lg z-10 '>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg font-bold  '>Add Task </h1>
            {setAdd && (
              <button onClick={() => setAdd(false)}>
                <IoCloseOutline />
              </button>
            )}
          </div>

          <form className='mt-6 flex flex-col gap-2 ' onSubmit={FormHandler}>
            <select
              className=' w-full rounded-md px-4 py-2 font-semibold  bg-black/50 outline-none'
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value })}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>New Task</option>
            </select>
            <input
              required
              placeholder='title '
              className=' w-full rounded-md px-4 py-2 font-semibold  bg-black/50 outline-none'
              onChange={(e) => setData({ ...data, title: e.target.value })}
              value={data?.title}
            />
            {/* content */}
            <textarea
              required
              rows={7}
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              placeholder='write your content'
              className=' w-full rounded-md px-2 font-semibold  bg-black/50 outline-none'
            />

            {/* tag */}
            <div className=' border-t border-black mt-5 py-5'>
              <div className='flex items-center justify-between gap-4'>
                <div className='flex flex-col gap-2 items-start'>
                  <div
                    className={`px-6 py-0.5 rounded-full text-sm ${
                      data.tagBg
                        ? `${data.tagBg} ${data.tagtext}`
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {data.tagTitle ? data.tagTitle : "enter tag"}
                  </div>

                  <input
                    required
                    placeholder='Tag title'
                    className={`bg-black/50 rounded-md w-full  px-4 py-2 font-semibold outline-none `}
                    onChange={(e) =>
                      setData({ ...data, tagTitle: e.target.value })
                    }
                    value={data.tagTitle}
                  />
                </div>
                {/* {data?.tagTitle ? (
                  <div
                    className='border p-1 text-lg font-bold outline-1 outline-dashed rounded-full text-red-400  cursor-pointer'
                    onClick={() => setData({ ...data, tagTitle: "" })}
                  >
                    <GrRotateLeft />
                  </div>
                ) : (
                  <div
                    className=' p-1 text-lg font-bold outline-1 outline-green-400 text-green-400 outline-dashed rounded-full cursor-pointer'
                    onClick={() => {
                      setData({ ...data, tagTitle: data?.tagTitle });
                    }}
                  >
                    <IoAdd />
                  </div>
                )} */}
              </div>

              <div className='flex items-center justify-center mt-3   gap-3'>
                {colors.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        setData({
                          ...data,
                          tagBg: item.bg,
                          tagtext: item.text,
                          taghero: item.hero,
                        })
                      }
                      className={`p-3 cursor-pointer ${item.bg} rounded-full `}
                    />
                  );
                })}
              </div>
            </div>
            {/* date picker */}
            <div className='mx-2 border py-2 rounded-md   px-2 flex items-center  justify-between relative text-[2rem]'>
              <input
                required
                type='date'
                className='bg-red-400 absolute w-10 right-2 opacity-0  cursor-pointer'
                onChange={(e) =>
                  setData({ ...data, dateOfCompilation: e.target.value })
                }
              />
              <span className='text-base flex flex-col'>
                Compiletion date
                <span>
                  {data?.dateOfCompilation
                    ? data?.dateOfCompilation
                    : "select the date"}{" "}
                </span>
              </span>
              <CiCalendarDate />
            </div>
            <div className='flex justify-center'>
              <button
                disabled={data.dateOfCompilation === ""}
                type='submit'
                className='bg-stone-500  font-semibold px-6 py-2 rounded-md'
              >
                Done
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className='flex items-center gap-2 font-semibold text-sm  w-full  cursor-pointer'
          onClick={() => setAdd(true)}
        >
          <span>Add Task</span>
          <span>+</span>
        </div>
      )}
    </>
  );
};

export default AddTask;
