import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";

const Sidebar = () => {
  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition";

  const activeLink =
    "bg-purple-700 text-white shadow";

  const inactiveLink =
    "text-gray-300 hover:bg-purple-700/20 hover:text-white";

  return (
    <aside className="w-64 bg-gray-950 border-r border-purple-800 min-h-screen flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-5 border-b border-purple-800">
        <h2 className="text-xl font-bold text-purple-400 tracking-wide">
          ADMIN PANEL
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Store Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink
            }`
          }
        >
          <Package size={18} />
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink
            }`
          }
        >
          <ShoppingCart size={18} />
          Orders
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-purple-800 text-xs text-gray-500">
        © {new Date().getFullYear()} Gadget Dukan
      </div>
    </aside>
  );
};

export default Sidebar;
