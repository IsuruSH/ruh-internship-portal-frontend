"use client";
import savefeedback from '../../api/feedbackapi.js'; // Default import
import { useState } from "react";



export default function Feedback() {
  const [scNumber, setScNumber] = useState("");
  const [company, setCompany] = useState("");
  const [feedback, setFeedback] = useState("");

  const feedbackData = {
    sc_number: scNumber,
    company_name: company,
    feedback: feedback,
  };


const handleSaveChanges =  () => {

  console.log(feedbackData);
  savefeedback(feedbackData); // Using the default import
}


  return (
    <div className="flex-1 overflow-y-auto p-8 ">
      <h1 className="text-2xl font-bold mb-4 text-center">FEEDBACKS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <h2 className="text-lg font-normal mb-4">
          If you have completed the internship, fill this out
        </h2>
        <div className="mb-6">
          <label htmlFor="sc_no" className="block text-base font-medium mb-2">
            SC Number
          </label>
          <input
            type="text"
            id="sc_no"
            className="w-full p-2 border border-gray-300 rounded"
            value={scNumber}
            onChange={(e) => setScNumber(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="company" className="block text-base font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            className="w-full p-2 border border-gray-300 rounded"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="block text-base font-medium mb-2"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          ></textarea>
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSaveChanges}
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
