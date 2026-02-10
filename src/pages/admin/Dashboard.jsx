// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate
import StatCard from "../../components/ui/StatCard.jsx";
import ProjectSpotlight from "../../components/dashboard/ProjectSpotlight.jsx";
import ReusableBarChart from "../../components/charts/ReusableBarChart.jsx";
import StatusPieChart from "../../components/charts/StatusPieChart.jsx";
import ActivityLog from "../../components/dashboard/ActivityLog.jsx";
import styles from "./Dashboard.module.css";

// IMPORT CONTROLLER
import { DashboardController } from "../../controllers/DashboardController";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DashboardController.getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Gagal memuat dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{padding:'40px', textAlign:'center', color:'#64748b'}}>Memuat Dashboard...</div>;
  }

  // --- LOGIC MENGAMBIL JUMLAH PENDING DARI PIE DATA ---
  // (Karena di controller sebelumnya kita simpan di pieData)
  const pendingCount = data.pieData.find(p => p.name === 'Pending')?.value || 0;

  // --- KONFIGURASI 4 STAT CARD BARU ---
  const stats = [
    {
      title: "Total Pengguna",
      value: data.stats.totalUsers,
      trend: "Kelola User ➝",
      active: true, // Highlight Biru
      onClick: () => navigate('/admin/users') // Ke Manajemen User
    },
    {
      title: "Project Aktif",
      value: data.stats.activeProjects,
      trend: "Lihat Daftar ➝",
      active: false,
      onClick: () => navigate('/admin/projects') // Ke Daftar Proyek
    },
    {
      title: "Project Selesai",
      value: data.stats.completedProjects,
      trend: "Lihat Daftar ➝",
      active: false,
      onClick: () => navigate('/admin/projects') // Ke Daftar Proyek
    },
    {
      title: "Project Pending",
      value: pendingCount,
      trend: "Lihat Daftar ➝",
      active: false,
      onClick: () => navigate('/admin/projects') // Ke Daftar Proyek
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.greeting}>
        Dashboard Admin
        <span className={styles.date}>{new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric'})}</span>
      </h2>

      {/* 2. STATS GRID */}
      <section className={styles.statGrid}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            isActive={stat.active}
            onClick={stat.onClick} // Pass fungsi klik
          />
        ))}
      </section>

      {/* 3. ANALYTICS GRID */}
      <section className={styles.analyticsGrid}>
        
        {/* Bar Chart */}
        <div className={`${styles.card} ${styles.colSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Proyek Baru (Semester Ini)</h5>
          </div>
          <div style={{ flex: 1, minHeight: 0, width: "100%", display: "flex", flexDirection: "column" }}>
            <ReusableBarChart
              data={data.chartData}
              xKey="bulan"
              yKey="total"
              color="#4988c4"
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className={`${styles.card} ${styles.rowSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Status Proyek</h5>
          </div>
          <div style={{ flex: 1, minHeight: "250px" }}>
            <StatusPieChart data={data.pieData} />
          </div>
        </div>

        {/* Project Spotlight (Panah di sini sudah diaktifkan di komponennya) */}
        <div className={`${styles.card} ${styles.rowSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Sorotan Proyek</h5>
          </div>
          <ProjectSpotlight project={data.spotlightProject} />
        </div>

        {/* Activity Log */}
        <div className={`${styles.card} ${styles.colSpan2}`}>
          <div className={styles.cardTitle}>
            <h5>Activity Log (Terbaru)</h5>
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingRight: "0.5rem" }}>
            <ActivityLog data={data.activityLog} />
          </div>
        </div>

      </section>
    </div>
  );
};

export default Dashboard;