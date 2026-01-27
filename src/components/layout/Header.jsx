import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useUser } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-16 bg-gray-950 border-b border-purple-800 flex items-center justify-between px-6">
      {/* Left */}
      <h1 className="text-lg font-semibold text-white">
        Admin Dashboard
      </h1>

      {/* Right */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg border border-purple-700 hover:bg-gray-800 transition"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-purple-700/30 flex items-center justify-center text-purple-400 font-bold">
            A
          </div>

          {/* Name + Role */}
          <div className="text-left hidden sm:block">
            <p className="text-sm text-white">Super Admin</p>
            <span className="text-xs bg-purple-700/20 text-purple-400 px-2 py-0.5 rounded">
              ADMIN
            </span>
          </div>

          <ChevronDown
            size={16}
            className="text-gray-400"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-purple-800 rounded-lg shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-purple-800">
              <p className="text-sm text-white font-medium">
                Super Admin
              </p>
              <p className="text-xs text-gray-400">
                admin@gmail.com
              </p>
            </div>

            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-purple-700/20"
              onClick={() => {
                setOpen(false);
                navigate("/admin/profile");
              }}
            >
              <User size={16} />
              Profile
            </button>


            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-purple-700/20"
            >
              <ShieldCheck size={16} />
              Admin Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
