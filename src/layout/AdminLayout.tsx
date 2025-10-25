import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../admincontexts/ThemeContext";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Products", path: "/admin/products", icon: BarChart3 },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Payments", path: "/admin/payments-history", icon: BarChart3 },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 🧱 Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 transform bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-transform duration-200 ease-in-out z-40 md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-1">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* 🧭 Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen md:ml-64">
        {/* 🧢 Topbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm sticky top-0 z-30">
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold">Admin Dashboard</h1>

          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* 📄 Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
