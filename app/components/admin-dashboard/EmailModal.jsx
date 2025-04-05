"use client";
import { useState } from "react";

import { FaTimes } from "react-icons/fa";

// Email Modal Component
const EmailModal = ({ company, students, onClose, onSend }) => {
  const [emailData, setEmailData] = useState({
    to: company.email,
    subject: "Students CV from University of Ruhuna",
    cc: "",
    bcc: "",
    body: `Dear ${
      company.name
    },\n\nPlease find attached the CVs of the following students who have been assigned to your company:\n\n${students
      .map((s) => `- ${s.name} (${s.scNumber})`)
      .join("\n")}\n\nBest regards,\nUniversity of Ruhuna`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma-separated emails to arrays
    const payload = {
      ...emailData,
      cc: emailData.cc
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
      bcc: emailData.bcc
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
      studentIds: students.map((s) => s.id),
      companyId: company.id,
    };
    onSend(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Send Email to {company.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="email"
                name="to"
                value={emailData.to}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CC (comma separated)
              </label>
              <input
                type="text"
                name="cc"
                value={emailData.cc}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BCC (comma separated)
              </label>
              <input
                type="text"
                name="bcc"
                value={emailData.bcc}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>
              <textarea
                name="body"
                value={emailData.body}
                onChange={handleChange}
                rows={10}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0F1D2F] text-white rounded hover:bg-gray-600"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
