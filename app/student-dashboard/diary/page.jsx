"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function DiaryUpdates() {
  const [searchType, setSearchType] = useState("daily");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [week, setWeek] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const handleSave = async () => {
    // Validate inputs
    if (searchType === "daily" && !date) {
      toast.error("Please select a date");
      return;
    }
    if (searchType === "weekly" && !week) {
      toast.error("Please enter week number");
      return;
    }
    if (!note.trim()) {
      toast.error("Please enter your note");
      return;
    }

    setIsLoading(true);
    
    try {
      const endpoint = searchType === "daily" 
        ? "/api/diaryUpdate/daily/save" 
        : "/api/diaryUpdate/weekly/save";

      const requestBody = {
        sc_number: user?.student_id || "",
        ...(searchType === "daily" ? { date } : { week }),
        notes: note
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save diary update");
      }

      toast.success("Diary update saved successfully!");
      setSavedNote(note);
      setNote("");
      setDate("");
      setWeek("");
    } catch (error) {
      console.error("Error saving diary update:", error);
      toast.error(error.message || "Failed to save diary update");
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
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
              <label htmlFor="date" className="block text-base font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="note" className="block text-base font-medium mb-2">
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
                disabled={isLoading}
                required
                placeholder="Write your daily diary entry here..."
              ></textarea>
            </div>
          </>
        )}

        {/* Weekly Updates */}
        {searchType === "weekly" && (
          <>
            <h2 className="text-lg font-semibold mt-8 mb-4">Weekly Updates</h2>
            <div className="mb-6">
              <label htmlFor="week" className="block text-base font-medium mb-2">
                Week
              </label>
              <input
                type="text"
                id="week"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Week number (e.g., Week 1)"
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="weekly-note" className="block text-base font-medium mb-2">
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
                disabled={isLoading}
                required
                placeholder="Write your weekly diary entry here..."
              ></textarea>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 transition-colors ${
              isLoading || !note || (searchType === "daily" && !date) || (searchType === "weekly" && !week)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={handleSave}
            disabled={isLoading || !note || (searchType === "daily" && !date) || (searchType === "weekly" && !week)}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            className={`py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 transition-colors ${
              !savedNote ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setShowPopup(true)}
            disabled={!savedNote}
          >
            View Last Entry
          </button>
        </div>

        {/* Pop-up Window */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                {searchType === "daily" ? "Daily Note" : "Weekly Note"}
              </h2>
              <div className="bg-gray-50 p-4 rounded mb-4">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {savedNote || "No note available"}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-4 py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 transition-colors"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}``