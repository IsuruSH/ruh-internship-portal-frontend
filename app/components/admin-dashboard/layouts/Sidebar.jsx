"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    FaUser, 
    FaFolderOpen,
    FaBook,
    FaClipboard,
    FaSortNumericDown,
    FaBullhorn, 
    FaBuilding, 
    FaComments, 
    FaChalkboardTeacher, 
    FaJournalWhills } 
from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin-dashboard/",
      icon: <FaUser />,
      label: "Analyze",
    },
    {
      href: "/admin-dashboard/SelectInternship",
      icon: <FaFolderOpen />,
      label: "Select Internships",
    },
    {
      href: "/admin-dashboard/UpdateInstructions",
      icon: <FaBook />,
      label: "Update Instructions",
    },
    {
      href: "/admin-dashboard/AddInternship",
      icon: <FaClipboard />,
      label: "Add Internships",
    },
    {
      href: "/admin-dashboard/PreferenceUpdate",
      icon: <FaSortNumericDown />,
      label: "Preference Update",
    },
    {
      href: "/admin-dashboard/AddNotices",
      icon: <FaBullhorn />,
      label: "Add Notices",
    },
    {
      href: "/admin-dashboard/CompanyDetails",
      icon: <FaBuilding />,
      label: "Company Details",
    },
    {
      href: "/admin-dashboard/StudentFeedback",
      icon: <FaComments />,
      label: "Student Feedbacks",
    },
    {
        href: "/admin-dashboard/SupervisorFeedback",
        icon: <FaChalkboardTeacher />,
        label: "Supervisor Feedbacks",
    },
    {
        href: "/admin-dashboard/DiaryUpdates",
        icon: <FaJournalWhills />,
        label: "Diary Updates",
      },
  ];

  return (
    <div className="w-[250px] h-auto bg-white text-[#0F1D2F] flex flex-col overflow-y-auto p-4 pb-4 rounded-3xl ml-3 m-8 border-2 border-[#1C3A5B] fixed top-[64px]">
      <Link
        href={"/student-dashboard"}
        className="text-xl font-bold mb-4 text-center"
      >
        Dashboard
      </Link>
      <nav className="flex flex-col gap-3">
        {links.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 text-[#0F1D2F] text-base p-2 rounded-lg transition duration-300 ${
              pathname === href
                ? "font-bold bg-[#1C3A5B] text-blue-50"
                : "hover:bg-[#1C3A5B] hover:text-blue-50"
            }`}
          >
            <span className="text-xl">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
