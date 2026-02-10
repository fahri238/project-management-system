import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, AlertCircle, Users, X } from "lucide-react";
import styles from "./SupervisorDashboard.module.css";

// IMPORT COMPONENTS
import ActivityLog from "../../components/dashboard/ActivityLog";

// IMPORT CONTROLLERS
import { ProjectController } from "../../controllers/ProjectController";
import { UserController } from "../../controllers/UserController";
import { ExperimentController } from "../../controllers/ExperimentController";

const SupervisorDashboard = () => {
  const navigate = useNavigate();

  // STATE DATA
  const [stats, setStats] = useState({
    totalProjects: 0,
    pendingValidations: 0,
    totalStaff: 0,
  });

  const [pendingReports, setPendingReports] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATE MODAL STAFF
  const [showStaffModal, setShowStaffModal] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [projects, staff, experiments] = await Promise.all([
          ProjectController.getAllProjects(),
          UserController.getAllStaff(),
          ExperimentController.getAllExperiments(),
        ]);

        // 1. Filter Proyek Aktif
        const runningProjects = projects.filter(
          (p) => p.status === "Aktif" || p.status === "Active",
        );

        // 2. Filter Laporan Pending
        const pendingExps = experiments.filter(
          (e) => e.status === "Menunggu Validasi",
        );

        // 3. Set Stats & Data Utama
        setStats({
          totalProjects: runningProjects.length,
          pendingValidations: pendingExps.length,
          totalStaff: staff.length,
        });
        setActiveProjects(runningProjects);
        setStaffList(staff);

        // 4. Mapping Pending Reports
        const mappedReports = pendingExps.slice(0, 5).map((e) => ({
          id: e.id,
          staff: e.staffName,
          task: e.taskTitle || "Tugas Tanpa Judul",
          date: e.date,
        }));
        setPendingReports(mappedReports);

        // 5. GENERATE ACTIVITY LOG
        const generatedLogs = [];

        pendingExps.slice(0, 3).forEach((exp, idx) => {
          generatedLogs.push({
            id: `log-exp-${idx}`,
            type: "alert",
            message: `Staff ${exp.staffName} mengupload laporan baru: "${exp.taskTitle}"`,
            time: "Baru saja",
          });
        });

        staff.slice(-2).forEach((s, idx) => {
          generatedLogs.push({
            id: `log-staff-${idx}`,
            type: "user",
            message: `${s.name} bergabung ke dalam tim`,
            time: "1 hari yang lalu",
          });
        });

        if (generatedLogs.length === 0) {
          generatedLogs.push({
            id: "def",
            type: "system",
            message: "Sistem berjalan normal",
            time: "Saat ini",
          });
        }

        setActivityLogs(generatedLogs);
      } catch (error) {
        console.error("Gagal memuat dashboard supervisor", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
        Memuat Dashboard Supervisor...
      </div>
    );
  }

  const getProgressColor = (progress) => {
    if (progress === 100) return "#10b981";
    if (progress < 40) return "#f59e0b";
    return "#2563eb";
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboardContent}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Dashboard Overview</h2>
          <p className={styles.subtitle}>
            Ringkasan aktivitas proyek dan tugas tim Anda.
          </p>
        </div>

        {/* 1. STATS CARDS */}
        <div className={styles.statsGrid}>
          {/* Card 1: Proyek Aktif -> Ke Kelola Tugas */}
          <div
            className={styles.statCard}
            onClick={() => navigate("/supervisor/tasks")}
            style={{ cursor: "pointer" }}
          >
            <div className={`${styles.iconBox} ${styles.blue}`}>
              <LayoutDashboard size={24} />
            </div>
            <div className={styles.statValue}>{stats.totalProjects}</div>
            <div className={styles.statLabel}>Proyek Aktif ↗</div>
          </div>

          {/* Card 2: Validasi -> Ke Validasi Laporan */}
          <div
            className={styles.statCard}
            style={{ borderColor: "#fdba74", cursor: "pointer" }}
            onClick={() => navigate("/supervisor/validation")}
          >
            <div className={`${styles.iconBox} ${styles.orange}`}>
              <AlertCircle size={24} />
            </div>
            <div className={styles.statValue} style={{ color: "#ea580c" }}>
              {stats.pendingValidations}
            </div>
            <div className={styles.statLabel}>Menunggu Validasi ↗</div>
          </div>

          {/* Card 3: Staff -> Buka Modal */}
          <div
            className={styles.statCard}
            onClick={() => setShowStaffModal(true)}
            style={{ cursor: "pointer" }}
          >
            <div className={`${styles.iconBox} ${styles.indigo}`}>
              <Users size={24} />
            </div>
            <div className={styles.statValue}>{stats.totalStaff}</div>
            <div className={styles.statLabel}>Anggota Tim (Lihat)</div>
          </div>
        </div>

        {/* 2. SECTION: PERLU TINDAKAN */}
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
            {pendingReports.length > 0 ? (
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
            ) : (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontStyle: "italic",
                }}
              >
                Tidak ada laporan pending saat ini. Kerja bagus!
              </div>
            )}
          </div>
        </div>

        {/* 3. GRID BAWAH: PROYEK & AKTIVITAS */}
        <div className={styles.bottomGrid}>
          {/* KOLOM KIRI: PROYEK BERJALAN */}
          <div>
            <h3 className={styles.sectionTitle}>Proyek Berjalan</h3>
            <div className={styles.progressGrid}>
              {activeProjects.map((proj) => (
                // --- PERBAIKAN DISINI: Menambahkan onClick navigasi ---
                <div
                  key={proj.id}
                  className={styles.progressCard}
                  onClick={() => navigate("/supervisor/tasks")} // Navigasi ke Kelola Tugas
                  style={{ cursor: "pointer" }} // Visual pointer
                >
                  <h4 style={{ marginBottom: "16px", color: "#475569" }}>
                    {proj.title}
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
                        width: `${proj.progress}%`,
                        background: getProgressColor(proj.progress),
                        height: "100%",
                        borderRadius: "4px",
                        transition: "width 0.5s ease",
                      }}
                    ></div>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Progress: {proj.progress}% • Deadline:{" "}
                    {proj.deadline || "-"}
                  </p>
                </div>
              ))}
              {activeProjects.length === 0 && (
                <div style={{ color: "#94a3b8", fontStyle: "italic" }}>
                  Belum ada proyek aktif.
                </div>
              )}
            </div>
          </div>

          {/* KOLOM KANAN: ACTIVITY LOG */}
          <div>
            <h3 className={styles.sectionTitle}>Aktivitas Staff Terbaru</h3>
            <div className={styles.activityCard}>
              <ActivityLog data={activityLogs} />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DAFTAR STAFF --- */}
      {showStaffModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowStaffModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "400px" }}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Daftar Anggota Tim</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowStaffModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {staffList.map((staff) => (
                  <li
                    key={staff.user_id}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#e0e7ff",
                        color: "#4f46e5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#334155" }}>
                        {staff.name}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        @{staff.username}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorDashboard;
