import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../data/taskColor";
import { CiCalendarDate, CiWarning } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarContainer from "../components/calendar";
import { newAssignedTask } from "../redux/slice";
import { Loader } from "rsuite";

const payload = {
  userId: "",
  title: "",
  content: "",
  tagTitle: "",
  tagBg: "bg-blue-200",
  tagtext: "text-blue-600",
  taghero: "blue",
  status: "New Task",
  assinedTo: "",
  assiendName: "NA",
  assiendDate: "",
  assiendUserId: "NA",
  dateOfCompilation: "",
};

const AssinedNewTask = () => {
  const selector = useSelector((state) => state.allTasks);
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const [data, setData] = useState(payload);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    if (selector?.user) {
      console.log("user", selector?.user);
      setData({
        ...data,
        userId: selector?.user._id,
        assiendDate: currentDate,
        dateOfCompilation: currentDate,
      });
    }
  }, [selector?.user, data.userId]);

  const [NewDate, setNewDate] = useState(null);

  useEffect(() => {
    if (selector?.user && NewDate) {
      setData({ ...data, dateOfCompilation: NewDate });
    }
  }, [NewDate]);

  const dispatch = useDispatch();

  console.log(data);
  const submitHandler = (e) => {
    if (data.userId) {
      e.preventDefault();
      dispatch(newAssignedTask(data));
      setData(payload);
    } else {
      alert("some thing is not good");
    }
  };
  return (
    <Layout>
      <div className='flex justify-evenly flex-col lg:flex-row  '>
        <form
          onSubmit={submitHandler}
          className='w-10/12 lg:w-1/3 flex flex-col gap-3 lg:gap-10 lg:mt-16'
        >
          <Input
            placeholder='title'
            onChange={inputHandler}
            name='title'
            value={data.title}
          />

          <TextArea
            placeholder='content'
            onChange={inputHandler}
            name='content'
            value={data.content}
          />

          {/* tag */}
          <div className='flex  flex-row gap-3  items-center justify-between border-t border-black py-5'>
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

                <Input
                  required
                  placeholder='Tag title'
                  name='tagTitle'
                  onChange={inputHandler}
                  value={data.tagTitle}
                />
              </div>
            </div>

            <div className='flex items-center justify-center flex-wrap gap-1 lg:gap-3 w-1/3 lg:w-auto'>
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
                    className={`p-2 lg:p-3 cursor-pointer ${item.bg} rounded-full `}
                  />
                );
              })}
            </div>
          </div>
          <div className='bg-zinc-900 py-4 px-10 rounded-lg'>
            <p className='text-center pb-3 text-zinc-400'>sender e-mail</p>
            <div>
              <p className='text-red-500 flex items-center gap-2'>
                <CiWarning /> error
              </p>
              <Input
                placeholder='email'
                name='assinedTo'
                value={data.assinedTo}
                onChange={inputHandler}
                className='bg-zinc-950'
              />
            </div>
          </div>
          <div className='flex justify-center text-lg'>
            {selector.loading ? (
              <Loader />
            ) : (
              <button
                type='submit'
                className='border border-sky-300 px-10 py-2 rounded-md bg-gradient-to-r from-white to-sky-400 text-transparent bg-clip-text '
              >
                send
              </button>
            )}
          </div>
        </form>

        <div className='max-w-2xl  block'>
          <CalendarContainer onChange={setNewDate} value={NewDate} />
        </div>
      </div>
    </Layout>
  );
};

export default AssinedNewTask;

const Input = ({
  onChange,
  className,
  value,
  placeholder,
  isRequired,
  name,
  type,
}) => {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-md px-4 py-2 font-semibold  bg-zinc-900 text-zinc-300 outline-none text-xs md:text-sm lg:text-lg ${className}`}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};

const TextArea = ({
  onChange,
  className,
  value,
  placeholder,
  row,
  name,
  type,
}) => {
  return (
    <textarea
      required
      type={type}
      row={row}
      placeholder={placeholder}
      className={`w-full rounded-md px-4 py-2 font-semibold  bg-zinc-900 text-zinc-300 outline-none text-xs md:text-sm lg:text-lg ${className}`}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};
