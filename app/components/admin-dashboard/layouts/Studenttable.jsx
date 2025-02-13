// StudentTable.jsx
import React, { useState } from 'react';


const StudentTable = () => {
  // States for search fields, sort order, and dropdown visibility
  const [searchDesignation, setSearchDesignation] = useState('');
  const [searchCompany, setSearchCompany] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Handle search button click
  const handleSearch = () => {
    // Implement search logic here
  };

  // Handle sort order change
  const handleSortChange = (order) => {
    setSortOrder(order);
    setDropdownVisible(false);
    // Implement sorting logic here
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="student-table border rounded p-4 m-2 bg-white shadow-lg">

        {/* Table title */}
      <div className="text-center font-bold text-xl text-gray-800 mb-4">
        Student details<br></br>
      </div>

      {/* Search section */}
      <div className="search-section flex items-center mb-4 space-x-4 justify-between">
        <div className="flex items-center space-x-2 flex-1">
          <label className="text-gray-700">Designation:</label>
          <input 
            type="text" 
            value={searchDesignation} 
            onChange={(e) => setSearchDesignation(e.target.value)} 
            placeholder="Search by designation" 
            className="border rounded p-2 w-full"
          />
        </div>
        <button onClick={handleSearch} className="bg-gray-800 text-white p-2 rounded">
          Search
        </button>
        <div className="flex items-center space-x-2 flex-1">
          <label className="text-gray-700">Company:</label>
          <input 
            type="text" 
            value={searchCompany} 
            onChange={(e) => setSearchCompany(e.target.value)} 
            placeholder="Search by company" 
            className="border rounded p-2 w-full"
          />
        </div>
        <button onClick={handleSearch} className="bg-gray-800 text-white p-2 rounded">
          Search
        </button>
      </div>
      
      

      {/* Student table */}
      <table className="min-w-full bg-gray-50">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 bg-gray-300">Name</th>
            <th className="border px-4 py-2 bg-gray-300">SC Number</th>
            <th className="border px-4 py-2 bg-gray-300">Designation</th>
            <th className="border px-4 py-2 bg-gray-300">Email</th>
            <th className="border px-4 py-2 bg-gray-300 relative">
              GPA
              <button onClick={toggleDropdown} className="ml-2 text-gray-600">
                <i className="fas fa-sort"></i> {/* FontAwesome sorting icon */}
              </button>
              {/* Dropdown menu */}
              {dropdownVisible && (
                <div className="absolute top-full mt-2 w-28 bg-white border rounded shadow-lg">
                  <button 
                    onClick={() => handleSortChange('asc')} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Ascending
                  </button>
                  <button 
                    onClick={() => handleSortChange('desc')} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Descending
                  </button>
                </div>
              )}
            </th>
            <th className="border px-4 py-2 bg-gray-300">Company</th>
            <th className="border px-4 py-2 bg-gray-300">CV</th>
            <th className="border px-4 py-2 bg-gray-300">Time</th>
          </tr>
        </thead>
        <tbody>
         {/* Render student rows here */}
  <tr className="bg-gray-100">
  <td className="border px-4 py-2">ABC</td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
  <td className="border px-4 py-2"></td>
</tr>
</tbody>
</table>
</div>
);
};

export default StudentTable;