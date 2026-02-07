import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, AlertCircle, Users, ArrowRight } from "lucide-react";
import styles from "./SupervisorDashboard.module.css";

const SupervisorDashboard = () => {
  const navigate = useNavigate();

  // Data Dummy Statistik
  const stats = {
    totalProjects: 4,
    pendingValidations: 3, // Penting
    totalStaff: 12,
  };

  // Data Dummy Laporan Menunggu Validasi (Needs Action)
  const pendingReports = [
    {
      id: 1,
      staff: "Siti Aminah",
      task: "Cleaning Data CSV",
      date: "07 Feb 2026",
    },
    {
      id: 2,
      staff: "Andi Pratama",
      task: "Install Sensor IoT",
      date: "06 Feb 2026",
    },
    {
      id: 3,
      staff: "Eko Wijaya",
      task: "API Integration",
      date: "05 Feb 2026",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Scrollable Content Wrapper */}
      <div className={styles.dashboardContent}>
        {/* Header Dashboard */}
        <div className={styles.header}>
          <h2 className={styles.title}>Dashboard Overview</h2>
          <p className={styles.subtitle}>
            Ringkasan aktivitas proyek dan tugas tim Anda.
          </p>
        </div>

        {/* 1. STATS CARDS */}
        <div className={styles.statsGrid}>
          {/* Card 1: Proyek Aktif */}
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.blue}`}>
              <LayoutDashboard size={24} />
            </div>
            <div className={styles.statValue}>{stats.totalProjects}</div>
            <div className={styles.statLabel}>Proyek Aktif</div>
          </div>

          {/* Card 2: Menunggu Validasi (Highlight) */}
          <div className={styles.statCard} style={{ borderColor: "#fdba74" }}>
            <div className={`${styles.iconBox} ${styles.orange}`}>
              <AlertCircle size={24} />
            </div>
            <div className={styles.statValue} style={{ color: "#ea580c" }}>
              {stats.pendingValidations}
            </div>
            <div className={styles.statLabel}>Laporan Menunggu Validasi</div>
          </div>

          {/* Card 3: Total Staff */}
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.indigo}`}>
              <Users size={24} />
            </div>
            <div className={styles.statValue}>{stats.totalStaff}</div>
            <div className={styles.statLabel}>Anggota Tim</div>
          </div>
        </div>

        {/* 2. SECTION: PERLU TINDAKAN (Shortcut ke Validasi) */}
        <div style={{ marginBottom: "40px" }}>
          <h3 className={styles.sectionTitle}>
            Perlu Tindakan Anda
            {stats.pendingValidations > 0 && (
              <span className={styles.badgeCount}>
                {stats.pendingValidations} Baru
              </span>
            )}
          </h3>

          <div className={styles.actionTableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Staff</th>
                  <th>Tugas / Laporan</th>
                  <th>Tanggal Masuk</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendingReports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <strong>{report.staff}</strong>
                    </td>
                    <td>{report.task}</td>
                    <td style={{ color: "#64748b" }}>{report.date}</td>
                    <td>
                      <button
                        className={styles.btnAction}
                        onClick={() => navigate("/supervisor/validation")}
                      >
                        Validasi Sekarang ➝
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. SECTION: PROYEK TERBARU (Simple List) */}
        <div>
          <h3 className={styles.sectionTitle}>Proyek Berjalan</h3>
          <div className={styles.progressGrid}>
            <div className={styles.progressCard}>
              <h4 style={{ marginBottom: "16px", color: "#475569" }}>
                Sistem Deteksi Banjir IoT
              </h4>
              <div
                style={{
                  height: "8px",
                  background: "#f1f5f9",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "75%",
                    background: "#2563eb",
                    height: "100%",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Progress: 75% • Deadline: 20 Feb
              </p>
            </div>

            <div className={styles.progressCard}>
              <h4 style={{ marginBottom: "16px", color: "#475569" }}>
                AI Chatbot Layanan
              </h4>
              <div
                style={{
                  height: "8px",
                  background: "#f1f5f9",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    background: "#f59e0b",
                    height: "100%",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Progress: 30% • Deadline: 10 Mar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
