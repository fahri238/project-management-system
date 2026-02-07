import React, { useState } from "react";
import {
  FileText,
  Eye,
  Printer,
  X,
  Download,
  Clock,
  Calendar,
} from "lucide-react";
// PENTING: Import CSS Shared yang SAMA dengan Admin
import styles from "../Reports.module.css";

const SupervisorReports = () => {
  // --- STATE ---
  const [reportType, setReportType] = useState("status_tugas");
  const [project, setProject] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  // --- DATA DUMMY PROYEK (Milik Supervisor) ---
  const projects = [
    { id: 1, title: "Sistem Deteksi Banjir IoT" },
    { id: 2, title: "Smart Farming Hidroponik" },
    { id: 3, title: "Deteksi Kantuk Pengemudi" },
  ];

  // --- DATA DUMMY HISTORY (Panel Kanan) ---
  const history = [
    {
      id: 201,
      title: "Status Tugas - Minggu 1 Feb",
      date: "07 Feb 2026, 16:00",
      size: "650 KB",
      type: "PDF",
    },
    {
      id: 202,
      title: "Logbook Harian - Andi & Siti",
      date: "06 Feb 2026, 17:30",
      size: "1.2 MB",
      type: "PDF",
    },
    {
      id: 203,
      title: "Rekap Validasi Tahap 1",
      date: "01 Feb 2026, 09:15",
      size: "900 KB",
      type: "PDF",
    },
  ];

  // --- LOGIC JUDUL LAPORAN ---
  const getReportTitle = () => {
    if (reportType === "status_tugas") return "Laporan Status Tugas Tim";
    if (reportType === "logbook") return "Laporan Logbook Harian Staff";
    if (reportType === "validasi") return "Laporan Riwayat Validasi & Revisi";
  };

  // --- LOGIC HEADER TABEL ---
  const getTableHeaders = () => {
    if (reportType === "status_tugas")
      return ["No", "Nama Staff", "Judul Tugas", "Deadline", "Status"];
    if (reportType === "logbook")
      return [
        "No",
        "Tanggal",
        "Nama Staff",
        "Aktivitas / Jurnal",
        "File Bukti",
      ];
    if (reportType === "validasi")
      return ["No", "Judul Tugas", "Staff", "Status Awal", "Status Akhir"];
    return [];
  };

  // --- LOGIC ISI DATA TABEL (DUMMY) ---
  const getDummyRow = (index) => {
    if (reportType === "status_tugas") {
      const staffNames = ["Siti Aminah", "Andi Pratama", "Rina Kartika"];
      const statuses = ["Done", "In Progress", "To Do"];
      return [
        staffNames[index % 3],
        `Tugas Modul ${index}`,
        `2${index} Feb 2026`,
        statuses[index % 3],
      ];
    }
    if (reportType === "logbook") {
      return [
        `0${index} Feb 2026`,
        "Andi Pratama",
        "Melakukan soldering komponen PCB dan testing tegangan...",
        `bukti_foto_${index}.jpg`,
      ];
    }
    if (reportType === "validasi") {
      return [
        "Integrasi API Login",
        "Eko Wijaya",
        "Menunggu Validasi",
        index % 2 === 0 ? "Valid (ACC)" : "Revisi (Regex)",
      ];
    }
    return [];
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Pusat Laporan Supervisor</h2>
        <p className={styles.subtitle}>
          Rekapitulasi aktivitas tim, logbook harian, dan validasi tugas.
        </p>
      </div>

      {/* WORKSPACE (SPLIT VIEW) */}
      <div className={styles.workspace}>
        {/* --- PANEL KIRI: GENERATOR FORM --- */}
        <div className={styles.generatorPanel}>
          <div className={styles.panelTitle}>
            <Printer size={18} /> Generator Laporan
          </div>

          {/* 1. Jenis Laporan */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Jenis Laporan</label>
            <select
              className={styles.selectInput}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="status_tugas">
                1. Laporan Status Tugas (To Do/Done)
              </option>
              <option value="logbook">2. Laporan Logbook Harian Staff</option>
              <option value="validasi">3. Laporan Riwayat Validasi</option>
            </select>
          </div>

          {/* 2. Filter Proyek */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Pilih Proyek Anda</label>
            <select
              className={styles.selectInput}
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="all">Semua Proyek Saya</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Tanggal */}
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

        {/* --- PANEL KANAN: RIWAYAT / ARSIP --- */}
        <div className={styles.archivePanel}>
          <div className={styles.archiveHeader}>
            <div
              className={styles.panelTitle}
              style={{ border: 0, padding: 0 }}
            >
              <Clock size={18} /> Riwayat Cetak Terakhir
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              3 Dokumen
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

            {/* Kertas Scrollable */}
            <div className={styles.previewBody}>
              <div className={styles.pdfPaper}>
                {/* KOP SURAT (Style Khusus Supervisor - Indigo) */}
                <div
                  style={{
                    borderBottom: "2px solid #4f46e5",
                    paddingBottom: "15px",
                    marginBottom: "25px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#4f46e5",
                      textTransform: "uppercase",
                    }}
                  >
                    SAGARA AI - DIVISI TEKNIS
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "0.8rem",
                      color: "#64748b",
                    }}
                  >
                    Laporan Internal Tim & Progres Lapangan
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
                  Proyek:{" "}
                  {project === "all" ? "Semua Proyek" : "Proyek Terpilih"} |
                  Periode: {startDate || "Awal"} s/d {endDate || "Akhir"}
                </p>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.85rem",
                  }}
                >
                  <thead>
                    {/* Header Tabel Biru Muda Khas Supervisor */}
                    <tr
                      style={{
                        background: "#eef2ff",
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
                            color: "#3730a3",
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
                      Disetujui Oleh,
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      Supervisor Tim
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

export default SupervisorReports;
