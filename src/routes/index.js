import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import { useSelector } from "react-redux";
import Signup from "../pages/signup";

const TaskRouters = () => {
  const user = useSelector((state) => state.allTasks.user);
  return (
    <Routes>
      {user === null ? (
        <>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </>
      ) : (
        <Route path='/' element={<Home />} />
      )}
    </Routes>
  );
};

export default TaskRouters;
