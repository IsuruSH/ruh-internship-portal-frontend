"use client";
import Link from "next/link";
import { FiUsers, FiMail, FiBriefcase, FiArrowRight } from "react-icons/fi";
import api from "../lib/axios";
import { useEffect, useState } from "react";

export default function OverviewCards(batch) {
  const [stats, setStats] = useState([
    {
      title: "Registered Students",
      value: "Loading...",
      icon: FiUsers,
      link: "/admin-dashboard/students",
    },
    {
      title: "New Messages",
      value: "Loading...",
      icon: FiMail,
      link: "/admin-dashboard/messages",
    },
    {
      title: "Active Internships",
      value: "Loading...",
      icon: FiBriefcase,
      link: "/admin-dashboard/internships",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const res = await api.get(`/stats/dashboardcount`, {
          params: batch, // optional batch filtering
        });

        const data = res.data;
        console.log("Fetched data:", data.studentsCount);

        setStats([
          {
            title: "Registered Students",
            value: data.studentsCount.toLocaleString(),
            icon: FiUsers,
            link: "/admin-dashboard/students",
          },
          {
            title: "New Messages",
            value: data.messagesCount.toLocaleString(),
            icon: FiMail,
            link: "/admin-dashboard/messages",
          },
          {
            title: "Active Internships",
            value: data.internshipsCount.toLocaleString(),
            icon: FiBriefcase,
            link: "/admin-dashboard/internships",
          },
        ]);
      } catch (error) {
        console.log("Error fetching stats:", error);
        setStats([
          { ...stats[0], value: "N/A" },
          { ...stats[1], value: "N/A" },
          { ...stats[2], value: "N/A" },
        ]);
      }
    };

    fetchData();
  }, [batch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Link
          key={stat.title}
          href={stat.link}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <stat.icon size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            View details <FiArrowRight className="ml-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}
