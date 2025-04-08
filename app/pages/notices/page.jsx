"use client";
import { FaBullhorn, FaChevronRight, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

const Notices = () => {
  const [expandedNotice, setExpandedNotice] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notices");
        setNotices(
          Array.isArray(response?.data.notices) ? response.data.notices : []
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load notices");
        console.error("Error fetching notices:", err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const toggleExpand = (id) => {
    setExpandedNotice(expandedNotice === id ? null : id);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="w-3/4 mx-auto p-6 min-h-screen">
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-2xl text-[#0F1D2F] mr-3" />
            <span className="text-gray-600">Loading notices...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="w-3/4 mx-auto p-6 min-h-screen">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="w-3/4 mx-auto p-6 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaBullhorn className="mr-2 text-[#0F1D2F]" />
            All Notices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                  notice.isImportant ? "border-[#0F1D2F]" : "border-gray-300"
                } transition-all duration-200 hover:shadow-lg`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {notice.topic || notice.title}
                    </h3>
                    {notice.expiresAt && (
                      <span className="text-xs bg-[#0F1D2F]/10 text-[#0F1D2F] px-2 py-1 rounded-full">
                        {new Date(
                          notice.expiresAt || notice.date
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div
                    className={`prose prose-sm text-gray-600 ${
                      expandedNotice === notice.id ? "" : "line-clamp-3"
                    }`}
                  >
                    {notice.content}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => toggleExpand(notice.id)}
                      className="text-sm text-[#0F1D2F] font-medium hover:underline"
                    >
                      {expandedNotice === notice.id ? "Show less" : "Read more"}
                    </button>
                    {notice.isImportant && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Important
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <FaBullhorn className="mx-auto text-3xl text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">
                  No notices available
                </h3>
                <p className="text-gray-500 mt-1">
                  Check back later for updates
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notices;
