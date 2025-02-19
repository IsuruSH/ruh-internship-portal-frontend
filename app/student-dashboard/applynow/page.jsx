// MainContent.jsx
import React from "react";

export default function MainContent() {
  return (
    <div className="flex-grow p-8 overflow-y-auto ">
      <h1 className="text-2xl font-bold mb-4 text-center">APPLY NOW</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <p className="mb-6">
          Please read the instructions carefully and select your preferences.
        </p>
        <div className="mb-4">
          <label
            htmlFor="preference1"
            className="block text-lg font-medium mb-2"
          >
            1st preference
          </label>
          <select
            id="preference1"
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Menu Label</option>
            {/* Add more options here */}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="preference2"
            className="block text-lg font-medium mb-2"
          >
            2nd preference
          </label>
          <select
            id="preference2"
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Menu Label</option>
            {/* Add more options here */}
          </select>
        </div>
      </div>
    </div>
  );
}
