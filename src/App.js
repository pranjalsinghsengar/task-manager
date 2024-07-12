import { useEffect, useRef, useState } from "react";
import "./App.css";
import Layout from "./components/layout";
import { tasks } from "./data/taskData";
import Card from "./components/card";
import DropIndicator from "./components/dropIndicator";
import SideBar from "./components/sideBar";
import { color, colors } from "./data/taskColor";
import { IoAdd, IoCloseOutline } from "react-icons/io5";
import { GrRotateLeft } from "react-icons/gr";
import { PiCalendar } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./components/addTask";
import axios from "axios";
import TaskRouters from "./routes";

function App() {
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);
  return <TaskRouters />;
}

export default App;
