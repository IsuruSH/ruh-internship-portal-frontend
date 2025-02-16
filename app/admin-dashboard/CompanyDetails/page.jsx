import { useState } from 'react';
import { useRouter } from 'next/router';
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

  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addIntern = (intern) => {
    setInterns([...interns, { ...intern, no: interns.length + 1 }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-grow p-8 overflow-y-auto mt-16 ml-[250px]">
          <h1 className="text-2xl font-bold mb-4 text-center">COMPANY DETAILS</h1>
          <div className="bg-slate-100 p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
            <div className="search-section flex items-center mb-4 space-x-4 justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  placeholder="Search Interns..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border rounded p-2 w-1/4 h-10"
                />
                <button onClick={handleSearch} className="bg-gray-800 text-white p-2 rounded h-10 w-auto flex items-center">
                  <FaSearch />
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  className="mr-4 py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  className="mr-4 py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
                  onClick={() => router.push('/add-company')}
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
                      <td>{intern.name}</td>
                      <td>{intern.address}</td>
                      <td>{intern.email}</td>
                      <td>{intern.phone}</td>
                      <td>{intern.person}</td>
                      <td>{intern.note}</td>
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
      </div>
    </div>
  );
};

export default InternshipDashboard;
