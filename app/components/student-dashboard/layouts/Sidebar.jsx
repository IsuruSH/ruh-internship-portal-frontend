"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaBook,
  FaBriefcase,
  FaClipboard,
  FaSortNumericDown,
  FaInfoCircle,
  FaJournalWhills,
  FaComments,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/student-dashboard/userprofile",
      icon: <FaUser />,
      label: "User Profile",
    },
    {
      href: "/student-dashboard/instruction",
      icon: <FaBook />,
      label: "Instructions",
    },
    {
      href: "/student-dashboard/internships",
      icon: <FaBriefcase />,
      label: "Internships",
    },
    {
      href: "/student-dashboard/applynow",
      icon: <FaClipboard />,
      label: "Apply Now",
    },
    {
      href: "/student-dashboard/currstatus",
      icon: <FaSortNumericDown />,
      label: "Current Status",
    },
    {
      href: "/student-dashboard/about",
      icon: <FaInfoCircle />,
      label: "About Internship",
    },
    {
      href: "/student-dashboard/diary",
      icon: <FaJournalWhills />,
      label: "Diary Updates",
    },
    {
      href: "/student-dashboard/feedback",
      icon: <FaComments />,
      label: "Feedbacks",
    },
  ];

  return (
    <div
      className={`fixed top-24 h-fit left-2 bg-white text-[#0F1D2F] flex flex-col  p-4 pb-4 rounded-3xl border-2 border-[#1C3A5B] transition-all duration-300 z-10 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        {!isCollapsed && (
          <Link
            href={"/student-dashboard"}
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
              pathname === href
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
