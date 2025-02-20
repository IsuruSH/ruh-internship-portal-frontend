import { useState } from "react";

const InternshipTable = ({ onClose }) => {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample internship data
  const interns = [
    { sc: "SC001", name: "John Doe", phone: "123-456-7890", company: "Tech Corp", designation: "Software Engineer", appointmentLetter: "appointment.pdf", startDate: "2025-03-01", endDate: "2025-09-01", supervisor: "Mr. Smith" },
    { sc: "SC002", name: "Jane Smith", phone: "987-654-3210", company: "Web Solutions", designation: "Frontend Developer", appointmentLetter: "appointment.pdf", startDate: "2025-04-15", endDate: "2025-10-15", supervisor: "Ms. Johnson" },
  ];

  // Filter interns based on SC number search
  const filteredInterns = interns.filter(intern => intern.sc.includes(searchTerm));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3/4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
        <h2 className="text-xl font-bold mb-4">Internship Selections</h2>
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
              <th className="border p-2">Company</th>
              <th className="border p-2">Designation</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.map((intern) => (
              <tr key={intern.sc} className="cursor-pointer hover:bg-gray-200" onClick={() => setSelectedIntern(intern)}>
                <td className="border p-2">{intern.sc}</td>
                <td className="border p-2">{intern.name}</td>
                <td className="border p-2">{intern.company}</td>
                <td className="border p-2">{intern.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Intern Details Popup */}
        {selectedIntern && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2 relative">
              <button onClick={() => setSelectedIntern(null)} className="absolute top-2 right-2 text-red-500 text-xl">✖</button>
              <h2 className="text-xl font-bold mb-4">Intern Details</h2>
              <p><strong>SC Number:</strong> {selectedIntern.sc}</p>
              <p><strong>Name:</strong> {selectedIntern.name}</p>
              <p><strong>Phone:</strong> {selectedIntern.phone}</p>
              <p><strong>Company:</strong> {selectedIntern.company}</p>
              <p><strong>Designation:</strong> {selectedIntern.designation}</p>
              <p><strong>Appointment Letter:</strong> <a href={selectedIntern.appointmentLetter} className="text-blue-500">Download</a></p>
              <p><strong>Start Date:</strong> {selectedIntern.startDate}</p>
              <p><strong>End Date:</strong> {selectedIntern.endDate}</p>
              <p><strong>Supervisor:</strong> {selectedIntern.supervisor}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipTable;
