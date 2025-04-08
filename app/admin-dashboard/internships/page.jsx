import InternshipList from "../../components/internships/InternshipList";
import BatchSelector from "../../components/BatchSelector";

export default function InternshipsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Internship Management
        </h1>
        <BatchSelector />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Active Internships
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add New Internship
          </button>
        </div>
        <InternshipList />
      </div>
    </>
  );
}
