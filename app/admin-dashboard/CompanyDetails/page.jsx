"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTrash } from "react-icons/fa";

const InternshipDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [interns, setInterns] = useState([
    {
      id: 1,
      companyName: "Tech Corp",
      address: "123 Tech Street",
      email: "tech@corp.com",
      phone: "123-456-7890",
      person: "John Doe",
      note: "Leading AI company",
    },
    {
      id: 2,
      companyName: "Innovate Ltd",
      address: "456 Innovate Lane",
      email: "info@innovate.com",
      phone: "987-654-3210",
      person: "Jane Smith",
      note: "Great for software interns",
    },
    {
      id: 3,
      companyName: "Future Solutions",
      address: "789 Future Road",
      email: "contact@future.com",
      phone: "555-123-4567",
      person: "Alice Brown",
      note: "Good opportunities in R&D",
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (indexToDelete) => {
    setInterns(interns.filter((_, index) => index !== indexToDelete));
  };

  const handleAddCompany = () => {
    router.push("CompanyDetails/AddComForm");
  };

  const filteredInterns = interns.filter((intern) =>
    intern.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">COMPANY DETAILS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="search-section flex items-center mb-4 space-x-4 justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder="Search Company Name"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 w-1/3 h-10"
            />
            <button className="bg-[#0F1D2F] text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600">
              Save
            </button>
            <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600">
              Edit
            </button>
            <button
              className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
              onClick={handleAddCompany}
            >
              + Add Company
            </button>
          </div>
        </div>
        <div className="intern-table">
          <table className="min-w-full bg-gray-50">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Company Name</th>
                <th className="border px-4 py-2 bg-gray-300">Address</th>
                <th className="border px-4 py-2 bg-gray-300">Email</th>
                <th className="border px-4 py-2 bg-gray-300">Contact No</th>
                <th className="border px-4 py-2 bg-gray-300">Contact Person</th>
                <th className="border px-4 py-2 bg-gray-300">Note</th>
                <th className="border px-4 py-2 bg-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern, index) => (
                <tr key={intern.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{intern.companyName}</td>
                  <td className="border px-4 py-2">{intern.address}</td>
                  <td className="border px-4 py-2">{intern.email}</td>
                  <td className="border px-4 py-2">{intern.phone}</td>
                  <td className="border px-4 py-2">{intern.person}</td>
                  <td className="border px-4 py-2">{intern.note}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;
