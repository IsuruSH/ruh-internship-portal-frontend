"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaSearch } from "react-icons/fa";

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [interns, setInterns] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-grow p-8 overflow-y-auto mt-16 ml-[250px]">
          <h1 className="text-2xl font-bold mb-4 text-center">
            SUPERVISOR FEEDBACKS
          </h1>
          <div className="bg-slate-100 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
            <div className="search-section flex items-center mb-4 space-x-4 justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  placeholder="Search Interns..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border rounded p-2 w-1/4 h-10"
                />
                <button
                  onClick={handleSearch}
                  className="bg-gray-800 text-white p-2 rounded h-10 w-auto flex items-center"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className="intern-table">
              <table className="min-w-full bg-gray-50">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2 bg-gray-300">No</th>
                    <th className="border px-4 py-2 bg-gray-300">
                      Company Name
                    </th>
                    <th className="border px-4 py-2 bg-gray-300">Email</th>
                    <th className="border px-4 py-2 bg-gray-300">
                      Student Name
                    </th>
                    <th className="border px-4 py-2 bg-gray-300">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterns.map((intern, index) => (
                    <tr key={index}>
                      <td>{intern + 1}</td>
                      <td>{intern.companyname}</td>
                      <td>{intern.designation}</td>
                      <td>{intern.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;
