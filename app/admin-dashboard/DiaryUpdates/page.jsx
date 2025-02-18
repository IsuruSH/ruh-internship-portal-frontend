'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const AnalyzePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-grow p-8 overflow-y-auto mt-16 mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">VIEW DIARY UPDATES</h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-6xl mx-auto">
        <div className="mb-6 flex items-center space-x-2">
          <label htmlFor="scNumber" className="text-base font-medium">
            SC Number:
          </label>
          <div className="flex items-center space-x-2 flex-1">
            <input
              id="scNumber"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="w-1/3 p-2 border border-gray-300 rounded pr-8"
              placeholder="Search SC Number"
            />
          
          <button className="bg-[#0F1D2F] text-white p-2 rounded-lg h-10 w-12 flex items-center justify-center hover:bg-blue-700">
            <FiSearch size={20} />
          </button>
          </div>
          <div className="flex justify-end mb-4">
          <button className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-gray-600">
            View
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default AnalyzePage;
