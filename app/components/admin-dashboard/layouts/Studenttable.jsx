"use client";

import { useState } from "react";
import { useDrag } from "react-dnd";
import { FaSort, FaSearch } from "react-icons/fa";

export default function StudentTable({ students, setStudents }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  // Toggle Sorting Order
  const toggleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    setStudents([...students].sort((a, b) => 
      newSortOrder === "asc" ? a.gpa - b.gpa : b.gpa - a.gpa
    ));
  };

  // Filter Students by Designation and Company
  const filteredStudents = students.filter(student => 
    student.designation.toLowerCase().includes(searchDesignation.toLowerCase()) &&
    student.company.toLowerCase().includes(searchCompany.toLowerCase())
  );

  return (
    <div className="mt-6 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="font-bold text-lg mb-4">Student Details</h2>

      {/* Search Filters */}
      <div className="flex space-x-4 mb-4">
        <div className="relative w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by Designation" 
            className="w-full pl-10 p-2 border rounded-lg"
            value={searchDesignation}
            onChange={(e) => setSearchDesignation(e.target.value)}
          />
        </div>
        <div className="relative w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by Company" 
            className="w-full pl-10 p-2 border rounded-lg"
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
          />
        </div>
      </div>

      {/* Student Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Name</th>
            <th className="border p-2">SC Number</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Email</th>
            <th className="border p-2 flex justify-between items-center">
              GPA
              <button onClick={toggleSort} className="ml-2">
                <FaSort className="text-gray-600 cursor-pointer" />
              </button>
            </th>
            <th className="border p-2">Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <DraggableStudent key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Draggable Student Component
function DraggableStudent({ student }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "STUDENT",
    item: { id: student.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <tr ref={drag} className={`border ${isDragging ? "opacity-50" : ""}`}>
      <td className="border p-2">{student.name}</td>
      <td className="border p-2">{student.scNumber}</td>
      <td className="border p-2">{student.designation}</td>
      <td className="border p-2">{student.email}</td>
      <td className="border p-2">{student.gpa}</td>
      <td className="border p-2">{student.company || "Unassigned"}</td>
    </tr>
  );
}
