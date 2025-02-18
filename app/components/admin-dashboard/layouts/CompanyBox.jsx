"use client";

import { useDrop } from "react-dnd";
import { useState } from "react";
import { ScissorsIcon } from "@heroicons/react/solid"; // Importing scissors icon

export default function CompanyBox({ company, students, setStudents, companies, setCompanies }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "STUDENT",
    drop: (item) => handleDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // State for editable email
  const [email, setEmail] = useState(company.email);

  const handleDrop = (studentId) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));

    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id
          ? { ...c, students: [...c.students, students.find((s) => s.id === studentId)] }
          : c
      )
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Update company email in the parent component
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id
          ? { ...c, email: e.target.value }
          : c
      )
    );
  };

  const handleRemoveStudent = (studentId) => {
    // Remove student from the company
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id
          ? { ...c, students: c.students.filter((s) => s.id !== studentId) }
          : c
      )
    );

    // Add student back to the student table
    const studentToRemove = company.students.find((s) => s.id === studentId);
    if (studentToRemove) {
      setStudents((prev) => [...prev, studentToRemove]);
    }
  };

  return (
    <div ref={drop} className={`p-4 border rounded-lg bg-gray-600 text-white min-w-[280px] ${isOver ? "bg-gray-400" : ""}`}>
      <h2 className="font-bold">{company.name}</h2>
      <div className="mt-2">
        <label className="block text-sm">Company Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 p-2 rounded text-black w-full"
          placeholder="Enter email"
        />
      </div>
      {company.students.map((student) => (
        <div key={student.id} className="p-2 mt-2 bg-gray-800 rounded flex justify-between items-center">
          <span>{student.name} - {student.scNumber}</span>
          <button
            onClick={() => handleRemoveStudent(student.id)}
            className="ml-2 p-1 bg-red-500 text-white rounded"
            aria-label="Remove student"
          >
            <ScissorsIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button className="mt-2 p-2 bg-blue-500 text-white rounded">Send to Company</button>
    </div>
  );
}
