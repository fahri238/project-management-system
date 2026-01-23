// src/pages/admin/Dashboard.jsx
import React from "react";
import StatCard from "../../components/ui/StatCard.jsx";
import ProjectSpotlight from "../../components/dashboard/ProjectSpotlight.jsx";

// --- PERHATIKAN 2 BARIS IMPORT INI (JANGAN SAMPAI HILANG) ---
import ReusableBarChart from "../../components/charts/ReusableBarChart.jsx";
import StatusPieChart from "../../components/charts/StatusPieChart.jsx";
import ActivityLog from "../../components/dashboard/ActivityLog.jsx";
// -----------------------------------------------------------

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  // 1. Data Statistik (StatCard)
  const stats = [
    {
      title: "Project Aktif",
      value: 40,
      trend: "meningkat dari bulan lalu",
      active: true,
    },
    {
      title: "Project Selesai",
      value: 20,
      trend: "meningkat dari bulan lalu",
      active: false,
    },
    {
      title: "Total Pengguna",
      value: 30,
      trend: "meningkat dari bulan lalu",
      active: false,
    },
    {
      title: "Eksperimen",
      value: 12,
      trend: "turun dari bulan lalu",
      active: false,
    },
  ];

  // 2. Data Grafik Batang
  const chartData = [
    { bulan: "Jan", total: 4 },
    { bulan: "Feb", total: 8 },
    { bulan: "Mar", total: 12 },
    { bulan: "Apr", total: 10 },
    { bulan: "Mei", total: 15 },
    { bulan: "Jun", total: 18 },
  ];

  return (
    <div className={styles.mainContainer}>
      {/* 1. GREETING SECTION */}
      <h2 className={styles.greeting}>
        Dashboard Admin
        <span className={styles.date}>02 - Januari - 2026</span>
      </h2>

      {/* 2. STATS GRID (4 KARTU ATAS) */}
      <section className={styles.statGrid}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            isActive={stat.active}
          />
        ))}
      </section>

      {/* 3. ANALYTICS GRID (LAYOUT UTAMA) */}
      <section className={styles.analyticsGrid}>
        {/* GRID ITEM 1: BAR CHART */}
        <div className={`${styles.card} ${styles.colSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Proyek per-Bulan</h5>
          </div>
          <div
            style={{
              flex: 1 /* Tumbuh mengisi sisa ruang */,
              minHeight: 0 /* KUNCI: Izinkan mengecil agar tidak jebol ke bawah */,
              width: "100%" /* Pastikan lebar penuh */,
              display: "flex" /* Agar Recharts container pas di tengah */,
              flexDirection: "column",
            }}
          >
            <ReusableBarChart
              data={chartData}
              xKey="bulan"
              yKey="total"
              color="#4988c4"
            />
          </div>
        </div>

        {/* GRID ITEM 2: DONUT CHART */}
        <div className={`${styles.card} ${styles.rowSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Status Proyek</h5>
          </div>
          <div style={{ flex: 1, minHeight: "250px" }}>
            {/* INI YANG TADI ERROR KARENA LUPA DI-IMPORT */}
            <StatusPieChart />
          </div>
        </div>

        {/* GRID ITEM 3: PROJECT SPOTLIGHT */}
        <div className={`${styles.card} ${styles.rowSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Proyek Terkini</h5>
          </div>
          <ProjectSpotlight />
        </div>

        {/* GRID ITEM 4: ACTIVITY LOG */}
        <div className={`${styles.card} ${styles.colSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Activity Log</h5>
          </div>

          {/* Container scrollable jika log-nya panjang */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              paddingRight: "0.5rem",
            }}
          >
            <ActivityLog />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
