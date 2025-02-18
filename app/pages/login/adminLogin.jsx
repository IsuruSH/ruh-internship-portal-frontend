"use client";
import React, { useState } from "react";

const adminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.username) {
      newErrors.username = "Username is required";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Set errors if validation fails
      return;
    }
    // Perform the login action here
    console.log("Form submitted", formData);
  };
  const onClose = () => {
    console.log("Close button clicked");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-[500px] h-[500px] rounded-[24px] bg-white shadow-lg">
        <div>
          <h2 className="mt-10 text-center text-black text-[32px] font-bold leading-normal">
            Admin Sign in
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="font-normal text-[#333] text-lg leading-normal"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-[12px] border border-gray-300 px-4 py-3 text-base text-gray-900 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-normal text-[#333] text-lg leading-normal"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-[12px] border border-gray-300 px-4 py-3 text-base text-gray-900 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="flex w-full h-[50px] justify-center items-center rounded-[32px] bg-[#0F1D2F] hover:bg-gray-600 transition"
              >
                <h3 className="text-white text-[24px] font-bold leading-normal font-libre">
                  Log In
                </h3>
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default adminLogin;
