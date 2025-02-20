"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function DiaryUpdates() {
  const [searchType, setSearchType] = useState("daily");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [week, setWeek] = useState("");
  const [savedNote, setSavedNote] = useState(""); // Store saved note
  const [showPopup, setShowPopup] = useState(false);

  const handleSave = () => {
    setSavedNote(note); // Save the current note
    setNote(""); // Clear the input after saving
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">DIARY UPDATES</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        {/* Search Option */}
        <form className="flex items-center gap-2 mb-6">
          <span className="text-gray-700">Search Type:</span>
          <div className="flex items-center border border-gray-300 rounded px-2">
            <FaSearch className="text-gray-500" />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="flex-1 p-2 focus:outline-none bg-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </form>

        {/* Daily Updates */}
        {searchType === "daily" && (
          <>
            <h2 className="text-lg font-semibold mb-4">Daily Updates</h2>
            <div className="mb-6">
              <label
                htmlFor="date"
                className="block text-base font-medium mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="note"
                className="block text-base font-medium mb-2"
              >
                Note
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
                rows="4"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
          </>
        )}

        {/* Weekly Updates */}
        {searchType === "weekly" && (
          <>
            <h2 className="text-lg font-semibold mt-8 mb-4">Weekly Updates</h2>
            <div className="mb-6">
              <label
                htmlFor="week"
                className="block text-base font-medium mb-2"
              >
                Week
              </label>
              <input
                type="text"
                id="week"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
                rows="4"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mb-4">
          <button
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
            onClick={() => setShowPopup(true)}
          >
            View
          </button>
        </div>

        {/* Pop-up Window */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Your Note</h2>
              <p className="text-gray-800">
                {savedNote || "No note available"}
              </p>
              <button
                className="mt-4 py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
