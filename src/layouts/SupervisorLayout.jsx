// src/layouts/SupervisorLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SupervisorSidebar from "../components/SupervisorSidebar";
import SupervisorHeader from "../components/SupervisorHeader";
import styles from "./SupervisorLayout.module.css";

const SupervisorLayout = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar Tetap */}
      <SupervisorSidebar />

      <main className={styles.mainContent}>
        {/* Header Fixed (Melayang & Anti-Scrollbar Shift) */}
        <SupervisorHeader />

        {/* Konten Halaman */}
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SupervisorLayout;