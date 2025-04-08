"use client";
import { useState, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiPlus,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import api from "../../lib/axios";
import Modal from "../../components/ui/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const DeleteModal = ({ isOpen, notice, onClose, onConfirm }) => {
  if (!isOpen || !notice) return null;

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
          Are you sure you want to delete the notice titled{" "}
          <span className="font-semibold">"{notice.topic}"</span>? This action
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

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    content: "",
    isImportant: false,
    expiresAt: null,
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/notices");
      setNotices(response.data.notices || []);
    } catch (error) {
      toast.error("Failed to fetch notices");
      setNotices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      expiresAt: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentNotice) {
        await api.put(`/notices/${currentNotice.id}`, formData);
        toast.success("Notice updated successfully");
      } else {
        await api.post("/notices", formData);
        toast.success("Notice created successfully");
      }
      fetchNotices();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save notice");
    }
  };

  const handleEdit = (notice) => {
    setCurrentNotice(notice);
    setFormData({
      topic: notice.topic,
      content: notice.content,
      isImportant: notice.isImportant,
      expiresAt: notice.expiresAt ? new Date(notice.expiresAt) : null,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (notice) => {
    setNoticeToDelete(notice);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/notices/${noticeToDelete.id}`);
      toast.success("Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice");
    } finally {
      setIsDeleteModalOpen(false);
      setNoticeToDelete(null);
    }
  };
  const resetForm = () => {
    setFormData({
      topic: "",
      content: "",
      isImportant: false,
      expiresAt: null,
    });
    setCurrentNotice(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isNoticeExpired = (expiresAt) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  return (
    <div className="p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notice Management</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center bg-[#0F1D2F] text-white px-4 py-2 rounded-lg hover:bg-[#1E3A8A] transition-colors"
        >
          <FiPlus className="mr-2" /> Add New Notice
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No notices available
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {notice.isImportant && (
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {notice.topic}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {notice.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          isNoticeExpired(notice.expiresAt)
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {isNoticeExpired(notice.expiresAt)
                          ? "Expired"
                          : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notice.expiresAt ? formatDate(notice.expiresAt) : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(notice)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(notice)}
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
          <DeleteModal
            isOpen={isDeleteModalOpen}
            notice={noticeToDelete}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}

      {/* Add/Edit Notice Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {currentNotice ? "Edit Notice" : "Add New Notice"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="topic">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="6"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isImportant" className="ml-2 block text-gray-700">
              Mark as Important
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Expiration Date</label>
            <div className="flex items-center">
              <FiCalendar className="text-gray-500 mr-2" />
              <DatePicker
                selected={formData.expiresAt}
                onChange={handleDateChange}
                minDate={new Date()}
                isClearable
                placeholderText="No expiration"
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0F1D2F] text-white rounded-lg hover:bg-[#1E3A8A]"
            >
              {currentNotice ? "Update Notice" : "Create Notice"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NoticeManagement;
