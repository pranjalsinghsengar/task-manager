import { useEffect, useState } from "react";
import Layout from "./components/layout";
import Card from "./components/card";
import DropIndicator from "./components/dropIndicator";
import SideBar from "./components/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { showTasks, updateTask } from "./redux/slice";

function Home() {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.allTasks.tasks);

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

  console.warn("allTasks", allTasks);

  useEffect(() => {
    dispatch(showTasks());
  }, []);

  return (
    <Layout>
      <div className='flex w-full overflow-hidden h-full'>
        {/* <button className='bg-white ' onClick={() => setValue("mahi")}>
          button
        </button> */}
        <div className='flex justify-evenly h-full gap-5 w-full px-16'>
          <Column
            title='New Task'
            status='New Task'
            allTasks={allTasks}
            DropHandler={DropHandler}
          />
          <Column
            title='Not Started'
            status='Not Started'
            allTasks={allTasks}
            DropHandler={DropHandler}
            // DragOverHandler={DragOverHandler}
          />
          <Column
            title='In Progress'
            status='In Progress'
            DropHandler={DropHandler}
            allTasks={allTasks}
          />
          <Column
            title='Completed'
            status='Completed'
            allTasks={allTasks}
            DropHandler={DropHandler}
          />
        </div>

        <SideBar />
      </div>
    </Layout>
  );
}

export default Home;

export const Column = ({ title, status, allTasks, DropHandler }) => {
  const FilterData = allTasks.filter((item) => item.status === status);
  const [active, setActive] = useState("");
  // console.warn(allTasks);
  const [add, setAdd] = useState(false);

  const HandleDragStart = (e, card) => {
    console.warn("handle drag start", card);
    e.dataTransfer.setData("card", JSON.stringify(card));
    // setActive(true);
  };
  const DragOverHandler = (e) => {
    e.preventDefault();
    // setActive(true);
  };

  return (
    <div
      className='flex flex-col h-full w-full'
      onDrop={(e) => DropHandler(e, status)}
      onDragOver={DragOverHandler}
    >
      <div className='flex items-center gap-1 font-bold text-gray-500 '>
        <div className='text-lg text-gray-500'> {title}</div>
        <span>
          {"("}
          {FilterData.length}
          {")"}
        </span>
      </div>
      <div
        className={`flex flex-col gap-1 w-full h-full overflow-y-scroll ${
          active && "bg-white/30"
        } `}
      >
        {status === "New Task"
          ? FilterData.slice(0, 4).map((item, index) => (
              <Card {...item} key={index} HandleDragStart={HandleDragStart} />
            ))
          : FilterData.length > 0 &&
            FilterData.map((item, index) => {
              return (
                <Card {...item} key={index} HandleDragStart={HandleDragStart} />
              );
            })}

        <DropIndicator status={status} beforeId='-1' />
        {/* {status === "New Task" && <AddTask add={add} setAdd={setAdd} />} */}
      </div>
    </div>
  );
};
