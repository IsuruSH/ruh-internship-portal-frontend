import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/student-dashboard/layouts/Header";
import Sidebar from "../components/student-dashboard/layouts/Sidebar";
import api from "../lib/axios";
import { UserProvider } from "../context/UserContext";
import { cookies } from "next/headers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Manage your internship process",
};

async function getUserData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const response = await api.get("/auth/student/verify-token", {
      headers: {
        Cookie: `token=${token}`, // Send token in the Cookie header
      },
    });

    return response.data.user;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData();

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <UserProvider user={user}>
        <div className="min-h-screen">
          <Header />
          <Sidebar />
          <main className="pt-16 pl-64 p-8 min-h-screen">{children}</main>
        </div>
      </UserProvider>
    </div>
  );
}
