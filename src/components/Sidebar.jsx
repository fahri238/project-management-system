// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  PieChart,      // Pengganti bi-pie-chart
  UserCog,       // Pengganti bi-person-gear
  ListTodo,      // Pengganti bi-list-check
  Activity,      // Pengganti bi-speedometer
  FileText,      // Pengganti bi-file-earmark
  LogOut         // Pengganti bi-box-arrow-right
} from 'lucide-react';
import styles from '../layouts/Sidebar.module.css';

const Sidebar = () => {
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <PieChart size={20}  strokeWidth={2.5}/> },
    { path: '/admin/users', name: 'Manajemen User', icon: <UserCog size={20} strokeWidth={2.5}/> },
    { path: '/admin/projects', name: 'Daftar Proyek', icon: <ListTodo size={20} strokeWidth={2.5}/> },
    { path: '/admin/monitoring', name: 'Monitoring & Evaluasi', icon: <Activity size={20} strokeWidth={2.5}/> },
    { path: '/admin/reports', name: 'Laporan Proyek', icon: <FileText size={20} strokeWidth={2.5}/> },
  ];

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
            <button className={styles.link} style={{ width: '100%', border: 'none', background: 'none' }}>
              <span className={styles.icon}><LogOut size={20} strokeWidth={2.5}/></span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;