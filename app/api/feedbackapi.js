import axios from "axios"; // Ensure axios is imported

// feedbackapi.js
const savefeedback = async (feedback) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URLL}api/feedback/save`,
      feedback
    );
    if (response.data === "save") {
      alert("Feedback saved successfully!");
    }
  } catch (error) {
    console.error("Error saving feedback:", error);
    alert("Failed to save feedback. Please try again.");
  }
};

export default savefeedback; // Default export
