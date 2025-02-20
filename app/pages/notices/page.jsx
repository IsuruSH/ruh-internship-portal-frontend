import React from "react";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";


const notices = [
  { id: 1, title: "Exam Schedule Released", date: "2025-02-20", content: "The final exam schedule has been published. Check the university portal for details." },
  { id: 2, title: "Holiday Announcement", date: "2025-02-18", content: "The university will remain closed on February 25th due to a public holiday." },
  { id: 3, title: "Project Submission Deadline", date: "2025-02-15", content: "All final year project reports must be submitted by March 5th, 2025." },
  { id: 4, title: "Library Renovation", date: "2025-02-10", content: "The library will be under renovation from March 1st to March 15th. Limited access will be available." },
  { id: 5, title: "Internship Opportunities", date: "2025-02-05", content: "New internship opportunities are available for final year students. Visit the placement cell for more details." },
  { id: 6, title: "Sports Meet Registration", date: "2025-02-01", content: "Registrations for the annual sports meet are now open. Deadline: February 28th." }
];

const Notices = () => {
  return (
    <>
    <Header />
    <div className="w-3/4 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Notices</h2>
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold">{notice.title}</h3>
            <p className="text-sm text-gray-500">{notice.date}</p>
            <p className="mt-2 text-gray-700">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Notices;
