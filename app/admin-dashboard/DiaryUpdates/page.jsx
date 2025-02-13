
// src/pages/AnalyzePage.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainContent() {
  return (

    <div className="flex flex-col h-screen">
      <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-grow p-8 overflow-y-auto mt-16 ml-64 ">
      <h1 className="text-2xl font-bold mb-4 text-center">VIEW DIARY UPDATES</h1>
            <div className="bg-slate-50 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
              <div className="mb-6">
                <label  htmlFor="scNumber" className="block text-base font-medium mb-2">SC Number:</label>
                <div className="relative">
                  <input
                    id="scNumber"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded pr-8"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
                <div className="flex justify-end mb-4">
                  <button className=" py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">View</button>
                </div>
              
            </div>
          </div>
        </div>
    </div>  
  );
};

