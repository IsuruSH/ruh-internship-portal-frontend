import { useState } from "react";

const ShowStudentTable = ({ onClose }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample student data
  const students = [
    { sc: "SC001", name: "John Doe", address: "123 Street", gpa: 3.8, cv: "cv.pdf" },
    { sc: "SC002", name: "Jane Smith", address: "456 Avenue", gpa: 3.9, cv: "cv.pdf" },
  ];

  // Filter students based on SC number search
  const filteredStudents = students.filter(student => student.sc.includes(searchTerm));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3/4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
        <h2 className="text-xl font-bold mb-4">Registered Students</h2>
        <input
          type="text"
          placeholder="Search by SC number"
          className="border p-2 w-full mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">SC Number</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">GPA</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.sc} className="cursor-pointer hover:bg-gray-200" onClick={() => setSelectedStudent(student)}>
                <td className="border p-2">{student.sc}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Student Details Popup */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2 relative">
              <button onClick={() => setSelectedStudent(null)} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
              <h2 className="text-xl font-bold mb-4">Student Details</h2>
              <p><strong>SC Number:</strong> {selectedStudent.sc}</p>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
              <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
              <p><strong>CV:</strong> <a href={selectedStudent.cv} className="text-blue-500">Download</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowStudentTable;
