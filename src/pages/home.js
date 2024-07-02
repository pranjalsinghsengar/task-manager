import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { tasks } from "../data/taskData";
import Card from "../components/card";
import DropIndicator from "../components/dropIndicator";
import SideBar from "../components/sideBar";
import { color, colors } from "../data/taskColor";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import { GrRotateLeft } from "react-icons/gr";
import { PiCalendar } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  allTabCloseHandler,
  createTask,
  fetchAssignedTasks,
  setTasks,
  showTasks,
  updateStatus,
  updateTask,
} from "../redux/slice";
import AddTask from "../components/addTask";
import axios from "axios";

function Home() {
  // const [cards, setCards] = useState(tasks);
  const dispatch = useDispatch();
  // const selector = useSelector((data) => console.log(data.allTasks));
  // console.log("selector", selector);
  const motionRef = useRef();

  // console.warn("PORT", process.env.REACT_APP_API_URL);
  // console.warn("PORT", process.env.REACT_APP_CALLBACK_URL);

  const data = useSelector((state) => state.allTasks);
  const allTasks = data.tasks;

  const DropHandler = (e, status) => {
    const JSON_data = e.dataTransfer.getData("card");
    const PARSE_data = JSON.parse(JSON_data);
    // dispatch(updateStatus({ id: PARSE_data.id, status }));
    console.warn("updateStatus", PARSE_data, status);
    const data = {
      _id: PARSE_data._id,
      newStatus: status,
    };
    dispatch(updateTask(data));
  };

  // const [todo, setTodo] = useState(10000);
  // console.warn("value", value);
  //   console.warn("allTasks", allTasks);

  useEffect(() => {
    if (data) {
      dispatch(showTasks(data.user));
      dispatch(fetchAssignedTasks(data.user?._id));
    } else {
      alert("error in sending data");
    }
  }, []);
  // useEffect(() => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:8000/",
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       // console.log(JSON.stringify(response.data));
  //       dispatch(setTasks(response.data.tasks));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [allTasks]);

  return (
    <Layout>
      {data.isaddTask && (
        <div className='absolute top-7 right-20 z-30  p-10 pl-52 pb-52  backdrop-blur  '>
          <AddTask add={true} />
        </div>
      )}
      <div className='py-5 px-20 text-5xl font-bold '>
        {/* Hii, Pranjal  */}
      </div>
      <div
        className='flex w-full overflow-hidden h-full'
        onClick={() => dispatch(allTabCloseHandler())}
      >
        {/* <button className='bg-white ' onClick={() => setValue("mahi")}>
          button
        </button> */}
        <div
          className='flex justify-evenly h-full gap-5 w-full px-16 pr-10'
          ref={motionRef}
        >
          <Column
            title='New Task'
            status='New Task'
            allTasks={allTasks}
            DropHandler={DropHandler}
            motionRef={motionRef}
          />
          <Column
            title='Not Started'
            status='Not Started'
            allTasks={allTasks}
            DropHandler={DropHandler}
            motionRef={motionRef}
            // DragOverHandler={DragOverHandler}
          />
          <Column
            title='In Progress'
            status='In Progress'
            DropHandler={DropHandler}
            allTasks={allTasks}
            motionRef={motionRef}
          />
          <Column
            title='Completed'
            status='Completed'
            allTasks={allTasks}
            DropHandler={DropHandler}
            motionRef={motionRef}
          />
        </div>

        <SideBar />
      </div>
    </Layout>
  );
}

export default Home;

export const Column = ({ title, status, allTasks, DropHandler, motionRef }) => {
  const FilterData = allTasks.filter((item) => item.status === status);
  const [active, setActive] = useState("");

  const HandleDragStart = (e, card) => {
    console.warn("handle drag start", card);
    e.dataTransfer.setData("card", JSON.stringify(card));
    // setActive(true);
  };
  const DragOverHandler = (e) => {
    e.preventDefault();
    // setActive(true)
    // setActive(false);
  };
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setActive(false);
      }, 3000);
    }
  }, [active]);

  return (
    <div
      className='flex flex-col h-full w-full gap-5'
      onDrop={(e) => DropHandler(e, status)}
      onDragOver={DragOverHandler}
      onDragEnter={() => setActive(true)}
      onDragLeave={() => setActive(false)}
      onDragEndCapture={() => setActive(false)}
      // ref={motionRef}
    >
      <div className='flex items-center gap-1 font-bold text-gray-500  border-b border-zinc-600 '>
        <div className='text-lg text-gray-500 '> {title}</div>
        <span>
          {"("}
          {FilterData.length}
          {")"}
        </span>
      </div>
      <div
        className={`flex flex-col gap-1 w-full h-full overflow-y-scroll ${
          active && "bg-zinc-900/20"
        } `}
      >
        {/* {status === "New Task"
          ? FilterData.slice(0, 4).map((item, index) => (
              <Card
                {...item}
                key={index}
                HandleDragStart={HandleDragStart}
                motionRef={motionRef}
              />
            ))
          : */}
        {FilterData.length > 0 &&
          FilterData.map((item, index) => {
            return (
              <Card
                {...item}
                key={index}
                HandleDragStart={HandleDragStart}
                motionRef={motionRef}
              />
            );
          })}

        {/* <DropIndicator status={status} beforeId='-1' /> */}
        {/* {status === "New Task" && <AddTask add={add} setAdd={setAdd} />} */}
      </div>
    </div>
  );
};
