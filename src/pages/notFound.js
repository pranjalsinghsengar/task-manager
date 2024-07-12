import React, { useEffect } from "react";
import Layout from "../components/layout";

const NotFound = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);
  return (
    <Layout>
      <div className='text-9xl font-bold flex justify-center items-center h-full'>
        Not Found
      </div>
    </Layout>
  );
};

export default NotFound;
