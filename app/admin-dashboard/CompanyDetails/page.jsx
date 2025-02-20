"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTrash } from "react-icons/fa";
import api from "../../lib/axios";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

const InternshipDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    company: null,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (company) => {
    setDeleteModal({ isOpen: true, company });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.company) return;

    try {
      // Make the API call to delete the company
      const response = await api.delete(
        `/pre-internship/api/v1/company/${deleteModal.company.id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      // Update the local state
      setCompanies(
        companies.filter((company) => company.id !== deleteModal.company?.id)
      );

      // Close the modal
      setDeleteModal({ isOpen: false, company: null });
    } catch (error) {
      console.error("Error deleting company:", error);
      // Here you might want to show an error message to the user
    }
  };

  const handleAddCompany = () => {
    router.push("CompanyDetails/AddComForm");
  };

  const filteredCompanies = companies.filter((company) =>
    company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      try {
        const response = await api.get("/pre-internship/api/v1/company");
        setCompanies(response.data?.companies);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }
    fetchData();
  }, []);

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
              {filteredCompanies.map((company, index) => (
                <tr key={company.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{company.name}</td>
                  <td className="border px-4 py-2">{company.address}</td>
                  <td className="border px-4 py-2">{company.email}</td>
                  <td className="border px-4 py-2">{company.phone}</td>
                  <td className="border px-4 py-2">{company.person}</td>
                  <td className="border px-4 py-2">{company.note}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteClick(company)}
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
      <DeleteModal
        isOpen={deleteModal.isOpen}
        company={deleteModal.company}
        onClose={() => setDeleteModal({ isOpen: false, company: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

const DeleteModal = ({ isOpen, company, onClose, onConfirm }) => {
  if (!isOpen || !company) return null;

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
          <span className="font-semibold">{company.name}</span>? This action
          cannot be undone.
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
