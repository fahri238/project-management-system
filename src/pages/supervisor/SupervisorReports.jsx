import React, { useState, useEffect } from "react";
import { FileText, Eye, Printer, X, Download, Clock, Calendar } from "lucide-react";
import styles from "../Reports.module.css";

// IMPORT CONTROLLERS
import { ReportController } from "../../controllers/ReportController";
import { ProjectController } from "../../controllers/ProjectController";

const SupervisorReports = () => {
  // --- STATE ---
  const [reportType, setReportType] = useState("status_tugas");
  const [project, setProject] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // State Data Dinamis
  const [projectsList, setProjectsList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [previewData, setPreviewData] = useState({ headers: [], rows: [] });

  // --- LOAD DATA ---
  useEffect(() => {
    const initData = async () => {
      const pData = await ProjectController.getAllProjects();
      setProjectsList(pData);

      const hData = await ReportController.getReportHistory("supervisor");
      setHistoryList(hData);
    };
    initData();
  }, []);

  // --- GENERATE PREVIEW ---
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await ReportController.generateReportPreview(reportType, project);
      setPreviewData(data);
      setShowModal(true);
    } catch (err) {
      alert("Gagal load preview");
    } finally {
      setIsGenerating(false);
    }
  };

  const getReportTitle = () => {
    if (reportType === "status_tugas") return "Laporan Status Tugas Tim";
    if (reportType === "logbook") return "Laporan Logbook Harian Staff";
    if (reportType === "validasi") return "Laporan Riwayat Validasi & Revisi";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pusat Laporan Supervisor</h2>
        <p className={styles.subtitle}>
          Rekapitulasi aktivitas tim, logbook harian, dan validasi tugas.
        </p>
      </div>

      <div className={styles.workspace}>
        {/* PANEL KIRI */}
        <div className={styles.generatorPanel}>
          <div className={styles.panelTitle}>
            <Printer size={18} /> Generator Laporan
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Jenis Laporan</label>
            <select
              className={styles.selectInput}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="status_tugas">1. Laporan Status Tugas (To Do/Done)</option>
              <option value="logbook">2. Laporan Logbook Harian Staff</option>
              <option value="validasi">3. Laporan Riwayat Validasi</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Pilih Proyek Anda</label>
            <select
              className={styles.selectInput}
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="all">Semua Proyek Saya</option>
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
              <input type="date" className={styles.dateInput} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <span className={styles.separator}>-</span>
              <input type="date" className={styles.dateInput} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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

        {/* PANEL KANAN: HISTORY */}
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
                <div className={styles.fileIcon}><FileText size={20} /></div>
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{item.title}</span>
                  <div className={styles.fileMeta}>Generated: {item.date} • Size: {item.size}</div>
                </div>
                <button className={styles.actionBtn}><Download size={16} /></button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- MODAL PREVIEW --- */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.previewTitle}><FileText size={20} /> Preview Dokumen</div>
              <div className={styles.modalActions}>
                <button className={`${styles.modalBtn} ${styles.btnClose}`} onClick={() => setShowModal(false)}><X size={18} /> Tutup</button>
                <button className={`${styles.modalBtn} ${styles.btnPrint}`} onClick={() => alert("Printing...")}><Printer size={18} /> Cetak PDF</button>
              </div>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.pdfPaper}>
                {/* KOP SUPERVISOR */}
                <div style={{ borderBottom: "2px solid #4f46e5", paddingBottom: "15px", marginBottom: "25px" }}>
                  <h3 style={{ margin: 0, color: "#4f46e5", textTransform: "uppercase" }}>SAGARA AI - DIVISI TEKNIS</h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#64748b" }}>Laporan Internal Tim & Progres Lapangan</p>
                </div>

                <h2 style={{ textDecoration: "underline", marginBottom: "10px", fontSize: "1.4rem" }}>{getReportTitle()}</h2>
                <p style={{ fontSize: "0.9rem", marginBottom: "30px" }}>
                  Proyek: {project === "all" ? "Semua Proyek" : "Proyek Terpilih"} | Periode: {startDate || "Awal"} s/d {endDate || "Akhir"}
                </p>

                {/* TABLE DINAMIS DARI CONTROLLER */}
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ background: "#eef2ff", borderBottom: "2px solid #cbd5e1" }}>
                      {previewData.headers.map((h, i) => (
                        <th key={i} style={{ padding: "10px", border: "1px solid #e2e8f0", textAlign: "left", color: "#3730a3" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td style={{ padding: "10px", border: "1px solid #e2e8f0", textAlign: "center" }}>{rowIndex + 1}</td>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} style={{ padding: "10px", border: "1px solid #e2e8f0" }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* SIGNATURE */}
                <div style={{ marginTop: "auto", paddingTop: "50px", display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: "60px", fontSize: "0.9rem" }}>Disetujui Oleh,</p>
                    <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Supervisor Tim</p>
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