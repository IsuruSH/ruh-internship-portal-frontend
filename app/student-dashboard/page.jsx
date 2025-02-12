"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios";
import { useUser } from "./context/UserContext";
import UpdateStudentProfile from "../components/admin-dashboard/UpdateStudentProfile";

const Page = () => {
  const [firstLogin, setFirstLogin] = useState(null); // Start with null to prevent premature redirection
  const [student, setStudent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user?.id) return; // Ensure user is available before making API calls

    async function fetchData() {
      try {
        const response = await api.get(`/api/v1/student/${user.id}`);
        setStudent(response.data);
        setFirstLogin(response.data.first_login);

        if (!response.data.first_login) {
          router.push("/student-dashboard"); // Redirect if first_login is false
        } else {
          setIsModalOpen(true); // Open modal if first_login is true
        }
      } catch (error) {
        router.push("/pages/auth?mode=login");
      }
    }
    fetchData();
  }, [user?.id, router]); // Add dependencies

  return (
    <>
      {isModalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto ">
          <div className="bg-white p-6 rounded-lg shadow-lg my-20  ">
            <UpdateStudentProfile />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Page;
