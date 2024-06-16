import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { getUserData, setUserData } from "../redux/slice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AppContext } from "../context/appContext";

const Login = () => {
  const navigate = useNavigate();
  //   const { currentUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = JSON.stringify(formData);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success === true) {
          //   toast.success("Login Successfull");

          dispatch(setUserData(response.data.findUser));
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 700);
          setFormData({
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data.message);
      });
  };

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen '>
        <div className='w-full max-w-md flex items-center flex-col p-8 space-y-4  rounded shadow-lg'>
          <h2 className='text-2xl font-bold text-center'>Login</h2>
          <form onSubmit={handleSubmit} className='space-y-4 w-full'>
            <div>
              <label className='block mb-1 text-gray-600' htmlFor='email'>
                Email
              </label>
              <input
                // type="email"
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2  rounded-md focus:outline-none  bg-zinc-900'
                required
              />
            </div>
            <div>
              <label className='block mb-1 text-gray-600' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full px-3 py-2  rounded-md focus:outline-none  bg-zinc-900'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full px-3 py-2 text-white bg-slate-900 rounded  outline-none '
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate("/signup")}
            className='text-zinc-500 px-10 py-2 rounded-md '
          >
            Don't have account ?
          </button>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </Layout>
  );
};

export default Login;
