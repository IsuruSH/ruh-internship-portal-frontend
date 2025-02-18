"use client";
import { useState } from "react";

const AddNotice = () => {
  const [topic, setTopic] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = () => {
    alert(`Notice Submitted!\nTopic: ${topic}\nNotice: ${notice}`);
  };

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 ml-64">
      <h1 className="text-2xl font-bold mb-4 text-center">ADD NOTICES</h1>
      <div className="bg-slate-50 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="mb-6">
          <label htmlFor="topic" className="block text-base font-medium mb-2">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            className="w-full p-2 border border-gray-300 rounded"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="notice" className="block text-base font-medium mb-2">
            Notice
          </label>
          <textarea
            id="notice"
            className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
            rows="6"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;
