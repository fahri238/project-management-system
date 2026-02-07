import React, { useState, useRef, useEffect } from "react";
import { User, Bell } from "lucide-react";
// Import CSS Shared yang SAMA
import styles from "../layouts/Header.module.css"; 

const StaffHeader = () => {
  const user = { name: "Rina Kartika", role: "Frontend Dev" };
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  // Logic: Klik di luar untuk menutup notifikasi
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

  // DATA DUMMY NOTIFIKASI (STAFF: Dpt dari Supervisor)
  const notifications = [
    {
      id: 1,
      title: "Tugas Baru!",
      message: "Anda ditugaskan di 'Slicing Landing Page'.",
      time: "Baru saja",
      isRead: false,
    },
    {
      id: 2,
      title: "Laporan Perlu Revisi",
      message: "Laporan tgl 05 Feb dikembalikan oleh Supervisor.",
      time: "30 menit yang lalu",
      isRead: false,
    },
    {
      id: 3,
      title: "Laporan Di-ACC",
      message: "Laporan Integrasi API telah divalidasi.",
      time: "2 Jam yang lalu",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className={styles.header}>
      {/* Kiri: Greeting */}
      <div className={styles.leftSection}>
        <div>
            <h1 className={styles.title}>Halo, {user.name}! 🚀</h1>
            <p className={styles.subtitle}>{user.role} • {today}</p>
        </div>
      </div>

      {/* Kanan: Notifikasi & Profil */}
      <div className={styles.rightSection}>
        
        {/* Notifikasi Wrapper dengan Ref */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button 
            className={styles.notifBtn} 
            onClick={() => setShowNotif(!showNotif)}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                Notifikasi
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
                    {/* Dot Indikator Unread */}
                    {!item.isRead && <div className={styles.itemIcon}></div>}
                    
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

        {/* Profil */}
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <User size={20} strokeWidth={2.5} />
          </div>
        </div>

      </div>
    </header>
  );
};

export default StaffHeader;