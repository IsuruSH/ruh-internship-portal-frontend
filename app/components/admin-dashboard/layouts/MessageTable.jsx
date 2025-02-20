import { useState, useEffect } from "react";
import emailjs from "emailjs-com"; // Import Email.js

const MessageTable = ({ onClose }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMessage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMessage]);

  // Sample message data with additional details
  const messages = [
    { 
      id: 1, 
      sender: "John Doe", 
      scNumber: "SC12345", 
      email: "johndoe@example.com", 
      contact: "+1234567890", 
      subject: "Internship Inquiry", 
      message: "Hello, I want to know about internship opportunities." 
    },
    { 
      id: 2, 
      sender: "Jane Smith", 
      scNumber: "SC67890", 
      email: "janesmith@example.com", 
      contact: "+0987654321", 
      subject: "Application Status", 
      message: "Hi, Can you update me on my application status?" 
    },
  ];

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  // Function to send email reply
  const handleReplySubmit = () => {
    if (!reply) {
      alert("Please enter a reply message!");
      return;
    }

    const templateParams = {
      to_name: selectedMessage.sender,
      to_email: selectedMessage.email,
      subject: `Re: ${selectedMessage.subject}`,
      message: reply,
    };

    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_PUBLIC_KEY")
      .then(() => {
        alert("Reply sent successfully!");
        setReply("");
        setSelectedMessage(null);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email.");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 relative z-50">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Sender</th>
              <th className="border p-2">Subject</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="cursor-pointer hover:bg-gray-200" onClick={() => setSelectedMessage(msg)}>
                <td className="border p-2">{msg.sender}</td>
                <td className="border p-2">{msg.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Message Details Popup */}
        {selectedMessage && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2 relative">
              <button onClick={() => setSelectedMessage(null)} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
              <h2 className="text-xl font-bold mb-4">Message Details</h2>
              <p><strong>Name:</strong> {selectedMessage.sender}</p>
              <p><strong>SC Number:</strong> {selectedMessage.scNumber}</p>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Contact Number:</strong> {selectedMessage.contact}</p>
              <p className="mb-4"><strong>Message:</strong> {selectedMessage.message}</p>

              {/* Reply Section */}
              <textarea
                className="w-full border p-2 mb-4"
                rows="3"
                placeholder="Type your reply..."
                value={reply}
                onChange={handleReplyChange}
              />
              <button onClick={handleReplySubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Send Reply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageTable;
