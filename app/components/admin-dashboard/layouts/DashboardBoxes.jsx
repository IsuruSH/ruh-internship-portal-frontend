'use client';
import { useState } from "react";
import ShowStudentTable from "../../admin-dashboard/layouts/ShowStudentTable";
import InternshipTable from "../../admin-dashboard/layouts/InternshipTable";
import MessageTable from "../../admin-dashboard/layouts/MessageTable";

const Dashboard = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  return (
    <div className="p-6">
      
      <div className="grid grid-cols-3 gap-6">
        <div
          className="bg-blue-500 text-white p-6 rounded-lg cursor-pointer"
          onClick={() => setSelectedBox("students")}
        >
          <h2 className="text-xl font-semibold">Registered Students</h2>
          <p className="text-3xl">100</p>
        </div>
        <div
          className="bg-green-500 text-white p-6 rounded-lg cursor-pointer"
          onClick={() => setSelectedBox("messages")}
        >
          <h2 className="text-xl font-semibold">Messages</h2>
          <p className="text-3xl">20</p>
        </div>
        <div
          className="bg-red-500 text-white p-6 rounded-lg cursor-pointer"
          onClick={() => setSelectedBox("internships")}
        >
          <h2 className="text-xl font-semibold">Internship Selections</h2>
          <p className="text-3xl">15</p>
        </div>
      </div>

      {/* Modals */}
      {selectedBox === "students" && <ShowStudentTable onClose={() => setSelectedBox(null)} />}
      {selectedBox === "messages" && <MessageTable onClose={() => setSelectedBox(null)} />}
      {selectedBox === "internships" && <InternshipTable onClose={() => setSelectedBox(null)} />}
    </div>
  );
};

export default Dashboard;
