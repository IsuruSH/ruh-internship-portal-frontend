"use client";

import React from "react";


export default function UpdateInstructions() {
  return (
        <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
          <h1 className="text-2xl font-bold mb-4 text-center">UPDATE INSTRUCTIONS</h1>
          <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
            <div className="mb-6">
              <label htmlFor="note" className="block text-base font-medium mb-2">Feedback</label>
              <textarea
                id="note"
                className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
                rows="10"
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
            <div className="flex justify-end mb-4">
              <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">Save Changes</button>
            </div>
          </div>
        </div>
  );
}
