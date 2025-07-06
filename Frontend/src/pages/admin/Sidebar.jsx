// import { useLoadUserQuery } from "@/features/api/authApi";
// import LoginedOrNot from "@/LoginedOrNot";
// import {
//   ChartNoAxesColumn,
//   GraduationCap,
//   Users
// } from "lucide-react";
// import React, { useEffect } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { data: islogin, refetch } = useLoadUserQuery();

//   useEffect(() => {
//     navigate('/admin/dashboard');
//   }, []);

//   useEffect(() => {
//     refetch();
//   }, [islogin]);

//   if (!islogin) return <LoginedOrNot />;

//   if (islogin.user.role === "student") {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
//         <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
//           <p className="text-gray-700 dark:text-gray-300 mb-6">
//             You are not authorized to access this route.
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             This area is restricted to users with different roles. Please contact the admin if you believe this is an error.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex mt-16 bg-white dark:bg-black text-gray-800 dark:text-gray-100">
//       {/* Sidebar */}
//       <div className="hidden lg:block w-[250px] sm:w-[300px] border-r border-gray-300 dark:border-gray-700 p-5 h-screen sticky top-0 bg-gray-100 dark:bg-gray-900">
//         <div className="space-y-6 mt-8">
//           <NavLink
//             to="dashboard"
//             className={({ isActive }) =>
//               `flex items-center gap-2 px-2 py-1 rounded-md transition ${
//                 isActive
//                   ? 'text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900'
//                   : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
//               }`
//             }
//           >
//             <ChartNoAxesColumn size={20} />
//             <h1>Dashboard</h1>
//           </NavLink>

//           <NavLink
//             to="course"
//             className={({ isActive }) =>
//               `flex items-center gap-2 px-2 py-1 rounded-md transition ${
//                 isActive
//                   ? 'text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900'
//                   : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
//               }`
//             }
//           >
//             <GraduationCap size={20} />
//             <h1>Courses</h1>
//           </NavLink>

//           <NavLink
//             to="users"
//             className={({ isActive }) =>
//               `flex items-center gap-2 px-2 py-1 rounded-md transition ${
//                 isActive
//                   ? 'text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900'
//                   : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
//               }`
//             }
//           >
//             <Users size={20} />
//             <h1>Users</h1>
//           </NavLink>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-6 bg-gray-50 dark:bg-[#0a0a0a] min-h-screen">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";
import LoginedOrNot from "@/LoginedOrNot";
import { Menu, X, ChartNoAxesColumn, GraduationCap, Users } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { data: islogin, refetch } = useLoadUserQuery();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);

  useEffect(() => {
    refetch();
  }, [islogin]);

  if (!islogin) return <LoginedOrNot />;

  if (islogin.user.role === "student") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You are not authorized to access this route.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This area is restricted to users with different roles.
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { to: "dashboard", label: "Dashboard", icon: <ChartNoAxesColumn size={20} /> },
    { to: "course", label: "Courses", icon: <GraduationCap size={20} /> },
    { to: "users", label: "Users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (mobile overlay) */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300 ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)}></div>

      <aside className={`fixed z-50 mt-10 left-0 h-full w-48 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:shadow-none shadow-lg`}>
        <div className="fixed mt-10 p-6 space-y-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-20 left-4 z-50 lg:hidden bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100 p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 mt-16 p-6 bg-gray-50 dark:bg-gray-800 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
