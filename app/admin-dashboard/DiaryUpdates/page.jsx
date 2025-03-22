"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const AnalyzePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([
    { index: "12345", entry: "Completed React project." },
    { index: "67890", entry: "Worked on database optimization." },
    { index: "11223", entry: "Attended a seminar on cybersecurity." },
  ]);
  const [filteredEntry, setFilteredEntry] = useState(null);

  const handleSearch = () => {
    const result = diaryEntries.find((entry) => entry.index === searchTerm);
    setFilteredEntry(result || { entry: "No diary entry found." });
  };

  return (
    <div className="flex-grow p-8 overflow-y-auto  mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        VIEW DIARY UPDATES
      </h1>
      <h1 className="text-lg mb-4 ml-2">View Student's diary updates</h1>
      <div className="bg-slate-50 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="mb-6 flex items-center space-x-2">
          <label htmlFor="scNumber" className="text-base font-medium">
            SC Number:
          </label>
          <div className="flex items-center space-x-2 flex-1">
            <input
              id="scNumber"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded pr-8"
              placeholder="Search SC Number"
            />
            <button
              className="p-2 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
              onClick={handleSearch}
            >
              <FiSearch size={20} />
            </button>
          </div>
        </div>
        {filteredEntry && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-lg font-semibold">Diary Entry:</p>
            <p>{filteredEntry.entry}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
