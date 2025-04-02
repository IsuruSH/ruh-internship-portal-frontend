"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Trash2, X, AlertTriangle, Pencil } from "lucide-react";
import api from "../../lib/axios";
import { toast } from "react-hot-toast";

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [interns, setInterns] = useState([]);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    intern: null,
  });

  const router = useRouter();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (intern) => {
    setDeleteModal({ isOpen: true, intern });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.intern) return;

    // Remove the intern from the list
    try {
      // Make the API call to delete the company
      const response = await api.delete(`/internship/${deleteModal.intern.id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      // Update the local state
      setInterns(
        interns.filter((interns) => interns.id !== deleteModal.interns?.id)
      );

      // Close the modal
      setDeleteModal({ isOpen: false, intern: null });
    } catch (error) {
      console.error("Error deleting company:", error);
      // Here you might want to show an error message to the user
    }
  };

  const filteredInterns = interns.filter((intern) =>
    intern?.Company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      try {
        const response = await api.get("/internship");
        console.log(response.data);
        setInterns(response.data?.internships);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex-grow p-8 overflow-y-auto mx-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ADD INTERNSHIPS
      </h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="flex items-center mb-6 space-x-4 justify-between">
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
          <button
            className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
            onClick={() => router.push("AddInternship/AddInternForm")}
          >
            + Add Intern
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Company Name</th>
                <th className="border px-4 py-2 bg-gray-300">Designation</th>
                <th className="border px-4 py-2 bg-gray-300">Time Period</th>
                <th className="border px-4 py-2 bg-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern, index) => (
                <tr key={intern.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{intern.Company.name}</td>
                  <td className="px-4 py-3">{intern.designation}</td>
                  <td className="border-r px-4 py-3">{intern.duration}</td>
                  <td className=" px-1 py-3 flex items-center justify-center gap-5 space-x-3">
                    <button
                      onClick={() => handleEditClick(intern)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(intern)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModal.isOpen}
        intern={deleteModal.intern}
        onClose={() => setDeleteModal({ isOpen: false, intern: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, intern, onClose, onConfirm }) => {
  if (!isOpen || !intern) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-center mb-2">Confirm Deletion</h3>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{intern.companyname}</span>? This
          action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;
