import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import Loader from "../components/loader";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const payload = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(payload);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.warn(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    let data = JSON.stringify(formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/user/signup`,

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
          //   toast.success("User Created Successfully");
          setFormData(payload);
          setloading(false);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        setloading(false);

        console.log(error);
        // toast.error(error.response.data.message);
      });
  };

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen '>
        <div className='w-full max-w-md flex flex-col items-center p-8 space-y-4 rounded shadow-lg'>
          <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
          <form onSubmit={handleSubmit} className='space-y-4 w-full'>
            <div>
              <label className='block mb-1 text-gray-600'>First Name</label>
              <input
                type='text'
                id='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full px-3 py-2  rounded-md outline-none  bg-zinc-900 '
                required
              />
            </div>
            <div>
              <label className='block mb-1 text-gray-600'>Last Name</label>
              <input
                type='text'
                id='Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='w-full px-3 py-2  rounded-md outline-none  bg-zinc-900 '
                required
              />
            </div>
            <div>
              <label className='block mb-1 text-gray-600' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2  rounded-md outline-none  bg-zinc-900 '
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
                className='w-full px-3 py-2  rounded-md outline-none  bg-zinc-900 '
                required
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <button
                type='submit'
                className='w-full px-3 py-2 text-white bg-slate-900 rounded  outline-none'
              >
                Sign Up
              </button>
            )}
          </form>
          <button onClick={() => navigate("/")} className='text-violet-500  '>
            have you an account ?
          </button>
        </div>
        {/* <ToastContainer /> */}
      </div>
    </Layout>
  );
};

export default Signup;
