import { useState } from "react";

const MessageTable = ({ onClose }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");

  // Sample message data
  const messages = [
    { id: 1, sender: "John Doe", subject: "Internship Inquiry", message: "Hello, I want to know about internship opportunities." },
    { id: 2, sender: "Jane Smith", subject: "Application Status", message: "Hi, Can you update me on my application status?" },
  ];

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    alert(`Reply sent: ${reply}`);
    setReply("");
    setSelectedMessage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3/4 relative">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2 relative">
              <button onClick={() => setSelectedMessage(null)} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
              <h2 className="text-xl font-bold mb-4">Message Details</h2>
              <p><strong>Sender:</strong> {selectedMessage.sender}</p>
              <p><strong>Subject:</strong> {selectedMessage.subject}</p>
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
