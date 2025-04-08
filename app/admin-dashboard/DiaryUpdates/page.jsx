"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const AnalyzePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for daily entries
  const [dailyEntries, setDailyEntries] = useState([
    { id: 1, sc_number: "12345", date: "2023-05-01", notes: "Completed React project." },
    { id: 2, sc_number: "67890", date: "2023-05-01", notes: "Worked on database optimization." },
    { id: 3, sc_number: "12345", date: "2023-05-02", notes: "Fixed UI bugs in the dashboard." },
    { id: 4, sc_number: "11223", date: "2023-05-03", notes: "Attended a seminar on cybersecurity." },
  ]);

  // Sample data for weekly entries
  const [weeklyEntries, setWeeklyEntries] = useState([
    { id: 1, sc_number: "12345", weeknumber: "18", notes: "Completed project milestones and documentation." },
    { id: 2, sc_number: "67890", weeknumber: "18", notes: "Implemented new database schema." },
    { id: 3, sc_number: "11223", weeknumber: "19", notes: "Prepared for final presentation." },
    { id: 4, sc_number: "12345", weeknumber: "19", notes: "Finalized project documentation." },
  ]);

  // Filter entries based on search term
  const filteredDailyEntries = searchTerm 
    ? dailyEntries.filter(entry => entry.sc_number === searchTerm)
    : [];

  const filteredWeeklyEntries = searchTerm 
    ? weeklyEntries.filter(entry => entry.sc_number === searchTerm)
    : [];

  return (
    <div className="flex-grow p-8 overflow-y-auto mx-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        DIARY UPDATES
      </h1>
      
      {/* Search Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8 w-full max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="scNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Search by SC Number
            </label>
            <div className="relative">
              <input
                id="scNumber"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-4 border border-gray-300 rounded-lg pr-12"
                placeholder="Enter SC Number"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchTerm(searchTerm)}
              >
                <FiSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display tables only if search term exists */}
      {searchTerm && (
        <div className="space-y-8 w-full max-w-6xl mx-auto">
          {/* Daily Entries Table */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Daily Entries for SC: {searchTerm}</h2>
            {filteredDailyEntries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDailyEntries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{entry.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No daily entries found for this SC number.</p>
            )}
          </div>

          {/* Weekly Entries Table */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Weekly Entries for SC: {searchTerm}</h2>
            {filteredWeeklyEntries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredWeeklyEntries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.weeknumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{entry.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No weekly entries found for this SC number.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage;