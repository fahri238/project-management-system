// src/components/Header.jsx
import React from "react";
import { Search, Bell, Calendar, ChevronDown, User } from "lucide-react";
import styles from "../layouts/Header.module.css";

const Header = () => {
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

      {/* 2. ACTIONS (Status & Calendar) */}
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
          <div className={styles.notification}>
            <Bell size={20} />
            {/* Dot merah notifikasi (opsional) */}
            <span className={styles.notifDot}></span>
          </div>

          <div className={styles.userInfo}>
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
