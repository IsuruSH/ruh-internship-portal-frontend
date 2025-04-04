// app/preferences/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../lib/axios";
import { Plus, AlertTriangle, X, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

const PreferencesPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [preferenceForms, setPreferenceForms] = useState([]);
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
      try {
        const response = await api.get("/preference-form");
        setPreferenceForms(response.data?.forms || []);
        console.log(response.data?.forms);
      } catch (error) {
        console.error("Error fetching preference forms:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex-grow p-8 overflow-y-auto mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">PREFERENCE FORMS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="search-section flex items-center mb-4 space-x-4 justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder="Search by batch"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 w-1/3 h-10"
            />
            <button className="bg-[#0F1D2F] text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
          <div className="flex justify-end space-x-2">
            <Link
              href="/preferences/create"
              className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Form
            </Link>
          </div>
        </div>
        <div className="preference-table">
          <table className="min-w-full bg-gray-50">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Batch</th>
                <th className="border px-4 py-2 bg-gray-300">Deadline</th>
                <th className="border px-4 py-2 bg-gray-300">Preferences</th>
                <th className="border px-4 py-2 bg-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredForms.map((form, index) => (
                <tr key={form.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{form.batch}</td>
                  <td className="border px-4 py-2">
                    {new Date(form.deadline).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {form.Preferences?.length || 0} preferences
                  </td>
                  <td className="text-lg border px-4 py-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEditForm(form.id)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(form)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
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
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
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
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPage;
