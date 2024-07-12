import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { BiRevision } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedTask } from "../redux/slice";
import useFormatDate from "../hooks/useFormatDate";
import useFormatTime from "../hooks/useFormatTime";

const AssinedTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.allTasks);

  useEffect(() => {
    const userId = selector?.user?._id;

    if (userId) {
      dispatch(getAssignedTask(userId));
    }
  }, []);

  console.warn("=>>>>", useFormatDate("2024-07-12T00:00:00.000Z"));

  return (
    <Layout>
      <div className='relative h-full'>
        <div className='flex justify-center w-full  overflow-scroll pb-20 '>
          <table className='w-11/12'>
            <thead>
              <th>Sn.</th>
              <th>Task title</th>
              <th>discription</th>
              <th>tag</th>
              <th>Assisted to</th>
              <th>status</th>
              <th>assined date</th>
              <th>finished date</th>
            </thead>
            <tbody className='w-full'>
              {selector.assignTasks.length > 0 &&
                selector.assignTasks.map((item, index) => {
                  return (
                    <tr key={index}>
                      <Table_tr item={item} index={index} />
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className='flex w-full justify-center items-center fixed bottom-0 h-[15%]  bg-gradient-to-b from-transparent via-black via-30% to-black z-10 '>
          <div className='bg-black border border-zinc-800 w-5/12 px-5 py-3 rounded-lg shadow-lg shadow-zinc-900/50 '>
            <button
              onClick={() => navigate("/assined/newtask")}
              className='bg-gradient-to-r from-red-500 to-sky-400 font-bold text-transparent bg-clip-text'
            >
              assined new task
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssinedTask;

const Table_tr = ({ item, index }) => {
  const [isEmail, setIsEmail] = useState(false);

  return (
    <>
      <td className='text-zinc-500'>{index + 1}</td>
      <td>{item?.title}</td>
      <td className='text-wrap w-1/4'>{item?.content}</td>
      <td className='pr-4 flex'>
        <div
          className={`px-6 py-0.5 rounded-full text-sm ${
            item?.tagBg
              ? `${item?.tagBg} ${item?.tagtext}`
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {item?.tagTitle ? item?.tagTitle : "enter tag"}
        </div>
      </td>
      <td className='bg-zinc-950 text-zinc-300 w-72'>
        <span className='flex justify-between items-center pr-2'>
          <span>
            {isEmail ? (
              <span className='text-sm'>{item?.assinedTo}</span>
            ) : (
              <span> {item?.assiendName}</span>
            )}
          </span>
          <span
            className='text-white cursor-pointer'
            onClick={() => setIsEmail(!isEmail)}
          >
            <BiRevision />
          </span>
        </span>
      </td>
      <td>{item?.status}</td>
      <td className='text-zinc-500'>{item?.assiendDate}</td>
      <td className='flex flex-col text-sm'>
        <span>{useFormatDate(item?.dateOfCompilation)} </span>
        <span>{useFormatTime(item?.dateOfCompilation)}</span>
      </td>
    </>
  );
};
