import React, { useState, useEffect } from "react";
import { FileText, Eye, Printer, X, Calendar, Download, Clock } from "lucide-react";
import styles from "../Reports.module.css";

// IMPORT CONTROLLERS
import { ReportController } from "../../controllers/ReportController";
import { ProjectController } from "../../controllers/ProjectController";

const AdminReports = () => {
  // --- STATE ---
  const [reportType, setReportType] = useState("rekap");
  const [project, setProject] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // Loading state

  // State Data Dinamis
  const [projectsList, setProjectsList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [previewData, setPreviewData] = useState({ headers: [], rows: [] });

  // --- 1. LOAD DATA AWAL (Projects & History) ---
  useEffect(() => {
    const initData = async () => {
      // Load Projects untuk Dropdown
      const pData = await ProjectController.getAllProjects();
      setProjectsList(pData);

      // Load History Admin
      const hData = await ReportController.getReportHistory("admin");
      setHistoryList(hData);
    };
    initData();
  }, []);

  // --- 2. GENERATE REPORT HANDLER ---
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await ReportController.generateReportPreview(reportType, project);
      setPreviewData(data);
      setShowModal(true);
    } catch (error) {
      alert("Gagal membuat laporan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getReportTitle = () => {
    if (reportType === "rekap") return "Laporan Rekapitulasi Proyek";
    if (reportType === "monev") return "Laporan Monitoring & Evaluasi";
    if (reportType === "distribusi") return "Laporan Distribusi Tim";
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

      {/* WORKSPACE */}
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
              {projectsList.map((p) => (
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
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{ opacity: isGenerating ? 0.7 : 1 }}
          >
            <Eye size={18} /> {isGenerating ? "Generating..." : "Generate Preview"}
          </button>
        </div>

        {/* PANEL KANAN: HISTORY (Dari Controller) */}
        <div className={styles.archivePanel}>
          <div className={styles.archiveHeader}>
            <div className={styles.panelTitle} style={{ border: 0, padding: 0 }}>
              <Clock size={18} /> Riwayat Cetak Terakhir
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              {historyList.length} Dokumen
            </span>
          </div>

          <ul className={styles.archiveList}>
            {historyList.map((item) => (
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
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.previewTitle}>
                <FileText size={20} /> Preview Dokumen
              </div>
              <div className={styles.modalActions}>
                <button className={`${styles.modalBtn} ${styles.btnClose}`} onClick={() => setShowModal(false)}>
                  <X size={18} /> Tutup
                </button>
                <button className={`${styles.modalBtn} ${styles.btnPrint}`} onClick={() => alert("Printing...")}>
                  <Printer size={18} /> Cetak PDF
                </button>
              </div>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.pdfPaper}>
                {/* KOP */}
                <div style={{ borderBottom: "2px solid #1e293b", paddingBottom: "15px", marginBottom: "25px" }}>
                  <h3 style={{ margin: 0, color: "#1e293b", textTransform: "uppercase" }}>
                    SAGARA AI SYSTEM
                  </h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#64748b" }}>
                    Dokumen Resmi Manajemen Proyek
                  </p>
                </div>

                {/* CONTENT */}
                <h2 style={{ textDecoration: "underline", marginBottom: "10px", fontSize: "1.4rem" }}>
                  {getReportTitle()}
                </h2>
                <p style={{ fontSize: "0.9rem", marginBottom: "30px" }}>
                  Periode: {startDate || "-"} s/d {endDate || "-"} | Filter: {project === "all" ? "Semua Data" : "Data Terpilih"}
                </p>

                {/* TABLE DARI PREVIEW DATA (Controller) */}
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                      {previewData.headers.map((h, i) => (
                        <th key={i} style={{ padding: "10px", border: "1px solid #e2e8f0", textAlign: "left" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td style={{ padding: "10px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                          {rowIndex + 1}
                        </td>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} style={{ padding: "10px", border: "1px solid #e2e8f0" }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* SIGNATURE */}
                <div style={{ marginTop: "auto", paddingTop: "50px", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: "60px", fontSize: "0.9rem" }}>Mengetahui, Administrator</p>
                    <p style={{ fontWeight: "bold", textDecoration: "underline" }}>System Admin</p>
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