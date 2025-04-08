"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export function SidebarWrapper({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 pt-16 min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-28" : "ml-80"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
