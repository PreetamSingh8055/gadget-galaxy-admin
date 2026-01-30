import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* MOBILE SIDEBAR (overlay) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative z-50 w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
