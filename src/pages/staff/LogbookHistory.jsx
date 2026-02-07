import React, { useState } from "react";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  PieChart,
} from "lucide-react";
import styles from "../admin/DetailMonitoring.module.css"; // Reuse CSS Table/Modal

const LogbookHistory = () => {
  // Data Riwayat
  const logs = [
    {
      id: 1,
      date: "07 Feb 2026",
      task: "Slicing Dashboard",
      file: "dashboard_v1.zip",
      status: "Pending",
      comment: "-",
    },
    {
      id: 2,
      date: "05 Feb 2026",
      task: "Setup Repo GitHub",
      file: "repo_link.txt",
      status: "Revisi",
      comment:
        "Struktur folder belum sesuai standar perusahaan. Tolong perbaiki folder /assets.",
    },
    {
      id: 3,
      date: "04 Feb 2026",
      task: "Instalasi Environment",
      file: "screenshot_env.png",
      status: "Valid",
      comment: "Oke, mantap.",
    },
    // Tambahan data untuk visualisasi summary
    {
      id: 4,
      date: "03 Feb 2026",
      task: "Database Schema",
      file: "db.sql",
      status: "Valid",
      comment: "Good job.",
    },
    {
      id: 5,
      date: "02 Feb 2026",
      task: "API Login",
      file: "api.json",
      status: "Valid",
      comment: "Oke.",
    },
  ];

  // Logic Hitung Summary
  const totalReports = logs.length;
  const totalValid = logs.filter((l) => l.status === "Valid").length;
  const totalRevisi = logs.filter((l) => l.status === "Revisi").length;
  const totalPending = logs.filter((l) => l.status === "Pending").length;

  // State Modal Revisi
  const [revisionData, setRevisionData] = useState(null);

  const getBadgeStyle = (status) => {
    if (status === "Valid")
      return {
        background: "#f0fdf4",
        color: "#15803d",
        border: "1px solid #dcfce7",
      };
    if (status === "Revisi")
      return {
        background: "#fef2f2",
        color: "#b91c1c",
        border: "1px solid #fee2e2",
      };
    return {
      background: "#fff7ed",
      color: "#c2410c",
      border: "1px solid #ffedd5",
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Riwayat Laporan</h2>
        <p className={styles.subtitle}>
          Pantau status validasi laporan yang sudah dikirim.
        </p>
      </div>

      {/* --- SUMMARY SECTION (BARU) --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {/* Card 1: Total */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              background: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563eb",
            }}
          >
            <FileText size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                lineHeight: "1",
              }}
            >
              {totalReports}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}
            >
              Total Laporan
            </div>
          </div>
        </div>

        {/* Card 2: Valid (ACC) */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              background: "#f0fdf4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16a34a",
            }}
          >
            <CheckCircle size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                lineHeight: "1",
              }}
            >
              {totalValid}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}
            >
              Diterima (ACC)
            </div>
          </div>
        </div>

        {/* Card 3: Revisi */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              background: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#dc2626",
            }}
          >
            <AlertCircle size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                lineHeight: "1",
              }}
            >
              {totalRevisi}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}
            >
              Perlu Revisi
            </div>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "10px",
              background: "#fff7ed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ea580c",
            }}
          >
            <Clock size={24} />
          </div>
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#1e293b",
                lineHeight: "1",
              }}
            >
              {totalPending}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}
            >
              Menunggu Validasi
            </div>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div
        style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                Tanggal
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                Judul Tugas
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                File
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  color: "#64748b",
                }}
              >
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px", color: "#334155" }}>
                  {log.date}
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "600",
                    color: "#1e293b",
                  }}
                >
                  {log.task}
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#2563eb",
                    cursor: "pointer",
                  }}
                >
                  📎 {log.file}
                </td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      ...getBadgeStyle(log.status),
                    }}
                  >
                    {log.status}
                  </span>
                </td>
                <td style={{ padding: "16px" }}>
                  {log.status === "Revisi" ? (
                    <button
                      onClick={() => setRevisionData(log)}
                      style={{
                        background: "white",
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <AlertCircle size={14} /> Lihat Revisi
                    </button>
                  ) : (
                    <span style={{ color: "#94a3b8" }}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL LIHAT REVISI (Sama seperti sebelumnya) */}
      {revisionData && (
        <div
          className={styles.modalOverlay}
          onClick={() => setRevisionData(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "500px" }}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle} style={{ color: "#ef4444" }}>
                Catatan Revisi Supervisor
              </h3>
              <button
                className={styles.closeBtn}
                onClick={() => setRevisionData(null)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  marginBottom: "10px",
                }}
              >
                Untuk Tugas: <strong>{revisionData.task}</strong>
              </p>
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fee2e2",
                  padding: "15px",
                  borderRadius: "8px",
                  color: "#7f1d1d",
                  lineHeight: "1.5",
                }}
              >
                "{revisionData.comment}"
              </div>
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button
                  className={styles.submitBtn}
                  onClick={() => setRevisionData(null)}
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogbookHistory;
  