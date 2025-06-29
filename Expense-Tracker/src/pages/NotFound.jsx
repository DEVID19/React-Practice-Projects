import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl  flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-bold ">Oops ! 404 Page not found</h1>
        <Link to="/" className="text-xl text-blue-500 hover:text-blue-700 font-bold ">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
