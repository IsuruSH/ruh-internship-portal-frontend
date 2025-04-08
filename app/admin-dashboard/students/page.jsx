"use client";
import StudentTable from "../../components/students/StudentTable";
import BatchSelector from "../../components/BatchSelector";
import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function StudentsPage() {
  const [selectedBatch, setSelectedBatch] = useState("2020/21");
  return (
    <>
      <div className="flex justify-between items-center mb-8 mt-10 mr-3">
        <div className="flex items-center">
          <Link
            href="/admin-dashboard" // Update this path to your actual dashboard path
            className="flex items-center text-[#0F1D2F] hover:text-[#1E3A8A] mr-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        <BatchSelector onBatchChange={setSelectedBatch} />
      </div>

      <StudentTable batch={selectedBatch} />
    </>
  );
}
