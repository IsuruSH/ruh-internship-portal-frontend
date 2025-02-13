
import React from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainContent() {
  return (
  <>
    <div className="flex flex-col h-screen">
      <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-grow p-8 overflow-y-auto mt-16 ml-64 ">
          <h1 className="text-2xl font-bold mb-4 text-center">ADD NOTICES</h1>
            <div className="bg-slate-50 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
              <div className="mb-6">
                <label htmlFor="note" className="block text-base font-medium mb-2">Topic</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="notice" className="block text-base font-medium mb-2">Notice</label>
                <textarea
                  id="notice"
                  className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
                  rows="6"
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                ></textarea>
              </div>
              <div className="flex justify-end mb-4">
                <button className=" py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>

    </>
  );
}