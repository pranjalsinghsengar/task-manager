import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Added Navigate for redirection
import { useSelector } from "react-redux"; // Assuming correct casing and path
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import AssinedTask from "../pages/assinedTask";
import NotFound from "../pages/notFound";
import AssinedNewTask from "../pages/assinedNewTask";

const TaskRouters = () => {
  const user = useSelector((state) => state.allTasks.user);

  return (
    <Routes>
      <Route path='*' element={<NotFound />} />

      {!user ? (
        <>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </>
      ) : (
        <>
          <Route path='/' element={<Home />} />
          <Route path='/assined' element={<AssinedTask />} />
          <Route path='/assined/newtask' element={<AssinedNewTask />} />
        </>
      )}
    </Routes>
  );
};

export default TaskRouters;
