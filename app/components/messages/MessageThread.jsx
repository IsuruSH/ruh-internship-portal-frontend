"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiSend, FiTrash2 } from "react-icons/fi";

export default function MessageThread({ messageId }) {
  const [message, setMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Replace with API call
  useEffect(() => {
    const fetchMessage = async () => {
      setIsLoading(true);
      // Mock data
      const mockMessage = {
        id: messageId,
        name: `Sender ${messageId.substring(3)}`,
        email: `sender${messageId.substring(3)}@example.com`,
        subject: `Regarding ${
          ["Admission", "Internship", "Course", "Payment"][
            Math.floor(Math.random() * 4)
          ]
        } Inquiry`,
        message: `This is the detailed message content regarding the inquiry. It would contain all the details the sender provided about their question or concern.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`,
        date: new Date(Date.now() - Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
        read: true,
        replies: [
          {
            id: "REP001",
            content:
              "Thank you for your message. We have received your inquiry and will get back to you soon.",
            date: new Date(Date.now() - Math.random() * 604800000)
              .toISOString()
              .split("T")[0],
            admin: true,
          },
        ],
      };
      setMessage(mockMessage);
      setIsLoading(false);
    };

    fetchMessage();
  }, [messageId]);

  const handleSendReply = () => {
    if (replyContent.trim()) {
      const newReply = {
        id: `REP${Date.now()}`,
        content: replyContent,
        date: new Date().toISOString().split("T")[0],
        admin: true,
      };
      setMessage({
        ...message,
        replies: [...message.replies, newReply],
      });
      setReplyContent("");
    }
  };

  const deleteMessage = () => {
    // In a real app, you would call your API to delete
    alert(`Message ${messageId} deleted`);
    // Then redirect back to messages list
    window.location.href = "/admin-dashboard/messages";
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading message thread...</div>;
  }

  if (!message) {
    return <div className="p-8 text-center">Message not found</div>;
  }

  return (
    <div className="p-6 mr-3">
      <Link
        href="/admin-dashboard/messages"
        className="flex items-center text-[#0F1D2F] hover:text-[#1E3A8A] mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to Messages
      </Link>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {message.subject}
          </h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                From: <span className="font-medium">{message.name}</span> (
                {message.email})
              </p>
              <p className="text-sm text-gray-500">Received: {message.date}</p>
            </div>
            <button
              onClick={deleteMessage}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <FiTrash2 className="mr-1" /> Delete
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="whitespace-pre-line text-gray-700">
            {message.message}
          </div>
        </div>

        {message.replies.length > 0 && (
          <div className="p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Replies</h3>
            {message.replies.map((reply) => (
              <div
                key={reply.id}
                className={`p-4 rounded-lg ${
                  reply.admin
                    ? "bg-blue-50 border border-blue-100"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">
                    {reply.admin ? "Admin" : message.name}
                  </p>
                  <p className="text-sm text-gray-500">{reply.date}</p>
                </div>
                <div className="whitespace-pre-line text-gray-700">
                  {reply.content}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-6">
          <h3 className="font-medium text-gray-800 mb-3">Reply to Message</h3>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Type your reply here..."
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSendReply}
              disabled={!replyContent.trim()}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              <FiSend className="mr-2" /> Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
