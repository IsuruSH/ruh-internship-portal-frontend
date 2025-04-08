import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import MessageList from "../../components/messages/MessageList";

export default function MessagesPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8 mt-10 mr-3">
        <div className="flex items-center">
          <Link
            href="/admin-dashboard" // Update this path to your actual dashboard path
            className="flex items-center text-[#0F1D2F] hover:text-[#1E3A8A] mr-4"
          >
            <FiArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white rounded-md">
            New Message
          </button>
        </div>
      </div>

      <MessageList />
    </>
  );
}
