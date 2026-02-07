import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import StaffHeader from "../components/StaffHeader";
import styles from "./SupervisorLayout.module.css"; // Reuse CSS Layout

const StaffLayout = () => {
  return (
    <div className={styles.container}>
      <StaffSidebar />
      <main className={styles.mainContent}>
        <StaffHeader />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StaffLayout;
