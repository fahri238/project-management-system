import React, { useState, useEffect } from "react";
import styles from "./Validation.module.css";
import { CheckCircle2, XCircle, FileText, AlertCircle } from "lucide-react"; // Opsional: Icon

// IMPORT CONTROLLER
import { ExperimentController } from "../../controllers/ExperimentController";

const Validation = () => {
  // --- STATE ---
  const [reports, setReports] = useState([]); // Data Laporan
  const [loading, setLoading] = useState(true);

  // State Modal
  const [selectedReport, setSelectedReport] = useState(null);

  // State Form Validasi
  const [validationStatus, setValidationStatus] = useState("ACC"); // Default 'ACC'
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Loading saat simpan

  // --- 1. FETCH DATA DARI CONTROLLER ---
  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await ExperimentController.getAllExperiments();
        setReports(data);
      } catch (err) {
        console.error("Gagal memuat laporan", err);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  // --- HANDLERS ---
  const handleReview = (report) => {
    setSelectedReport(report);
    setValidationStatus("ACC"); // Reset ke ACC saat buka
    setFeedback("");
  };

  const handleClose = () => {
    setSelectedReport(null);
  };

  // --- 2. SIMPAN VALIDASI KE CONTROLLER ---
  const handleSaveValidation = async () => {
    setIsSaving(true);

    // Tentukan status akhir
    const finalStatus = validationStatus === "ACC" ? "Valid" : "Revisi";

    try {
      // Panggil Controller
      const result = await ExperimentController.validateExperiment(
        selectedReport.id,
        finalStatus,
        feedback,
      );

      if (result.success) {
        // Update UI Lokal (Optimistic Update)
        const updatedReports = reports.map((r) => {
          if (r.id === selectedReport.id) {
            return { ...r, status: finalStatus };
          }
          return r;
        });

        setReports(updatedReports);
        alert(result.message);
        handleClose();
      } else {
        alert("Gagal menyimpan validasi.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper Class Badge
  const getBadgeClass = (status) => {
    if (status === "Valid") return styles.badgeValid;
    if (status === "Revisi") return styles.badgeRevisi;
    return styles.badgePending;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Validasi Laporan</h2>
        <p className={styles.subtitle}>
          Periksa hasil kerja Staff sebelum menyetujui progres proyek.
        </p>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div
            style={{ padding: "40px", textAlign: "center", color: "#64748b" }}
          >
            Memuat daftar laporan...
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Staff</th>
                <th>Judul Tugas</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "600" }}>{report.staffName}</td>
                  <td>{report.taskTitle}</td>
                  <td>{report.date}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${getBadgeClass(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>
                    {/* Tombol Review hanya muncul jika belum Valid */}
                    {report.status !== "Valid" ? (
                      <button
                        className={styles.reviewBtn}
                        onClick={() => handleReview(report)}
                      >
                        Review
                      </button>
                    ) : (
                      <span
                        style={{
                          color: "#15803d",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <CheckCircle2 size={16} /> Selesai
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- MODAL VALIDASI --- */}
      {selectedReport && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Validasi Laporan Staff</h3>
              <button className={styles.closeButton} onClick={handleClose}>
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* 1. REPORT CONTEXT */}
              <div className={styles.reportContextBox}>
                <label className={styles.reportLabel}>
                  Laporan dari:{" "}
                  <span style={{ color: "#1e293b" }}>
                    {selectedReport.staffName}
                  </span>
                </label>
                <p className={styles.reportContent}>
                  "{selectedReport.description}"
                </p>
                <button
                  className={styles.attachmentBtn}
                  onClick={() => alert("Membuka file: " + selectedReport.file)}
                >
                  <FileText size={16} /> Lihat Lampiran ({selectedReport.file})
                </button>
              </div>

              {/* 2. PILIHAN STATUS VALIDASI */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Keputusan Validasi</label>
                <div className={styles.radioGroup}>
                  {/* TERIMA (ACC) */}
                  <label
                    className={`${styles.radioItem} ${validationStatus === "ACC" ? styles.radioItemSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="validasi"
                      className={styles.radioInput}
                      checked={validationStatus === "ACC"}
                      onChange={() => setValidationStatus("ACC")}
                    />
                    <span>Terima (ACC)</span>
                  </label>

                  {/* REVISI */}
                  <label
                    className={`${styles.radioItem} ${validationStatus === "Revisi" ? styles.radioItemSelected : ""}`}
                    style={{
                      borderColor:
                        validationStatus === "Revisi" ? "#ef4444" : "",
                      backgroundColor:
                        validationStatus === "Revisi" ? "#fef2f2" : "",
                    }}
                  >
                    <input
                      type="radio"
                      name="validasi"
                      className={styles.radioInput}
                      checked={validationStatus === "Revisi"}
                      onChange={() => setValidationStatus("Revisi")}
                      style={{ accentColor: "#ef4444" }}
                    />
                    <span
                      style={{
                        color: validationStatus === "Revisi" ? "#b91c1c" : "",
                      }}
                    >
                      Perlu Revisi
                    </span>
                  </label>
                </div>
              </div>

              {/* 3. FEEDBACK SUPERVISOR */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Catatan / Feedback Supervisor
                  {validationStatus === "Revisi" && (
                    <span style={{ color: "red" }}> *</span>
                  )}
                </label>
                <textarea
                  className={styles.formTextarea}
                  rows="3"
                  placeholder={
                    validationStatus === "Revisi"
                      ? "Jelaskan bagian mana yang perlu diperbaiki..."
                      : "Berikan apresiasi atau catatan tambahan (opsional)..."
                  }
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* 4. FOOTER */}
            <div className={styles.modalFooter}>
              <button
                className={styles.saveBtn}
                onClick={handleSaveValidation}
                disabled={isSaving}
                style={{
                  opacity: isSaving ? 0.7 : 1,
                  cursor: isSaving ? "wait" : "pointer",
                }}
              >
                {isSaving ? "Menyimpan..." : "Simpan Validasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Validation;
