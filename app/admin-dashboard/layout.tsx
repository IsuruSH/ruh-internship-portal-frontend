import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/admin-dashboard/layouts/Header";
import { SidebarWrapper } from "../components/admin-dashboard/layouts/SidebarWarpper";
import api from "../lib/axios";
import { UserProvider } from "../context/AdminContext";
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
  title: "Admin Dashboard",
  description: "Manage your internship process",
};

async function getUserData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  try {
    const response = await api.get("/auth/admin/verify-token", {
      headers: {
        Cookie: `token=${token}`,
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
          <SidebarWrapper>{children}</SidebarWrapper>
        </div>
      </UserProvider>
    </div>
  );
}
