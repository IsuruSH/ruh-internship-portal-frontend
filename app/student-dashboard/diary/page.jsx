"use client";

import React from "react";

export default function DiaryUpdates() {
  return (
    <div className="flex-1 overflow-y-auto p-8 ">
      <h1 className="text-2xl font-bold mb-4 text-center">DIARY UPDATES</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Daily Updates</h2>
        <div className="mb-6">
          <label htmlFor="date" className="block text-base font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="note" className="block text-base font-medium mb-2">
            Note
          </label>
          <textarea
            id="note"
            className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
            rows="4"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>
        <div className="flex justify-end mb-4">
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">
            Save Changes
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-base font-semibold mb-2">View daily updates</h3>
          <button className="px-4 py-2 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 mb-4">
            View
          </button>
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
            rows="4"
            readOnly
          ></textarea>
        </div>
        <h2 className="text-lg font-semibold mt-12 mb-4">Weekly Updates</h2>
        <div className="mb-6">
          <label htmlFor="week" className="block text-base font-medium mb-2">
            Week
          </label>
          <input
            type="text"
            id="week"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="weekly-note"
            className="block text-base font-medium mb-2"
          >
            Note
          </label>
          <textarea
            id="weekly-note"
            className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
            rows="4"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>
        <div className="flex justify-start mb-4">
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 mr-4">
            Edit
          </button>
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">
            Save Changes
          </button>
        </div>
        <div className="flex justify-end">
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
