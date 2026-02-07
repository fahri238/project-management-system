// src/components/SupervisorSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  PieChart,       // Dashboard
  ClipboardList,  // Kelola Tugas
  CheckCircle2,   // Validasi
  Printer,        // Laporan
  LogOut 
} from 'lucide-react';

// IMPORT CSS YANG SAMA DENGAN ADMIN
import styles from '../layouts/Sidebar.module.css'; 

const SupervisorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { 
      path: '/supervisor/dashboard', 
      name: 'Dashboard', 
      icon: <PieChart size={20} strokeWidth={2.5}/> 
    },
    { 
      path: '/supervisor/tasks', 
      name: 'Kelola Tugas', 
      icon: <ClipboardList size={20} strokeWidth={2.5}/> 
    },
    { 
      path: '/supervisor/validation', 
      name: 'Validasi Laporan', 
      icon: <CheckCircle2 size={20} strokeWidth={2.5}/> 
    },
    { 
      path: '/supervisor/reports', 
      name: 'Pusat Laporan', 
      icon: <Printer size={20} strokeWidth={2.5}/> 
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* LOGO */}
      <h2 className={styles.logo}>SAGARA AI</h2>
      
      {/* LABEL SUPERVISOR */}
      <p className={styles.label}>SUPERVISOR</p>

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

          {/* LOGOUT */}
          <li className={styles.logoutItem}>
            <button 
              className={styles.link} 
              style={{ width: '100%', border: 'none', background: 'none' }}
              onClick={handleLogout}
            >
              <span className={styles.icon}><LogOut size={20} strokeWidth={2.5}/></span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SupervisorSidebar;