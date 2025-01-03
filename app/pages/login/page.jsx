"use client";
import React, { useState } from "react";
import Image from "next/image";

const Page = ({ onClose, initialMode }) => {
  const [isSignIn, setIsSignIn] = useState(initialMode);
  const [formData, setFormData] = useState({
    signInemail: "",
    password: "",
    scNumber: "",
    email: "",
    signUpPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);

    // Validate input on change
    if (isSignIn) {
      validateSignIn(updatedFormData);
    } else {
      validateSignUp(updatedFormData);
    }
  };

  const validateSignIn = (data) => {
    const newErrors = {};
    if (!data.signInemail) {
      newErrors.signInemail = "Email is required.";
    }
    if (!data.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = (data) => {
    const newErrors = {};
    if (!data.scNumber.match(/^SC\/\d{4}\/\d{5}$/)) {
      newErrors.scNumber = "Invalid SC Number format.";
    }
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (data.signUpPassword.length < 8) {
      newErrors.signUpPassword = "Password must be at least 8 characters long.";
    }
    if (data.signUpPassword !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid;
    if (isSignIn) {
      isValid = validateSignIn(formData);
      if (isValid) {
        console.log("Sign In Successful", formData);
      }
    } else {
      isValid = validateSignUp(formData);
      if (isValid) {
        console.log("Sign Up Successful", formData);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-white rounded-[24px] shadow-lg flex w-[900px] h-[640px] relative">
        {/* Left Section */}
        <div className="w-1/2 p-4 relative rounded-l-lg overflow-hidden">
          {isSignIn ? (
            <div className="flex flex-col justify-center p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-[32px]  text-center leading-normal font-bold mb-4 text-[#333]">
                Sign In
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2 mt-2">
                  <label
                    htmlFor="signInemail"
                    className="text-[#666] font-poppins text-[16px] font-normal leading-normal"
                  >
                    Email
                  </label>
                  <input
                    id="signInemail"
                    type="text"
                    value={formData.signInemail}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-[12px] border border-gray-300 px-4 py-3 text-base text-gray-900 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.signInemail && (
                    <p className="text-red-500 text-sm">{errors.signInemail}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2 mt-2">
                  <label
                    htmlFor="password"
                    className="text-[#666] font-poppins text-[16px] font-normal leading-normal"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-[12px] border border-gray-300 px-4 py-3 text-base text-gray-900 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Forgot password */}
                <div className="flex justify-end ">
                  <a
                    href="#"
                    className="text-[#111] hover:text-blue-700 text-[16px] font-medium leading-normal underline"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-500 text-[#DFE3E5] font-normal text-[20px] leading-normal py-3 rounded-[32px] transition"
                >
                  Sign In
                </button>
              </form>
              <div className="flex items-center justify-center mt-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  <Image
                    src="/images/login/google-icon.svg"
                    alt="Google"
                    width={15}
                    height={15}
                  />
                  <span>Continue with Google</span>
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#333]"
                  />
                  <span className="ml-2 text-[16px] text-[#333] font-normal leading-normal">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[16px] font-normal leading-normal text-[#333333] hover:text-blue-700"
                >
                  Need help?
                </a>
              </div>

              {/* Sign Up Prompt */}
              <div className="text-center mt-8">
                <p className="text-[16px] leading-normal text-[#666] font-normal">
                  Don't have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="font-normal leading-normal text-[16px] text-[#1B0CC0] hover:text-blue-700 underline decoration-solid"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <Image
              src="/images/login/picture1.jpg"
              alt="Sign Up"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/2 justify-center p-4 relative rounded-r-lg">
          {isSignIn ? (
            <Image
              src="/images/login/picture1.jpg"
              alt="Sign In"
              layout="fill"
              objectFit="cover"
              className="rounded-r-lg"
            />
          ) : (
            <div className="flex flex-col justify-center p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h2 className="text-[32px]  text-center leading-normal font-bold mb-4 text-[#333]">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="scNumber"
                    className="text-[#666] font-poppins text-[16px] font-normal leading-normal"
                  >
                    SC number
                  </label>
                  <input
                    id="scNumber"
                    type="text"
                    value={formData.scNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.scNumber && (
                    <p className="text-red-500 text-sm">{errors.scNumber}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-[#666] font-poppins text-[16px] font-normal leading-normal"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signUpPassword"
                    className="text-[#666] font-poppins text-[16px] font-normal leading-normal"
                  >
                    Password
                  </label>
                  <input
                    id="signUpPassword"
                    type="password"
                    value={formData.signUpPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.signUpPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.signUpPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-[#666] font-poppins text-[16px] font-normal leading-normal"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-500 text-[#DFE3E5] font-normal text-[20px] leading-normal py-3 rounded-[32px] transition"
                >
                  Create Account
                </button>
                <div className="text-center mt-8">
                  <p className="text-[16px] leading-normal text-[#666] font-normal">
                    Already have an account?{" "}
                    <button
                      onClick={toggleForm}
                      className="font-normal leading-normal text-[16px] text-[#1B0CC0] hover:text-blue-700 underline decoration-solid"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
