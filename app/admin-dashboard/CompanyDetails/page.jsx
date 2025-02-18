'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaTrash } from 'react-icons/fa';

const InternshipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [interns, setInterns] = useState([]);
  const router = useRouter();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (indexToDelete) => {
    setInterns(interns.filter((_, index) => index !== indexToDelete));
  };

  const filteredInterns = interns.filter((intern) =>
    intern?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center">COMPANY DETAILS</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="search-section flex items-center mb-4 space-x-4 justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <input
              type="text"
              placeholder="Search Interns..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded p-2 w-1/3 h-10"
            />
            <button className="bg-[#0F1D2F] text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
              <FaSearch />
            </button>
          </div>
          <div className="flex justify-end">
            <button className="mr-4 py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600">Save</button>
            <button className="mr-4 py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600">Edit</button>
            <button
              className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
              onClick={() => router.push('/AddComForm')}
            >
              + Add Company
            </button>
          </div>
        </div>
        <div className="intern-table">
          <table className="min-w-full bg-gray-50">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 bg-gray-300">No</th>
                <th className="border px-4 py-2 bg-gray-300">Company Name</th>
                <th className="border px-4 py-2 bg-gray-300">Address</th>
                <th className="border px-4 py-2 bg-gray-300">Email</th>
                <th className="border px-4 py-2 bg-gray-300">Contact No</th>
                <th className="border px-4 py-2 bg-gray-300">Contact Person</th>
                <th className="border px-4 py-2 bg-gray-300">Note</th>
                <th className="border px-4 py-2 bg-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterns.map((intern, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{intern?.name ?? 'N/A'}</td>
                  <td>{intern?.address ?? 'N/A'}</td>
                  <td>{intern?.email ?? 'N/A'}</td>
                  <td>{intern?.phone ?? 'N/A'}</td>
                  <td>{intern?.person ?? 'N/A'}</td>
                  <td>{intern?.note ?? 'N/A'}</td>
                  <td>
                    <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InternshipDashboard;
