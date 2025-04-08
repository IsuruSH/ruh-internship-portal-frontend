"use client";
import { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

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
    companyName: company.name,
  });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
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

      await onSend(payload);
      setSendSuccess(true);

      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Send Email to {company.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isSending}
          >
            <FaTimes className="text-lg" />
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
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
                disabled={isSending}
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
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
                disabled={isSending}
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
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="email1@example.com, email2@example.com"
                disabled={isSending}
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
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="email1@example.com, email2@example.com"
                disabled={isSending}
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
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
                disabled={isSending}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md flex items-center justify-center min-w-[120px] transition-all ${
                sendSuccess
                  ? "bg-[#0F1D2F] text-white hover:bg-gray-600"
                  : isSending
                  ? "bg-[#153257] text-white cursor-wait"
                  : "bg-[#0F1D2F] text-white hover:bg-gray-600"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              disabled={isSending || sendSuccess}
            >
              {sendSuccess ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Sent!
                </>
              ) : isSending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
