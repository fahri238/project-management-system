import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Calendar, ChevronDown, User, AlertTriangle, CheckCircle, Info } from "lucide-react";
// Import CSS Shared
import styles from "../layouts/Header.module.css";

const Header = () => {
  const [showNotif, setShowNotif] = useState(false);
  
  // 1. Buat Ref untuk wrapper notifikasi
  const notifRef = useRef(null);

  // 2. Logic: Tutup notifikasi jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DATA DUMMY NOTIFIKASI (ADMIN)
  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Deadline Proyek Mendekat",
      message: "Proyek 'Smart Farming IoT' H-3 deadline.",
      time: "2 Jam yang lalu",
      isRead: false,
    },
    {
      id: 2,
      type: "success",
      title: "Proyek Selesai",
      message: "Proyek 'Sistem Absensi' mencapai progress 100%.",
      time: "Kemarin",
      isRead: true,
    },
    {
      id: 3,
      type: "info",
      title: "Laporan Baru",
      message: "Supervisor mengunggah Laporan Bulanan.",
      time: "Kemarin",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Helper Icon
  const getIcon = (type) => {
    if (type === "warning") return <AlertTriangle size={16} />;
    if (type === "success") return <CheckCircle size={16} />;
    return <Info size={16} />;
  };

  const getIconClass = (type) => {
    if (type === "warning") return styles.iconWarning;
    if (type === "success") return styles.iconSuccess;
    return styles.iconInfo; // Default (Blue)
  };

  return (
    <header className={styles.header}>
      {/* 1. SEARCH BAR */}
      <div className={styles.searchContainer}>
        <input
          type="search"
          placeholder="Search Proyek"
          className={styles.searchInput}
        />
        <button className={styles.searchBtn}>
          <Search size={18} />
        </button>
      </div>

      {/* 2. ACTIONS */}
      <div className={styles.actionGroup}>
        <div className={styles.actionItem}>
          <span>Status Proyek</span>
          <ChevronDown size={16} />
        </div>
        <div className={styles.actionItem}>
          <span>Kalender</span>
          <Calendar size={16} />
        </div>
        
        <div className={styles.userProfile}>
          
          {/* NOTIFIKASI DROPDOWN (Pasang Ref disini) */}
          <div className={styles.notifWrapper} ref={notifRef}>
            <div 
              className={styles.notifBtn} 
              onClick={() => setShowNotif(!showNotif)}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
            </div>

            {showNotif && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  Notifikasi Sistem
                  <span style={{fontSize:'0.75rem', fontWeight:'normal', color:'#64748b'}}>
                    {unreadCount} Baru
                  </span>
                </div>
                
                <div className={styles.dropdownList}>
                  {notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className={`${styles.notifItem} ${!item.isRead ? styles.unreadItem : ''}`}
                    >
                      <div className={`${styles.itemIcon} ${getIconClass(item.type)}`}>
                        {getIcon(item.type)}
                      </div>
                      <div className={styles.itemContent}>
                        <strong>{item.title}</strong>
                        <p>{item.message}</p>
                        <span className={styles.itemTime}>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.dropdownFooter}>
                  Lihat Semua Notifikasi
                </div>
              </div>
            )}
          </div>

          {/* USER INFO */}
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <User size={24} />
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>Fahri Ilmi</p>
              <span className={styles.userEmail}>fahrilmi25@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;