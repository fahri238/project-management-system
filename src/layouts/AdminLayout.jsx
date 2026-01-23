import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.mainContent}>
        <Header />

        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
