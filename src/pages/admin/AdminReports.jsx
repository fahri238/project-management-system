import React, { useState } from "react";
import {
  FileText,
  Eye,
  Printer,
  X,
  Calendar,
  Download,
  Clock,
} from "lucide-react";
import styles from "../Reports.module.css";

const AdminReports = () => {
  // State
  const [reportType, setReportType] = useState("rekap");
  const [project, setProject] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Data Dummy Proyek
  const projects = [
    { id: 1, title: "Sistem Deteksi Banjir IoT" },
    { id: 2, title: "AI Chatbot Layanan Publik" },
    { id: 3, title: "Computer Vision Absensi" },
  ];

  // Data Dummy History (Agar Panel Kanan Tidak Kosong)
  const history = [
    {
      id: 101,
      title: "Laporan Rekapitulasi - Januari",
      date: "01 Feb 2026, 09:00",
      size: "1.2 MB",
      type: "PDF",
    },
    {
      id: 102,
      title: "Hasil Monev - Sistem Banjir",
      date: "30 Jan 2026, 14:30",
      size: "850 KB",
      type: "PDF",
    },
    {
      id: 103,
      title: "Distribusi Tim Q1 2026",
      date: "15 Jan 2026, 10:15",
      size: "2.4 MB",
      type: "PDF",
    },
    {
      id: 104,
      title: "Laporan Akhir Tahun 2025",
      date: "31 Dec 2025, 16:45",
      size: "5.0 MB",
      type: "ZIP",
    },
  ];

  // Logic Content Table Preview
  const getReportTitle = () => {
    if (reportType === "rekap") return "Laporan Rekapitulasi Proyek";
    if (reportType === "monev") return "Laporan Monitoring & Evaluasi";
    if (reportType === "distribusi") return "Laporan Distribusi Tim";
  };

  const getTableHeaders = () => {
    if (reportType === "rekap")
      return ["No", "Nama Proyek", "Supervisor", "Status", "Progress"];
    if (reportType === "monev")
      return ["No", "Proyek", "Tanggal Evaluasi", "Komentar Admin", "Status"];
    if (reportType === "distribusi")
      return ["No", "Proyek", "Supervisor", "Jumlah Staff", "Divisi"];
    return [];
  };

  const getDummyRow = (index) => {
    if (reportType === "rekap")
      return [
        `Proyek ${index}`,
        "Haldi Budiman",
        index % 2 === 0 ? "Aktif" : "Selesai",
        `${60 + index * 5}%`,
      ];
    if (reportType === "monev")
      return [
        `Proyek ${index}`,
        `2026-02-0${index}`,
        "Perlu percepatan testing...",
        "Pending",
      ];
    if (reportType === "distribusi")
      return [`Proyek ${index}`, "Fahri Ilmi", "4 Orang", "Frontend, IoT"];
    return [];
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Laporan & Arsip Admin</h2>
        <p className={styles.subtitle}>
          Cetak laporan manajerial dan akses arsip dokumen lama.
        </p>
      </div>

      {/* WORKSPACE (SPLIT VIEW) */}
      <div className={styles.workspace}>
        {/* PANEL KIRI: GENERATOR */}
        <div className={styles.generatorPanel}>
          <div className={styles.panelTitle}>
            <Printer size={18} /> Generator Laporan Baru
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Jenis Laporan</label>
            <select
              className={styles.selectInput}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="rekap">1. Laporan Rekapitulasi Proyek</option>
              <option value="monev">2. Laporan Monitoring & Evaluasi</option>
              <option value="distribusi">3. Laporan Distribusi Tim</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Filter Proyek</label>
            <select
              className={styles.selectInput}
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="all">Semua Proyek</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Periode Laporan</label>
            <div className={styles.dateRange}>
              <input
                type="date"
                className={styles.dateInput}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className={styles.separator}>-</span>
              <input
                type="date"
                className={styles.dateInput}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button
            className={styles.btnPrimary}
            onClick={() => setShowModal(true)}
          >
            <Eye size={18} /> Generate Preview
          </button>
        </div>

        {/* PANEL KANAN: HISTORY / ARCHIVE (Pengisi Ruang Kosong) */}
        <div className={styles.archivePanel}>
          <div className={styles.archiveHeader}>
            <div
              className={styles.panelTitle}
              style={{ border: 0, padding: 0 }}
            >
              <Clock size={18} /> Riwayat Cetak Terakhir
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              4 Dokumen
            </span>
          </div>

          <ul className={styles.archiveList}>
            {history.map((item) => (
              <li key={item.id} className={styles.archiveItem}>
                <div className={styles.fileIcon}>
                  <FileText size={20} />
                </div>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{item.title}</span>
                  <div className={styles.fileMeta}>
                    Generated: {item.date} • Size: {item.size}
                  </div>
                </div>
                <button className={styles.actionBtn} title="Download Ulang">
                  <Download size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- MODAL PREVIEW OVERLAY --- */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toolbar */}
            <div className={styles.modalHeader}>
              <div className={styles.previewTitle}>
                <FileText size={20} /> Preview Dokumen
              </div>
              <div className={styles.modalActions}>
                <button
                  className={`${styles.modalBtn} ${styles.btnClose}`}
                  onClick={() => setShowModal(false)}
                >
                  <X size={18} /> Tutup
                </button>
                <button
                  className={`${styles.modalBtn} ${styles.btnPrint}`}
                  onClick={() => alert("Printing...")}
                >
                  <Printer size={18} /> Cetak PDF
                </button>
              </div>
            </div>

            {/* Kertas A4 Scrollable */}
            <div className={styles.previewBody}>
              <div className={styles.pdfPaper}>
                {/* KOP */}
                <div
                  style={{
                    borderBottom: "2px solid #1e293b",
                    paddingBottom: "15px",
                    marginBottom: "25px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#1e293b",
                      textTransform: "uppercase",
                    }}
                  >
                    SAGARA AI SYSTEM
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "0.8rem",
                      color: "#64748b",
                    }}
                  >
                    Dokumen Resmi Manajemen Proyek
                  </p>
                </div>

                {/* CONTENT */}
                <h2
                  style={{
                    textDecoration: "underline",
                    marginBottom: "10px",
                    fontSize: "1.4rem",
                  }}
                >
                  {getReportTitle()}
                </h2>
                <p style={{ fontSize: "0.9rem", marginBottom: "30px" }}>
                  Periode: {startDate || "-"} s/d {endDate || "-"} | Filter:{" "}
                  {project === "all" ? "Semua Data" : "Data Terpilih"}
                </p>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.85rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f1f5f9",
                        borderBottom: "2px solid #cbd5e1",
                      }}
                    >
                      {getTableHeaders().map((h, i) => (
                        <th
                          key={i}
                          style={{
                            padding: "10px",
                            border: "1px solid #e2e8f0",
                            textAlign: "left",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item}>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #e2e8f0",
                            textAlign: "center",
                          }}
                        >
                          {item}
                        </td>
                        {getDummyRow(item).map((val, idx) => (
                          <td
                            key={idx}
                            style={{
                              padding: "10px",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* SIGNATURE */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "50px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: "60px", fontSize: "0.9rem" }}>
                      Mengetahui, Administrator
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      System Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
