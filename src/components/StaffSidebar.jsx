import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  PieChart, // Dashboard
  ListTodo, // Tugas Saya
  History, // Riwayat
  LogOut,
} from "lucide-react";

// REUSE CSS SAMA
import styles from "../layouts/Sidebar.module.css";

const StaffSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/staff/dashboard",
      name: "Dashboard",
      icon: <PieChart size={20} strokeWidth={2.5} />,
    },
    {
      path: "/staff/tasks",
      name: "Tugas Saya",
      icon: <ListTodo size={20} strokeWidth={2.5} />,
    },
    {
      path: "/staff/history",
      name: "Riwayat Laporan",
      icon: <History size={20} strokeWidth={2.5} />,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>SAGARA AI</h2>
      <p className={styles.label}>STAFF PANEL</p> {/* Label Staff */}
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

          <li className={styles.logoutItem}>
            <button
              className={styles.link}
              style={{ width: "100%", border: "none", background: "none" }}
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

export default StaffSidebar;
