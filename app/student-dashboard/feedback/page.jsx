"use client";
import { useState, useEffect } from "react";
import savefeedback from "../../api/feedbackapi.js"; 
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function Feedback() {
  const [scNumber, setScNumber] = useState("");
  const [company, setCompany] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUser();

  // Set scNumber when user is available
  useEffect(() => {
    if (user?.student_id) {
      setScNumber(user.student_id);
    }
  }, [user]);

  const feedbackData = {
    sc_number: scNumber,
    company_name: company,
    feedback: feedback,
  };

  const handleSaveChanges = async () => {
    // Validate inputs
    if (!company.trim()) {
      toast.error("Please enter company name");
      return;
    }
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Submitting feedback:", feedbackData);
      
      // Using toast.promise to handle loading, success, and error states
      await toast.promise(
        savefeedback(feedbackData),
        {
          loading: 'Saving your feedback...',
          success: 'Feedback submitted successfully!',
          error: (err) => {
            console.error("Feedback submission error:", err);
            return err.message || 'Failed to submit feedback';
          }
        }
      );
      
      // Clear form after successful submission
      setCompany("");
      setFeedback("");
    } catch (err) {
      // Error is already handled by toast.promise
      console.error("Error in handleSaveChanges:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">FEEDBACKS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <h2 className="text-lg font-normal mb-4">
          If you have completed the internship, fill this out
        </h2>
        <div className="mb-6">
          <label htmlFor="sc_no" className="block text-base font-medium mb-2">
            SC Number
          </label>
          <input
            type="text"
            id="sc_no"
            className="w-full p-2 border border-gray-300 rounded"
            value={scNumber}
            readOnly
          />
        </div>
        <div className="mb-6">
          <label htmlFor="company" className="block text-base font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            className="w-full p-2 border border-gray-300 rounded"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="feedback"
            className="block text-base font-medium mb-2"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            disabled={isSubmitting}
          ></textarea>
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSaveChanges}
            disabled={isSubmitting}
            className={`py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}