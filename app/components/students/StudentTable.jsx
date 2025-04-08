"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiX, FiDownload, FiEye } from "react-icons/fi";
import api from "../../lib/axios";

export default function StudentTable(batch) {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with API call
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      // Mock data
      const mockStudents = Array.from({ length: 50 }, (_, i) => ({
        id: `SC${(i + 1).toString().padStart(3, "0")}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@university.edu`,
        gpa: (Math.random() * (4.0 - 2.5) + 2.5).toFixed(2),
        status: ["Active", "Inactive", "Graduated", "On Leave"][
          Math.floor(Math.random() * 4)
        ],
        registeredDate: new Date(Date.now() - Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
      }));
      setStudents(mockStudents);
      setIsLoading(false);
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadAllCVs = () => {
    alert("Downloading all CVs...");
    // Implement actual download logic
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          onClick={downloadAllCVs}
          className="flex items-center bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white px-4 py-2 rounded-md "
        >
          <FiDownload className="mr-2" /> Download All CVs
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">Loading students...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SC Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.gpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : student.status === "Graduated"
                          ? "bg-blue-100 text-blue-800"
                          : student.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      href={`/admin-dashboard/students/${student.id}`}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <FiEye className="mr-1" /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
