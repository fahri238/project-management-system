import React, { useState, useRef, useEffect } from "react";
import { User, Bell } from "lucide-react";
// Pastikan path CSS ini mengarah ke file CSS gabungan yang Anda pilih (Header.module.css)
import styles from "../layouts/Header.module.css";

const SupervisorHeader = () => {
  const user = { name: "Budi Santoso", role: "Supervisor" };
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [showNotif, setShowNotif] = useState(false);

  // 1. Buat Ref untuk mendeteksi area notifikasi
  const notifRef = useRef(null);

  // 2. Effect untuk mendeteksi klik di luar component
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Jika notifikasi terbuka DAN klik terjadi di luar elemen notifRef
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };

    // Pasang event listener saat komponen dipasang
    document.addEventListener("mousedown", handleClickOutside);

    // Bersihkan event listener saat komponen dilepas (clean up)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DATA DUMMY NOTIFIKASI
  const notifications = [
    {
      id: 1,
      title: "Laporan Baru Masuk",
      message: "Siti Aminah mengunggah laporan 'Cleaning Data'.",
      time: "5 menit yang lalu",
      isRead: false,
    },
    {
      id: 2,
      title: "Evaluasi dari Admin",
      message: "Admin memberikan catatan pada proyek 'IoT Banjir'.",
      time: "1 Jam yang lalu",
      isRead: false,
    },
    {
      id: 3,
      title: "Deadline Mendekat",
      message: "Proyek Smart Farming H-3 Deadline.",
      time: "Kemarin",
      isRead: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className={styles.header}>
      {/* Kiri */}
      <div className={styles.leftSection}>
        <div>
          <h1 className={styles.title}>Selamat Pagi, {user.name}! 👋</h1>
          <p className={styles.subtitle}>
            {user.role} Panel • {today}
          </p>
        </div>
      </div>

      {/* Kanan */}
      <div className={styles.rightSection}>
        {/* 3. Pasang ref={notifRef} pada wrapper pembungkus tombol & dropdown */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            className={styles.notifBtn}
            onClick={() => setShowNotif(!showNotif)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {/* Dropdown */}
          {showNotif && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                Notifikasi
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "normal",
                    color: "#64748b",
                  }}
                >
                  {unreadCount} Baru
                </span>
              </div>

              <div className={styles.dropdownList}>
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.notifItem} ${!item.isRead ? styles.unreadItem : ""}`}
                  >
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

export default SupervisorHeader;
