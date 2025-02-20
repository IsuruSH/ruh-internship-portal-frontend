import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const ShowStudentTable = ({ onClose }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null); // 'asc' or 'desc'

  // Dummy student data (15 students)
  const students = [
    { sc: "SC001", name: "John Doe", address: "123 Street", gpa: 3.8, cv: "cv.pdf" },
    { sc: "SC002", name: "Jane Smith", address: "456 Avenue", gpa: 3.9, cv: "cv.pdf" },
    { sc: "SC003", name: "Alice Brown", address: "789 Road", gpa: 3.5, cv: "cv.pdf" },
    { sc: "SC004", name: "Bob White", address: "101 Blvd", gpa: 3.2, cv: "cv.pdf" },
    { sc: "SC005", name: "Charlie Green", address: "202 St", gpa: 3.7, cv: "cv.pdf" },
    { sc: "SC006", name: "David Black", address: "303 Ave", gpa: 3.1, cv: "cv.pdf" },
    { sc: "SC007", name: "Emily Scott", address: "404 Lane", gpa: 4.0, cv: "cv.pdf" },
    { sc: "SC008", name: "Frank Adams", address: "505 St", gpa: 3.6, cv: "cv.pdf" },
    { sc: "SC009", name: "Grace Miller", address: "606 Blvd", gpa: 3.4, cv: "cv.pdf" },
    { sc: "SC010", name: "Henry Wilson", address: "707 Rd", gpa: 2.9, cv: "cv.pdf" },
    { sc: "SC011", name: "Ivy Thompson", address: "808 Dr", gpa: 3.3, cv: "cv.pdf" },
    { sc: "SC012", name: "Jack Lee", address: "909 Cir", gpa: 3.0, cv: "cv.pdf" },
    { sc: "SC013", name: "Karen Hill", address: "1010 Ct", gpa: 3.9, cv: "cv.pdf" },
    { sc: "SC014", name: "Leo Evans", address: "1111 Way", gpa: 3.2, cv: "cv.pdf" },
    { sc: "SC015", name: "Mona Brooks", address: "1212 Path", gpa: 3.7, cv: "cv.pdf" },
  ];

  // Filter students based on SC number search
  const filteredStudents = students.filter(student => student.sc.includes(searchTerm));

  // Sorting function
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === "asc") return a.gpa - b.gpa;
    if (sortOrder === "desc") return b.gpa - a.gpa;
    return 0;
  });

  // Toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 relative shadow-lg">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:text-red-700">✖</button>

        <h2 className="text-xl font-bold mb-4 text-center">Registered Students</h2>

        <input
          type="text"
          placeholder="Search by SC number"
          className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Scrollable Table Container */}
        <div className="overflow-y-auto max-h-80 border rounded-md shadow-sm">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border p-2 text-center">SC Number</th>
                <th className="border p-2 text-center">Name</th>
                <th
                  className="border p-2 cursor-pointer flex justify-center items-center"
                  onClick={toggleSortOrder}
                >
                  GPA
                  {sortOrder === "asc" ? <FaSortUp className="ml-2" /> : sortOrder === "desc" ? <FaSortDown className="ml-2" /> : <FaSort className="ml-2" />}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student.sc} className="cursor-pointer hover:bg-gray-200" onClick={() => setSelectedStudent(student)}>
                  <td className="border p-2 text-center">{student.sc}</td>
                  <td className="border p-2 text-center">{student.name}</td>
                  <td className="border p-2 text-center">{student.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Popup */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl mt-20">
            <button onClick={() => setSelectedStudent(null)} className="absolute top-2 right-2 text-red-500 text-2xl font-bold hover:text-red-700">✖</button>
            <h2 className="text-xl font-bold mb-4 text-center">Student Details</h2>
            <p><strong>SC Number:</strong> {selectedStudent.sc}</p>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
            <p><strong>CV:</strong> <a href={selectedStudent.cv} className="text-blue-500" download>Download</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowStudentTable;
