"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiX, FiMail, FiTrash2 } from "react-icons/fi";

export default function MessageList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with API call
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      // Mock data
      const mockMessages = Array.from({ length: 20 }, (_, i) => ({
        id: `MSG${(i + 1).toString().padStart(3, "0")}`,
        name: `Sender ${i + 1}`,
        email: `sender${i + 1}@example.com`,
        subject: `Regarding ${
          ["Admission", "Internship", "Course", "Payment"][
            Math.floor(Math.random() * 4)
          ]
        } Inquiry`,
        message: `This is a sample message ${
          i + 1
        } regarding student inquiries or other matters. The message content would be longer in a real scenario.`,
        date: new Date(Date.now() - Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
        read: Math.random() > 0.5,
        replies:
          Math.random() > 0.7
            ? [
                {
                  id: `REP${i}1`,
                  content:
                    "We have received your inquiry and will get back to you soon.",
                  date: new Date(Date.now() - Math.random() * 604800000)
                    .toISOString()
                    .split("T")[0],
                  admin: true,
                },
              ]
            : [],
      }));
      setMessages(mockMessages);
      setIsLoading(false);
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteMessage = (messageId) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center">Loading messages...</div>
      ) : (
        <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {filteredMessages.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <li
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 ${
                    !message.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <FiMail
                          className={`mr-2 ${
                            !message.read ? "text-blue-500" : "text-gray-400"
                          }`}
                        />
                        <h3 className="text-sm font-medium text-gray-900">
                          {message.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 ml-6">
                        {message.email}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {message.date}
                    </span>
                  </div>
                  <div className="ml-6 mt-2">
                    <h4 className="text-sm font-medium text-gray-800">
                      {message.subject}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                  <div className="ml-6 mt-3 flex justify-between items-center">
                    <Link
                      href={`/admin-dashboard/messages/${message.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {message.replies.length > 0
                        ? `View conversation (${message.replies.length})`
                        : "Reply"}
                    </Link>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="text-sm text-red-600 hover:text-red-800 flex items-center"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No messages found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
