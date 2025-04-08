// app/preferences/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/axios";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiAlertTriangle,
  FiSearch,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";
import Modal from "../../components/ui/Modal";

const PreferencesPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [preferenceForms, setPreferenceForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    form: null,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteClick = (form) => {
    setDeleteModal({ isOpen: true, form });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.form) return;

    try {
      const response = await api.delete(
        `/preference-form/${deleteModal.form.id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setPreferenceForms(
          preferenceForms.filter((form) => form.id !== deleteModal.form?.id)
        );
      } else {
        toast.error(response.data.message);
      }
      setDeleteModal({ isOpen: false, form: null });
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Failed to delete form");
    }
  };

  const handleEditForm = (formId) => {
    router.push(`PreferenceUpdate/edit/${formId}`);
  };

  const filteredForms = preferenceForms.filter((form) =>
    form?.batch?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await api.get("/preference-form");
        setPreferenceForms(response.data?.forms || []);
      } catch (error) {
        console.error("Error fetching preference forms:", error);
        toast.error("Failed to fetch preference forms");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Preference Forms</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by batch..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Link
            href="PreferenceUpdate/create"
            className="flex items-center bg-[#0F1D2F] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors"
          >
            <FiPlus className="mr-2" /> Add New Form
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredForms.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm
            ? "No matching forms found"
            : "No preference forms available"}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferences
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredForms.map((form, index) => (
                  <tr key={form.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {form.batch}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(form.deadline)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {form.Preferences?.length || 0} preferences
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditForm(form.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(form)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        form={deleteModal.form}
        onClose={() => setDeleteModal({ isOpen: false, form: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

const DeleteModal = ({ isOpen, form, onClose, onConfirm }) => {
  if (!isOpen || !form) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <FiAlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-center mb-2">Confirm Deletion</h3>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete the preference form for{" "}
          <span className="font-semibold">{form.batch}</span>? This action
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
            <FiTrash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;
