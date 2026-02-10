// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  PieChart,
  UserCog,
  ListTodo,
  Activity,
  FileText,
  LogOut,
} from "lucide-react";
import styles from "../layouts/Sidebar.module.css";

// 1. IMPORT LOGIN CONTROLLER
import { LoginController } from "../controllers/LoginController";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <PieChart size={20} strokeWidth={2.5} />,
    },
    {
      path: "/admin/users",
      name: "Manajemen User",
      icon: <UserCog size={20} strokeWidth={2.5} />,
    },
    {
      path: "/admin/projects",
      name: "Daftar Proyek",
      icon: <ListTodo size={20} strokeWidth={2.5} />,
    },
    {
      path: "/admin/monitoring",
      name: "Monitoring & Evaluasi",
      icon: <Activity size={20} strokeWidth={2.5} />,
    },
    {
      path: "/admin/reports",
      name: "Laporan Proyek",
      icon: <FileText size={20} strokeWidth={2.5} />,
    },
  ];

  // 2. FUNGSI HANDLE LOGOUT
  const handleLogout = () => {
    // Tambahkan konfirmasi agar user tidak tidak sengaja ter-logout
    if (window.confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      LoginController.logout();
      // LoginController akan menghapus session dan redirect ke halaman login
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* LOGO */}
      <h2 className={styles.logo}>SAGARA AI</h2>

      {/* LABEL MENU */}
      <p className={styles.label}>MENU</p>

      {/* NAVIGASI */}
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* LOGOUT (Item Terakhir) */}
          <li className={styles.logoutItem}>
            {/* 3. PASANG EVENT ONCLICK DISINI */}
            <button
              className={styles.link}
              style={{
                width: "100%",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              <span className={styles.icon}>
                <LogOut size={20} strokeWidth={2.5} />
              </span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
