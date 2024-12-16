"use client";
import React, { useState } from "react";
import Image from "next/image";

const Page = ({ onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up forms

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-white rounded-lg shadow-lg flex w-[90%] max-w-[900px] h-[600px] relative">
        {/* Left Section */}
        <div className="w-1/2 relative rounded-l-lg overflow-hidden">
          {isSignIn ? (
            <div className="flex flex-col justify-center p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign In</h2>
              <form className="space-y-6">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="font-normal text-black text-lg leading-normal"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="font-normal text-black text-lg leading-normal"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Remember Me and Need Help */}
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
                >
                  Sign In
                </button>
              </form>
              <div className="flex items-center justify-center">
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
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Need help?
                </a>
              </div>

              {/* Sign Up Prompt */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="font-semibold text-blue-600 hover:text-blue-700"
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
              className="rounded-r-lg"
            />
                    
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col justify-center p-8 relative rounded-r-lg bg-gray-50">
          {isSignIn ? (
            <Image
            src="/images/login/picture1.jpg"
            alt="Sign In"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
          ) : (
            <div className="flex flex-col justify-center p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign Up</h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="scNumber"
                    className="font-normal text-black text-lg leading-normal"
                  >
                    SC Number
                  </label>
                  <input
                    type="text"
                    placeholder="SC/20XX/XXXXX"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="emails"
                    className="font-normal text-black text-lg leading-normal"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="font-normal text-black text-lg leading-normal"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="font-normal text-black text-lg leading-normal"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Close Button */}
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

export default Page;
