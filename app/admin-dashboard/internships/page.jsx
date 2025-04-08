import InternshipList from "../../components/internships/InternshipList";
import BatchSelector from "../../components/BatchSelector";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function InternshipsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8 mt-10 mr-3">
        <Link
          href="/admin-dashboard" // Update this path to your actual dashboard path
          className="flex items-center text-[#0F1D2F] hover:text-[#1E3A8A] mr-4"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Internship Management
        </h1>
        <BatchSelector />
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Active Internships
          </h2>
          <button className="px-4 py-2 bg-[#0F1D2F] hover:bg-[#1E3A8A] text-white rounded-md ">
            Add New Internship
          </button>
        </div>
        <InternshipList />
      </div>
    </>
  );
}
