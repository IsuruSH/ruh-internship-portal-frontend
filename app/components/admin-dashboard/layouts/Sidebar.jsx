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
  FaJournalWhills,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin-dashboard",
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
    <div
      className={`fixed h-fit top-24 left-2 bg-white text-[#0F1D2F] flex flex-col  p-4 pb-4 rounded-3xl border-2 border-[#1C3A5B] transition-all duration-300 z-10 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        {!isCollapsed && (
          <Link
            href={"/admin-dashboard"}
            className="text-xl font-bold text-center"
          >
            Dashboard
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className="text-xl p-2 rounded-lg hover:bg-[#1C3A5B] hover:text-blue-50"
        >
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      </div>
      <nav className="flex flex-col gap-3">
        {links.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 text-[#0F1D2F] text-base p-2 rounded-lg transition duration-300 ${
              (pathname === href && href === "/admin-dashboard") ||
              (pathname.startsWith(href) && href !== "/admin-dashboard")
                ? "font-bold bg-[#1C3A5B] text-blue-50"
                : "hover:bg-[#1C3A5B] hover:text-blue-50"
            }`}
            title={isCollapsed ? label : ""}
          >
            <span className="text-xl">{icon}</span>
            {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
