import React, { useState } from "react";
import styles from "./Validation.module.css";

const Validation = () => {
  // Data Dummy
  const [reports, setReports] = useState([
    {
      id: 1,
      staffName: "Siti Aminah",
      taskTitle: "Cleaning Data Curah Hujan",
      date: "07 Feb 2026",
      description:
        "Saya telah membersihkan data null dan duplikat menggunakan Pandas. File CSV hasil cleaning terlampir.",
      file: "cleaning_result_v1.csv",
      status: "Menunggu Validasi",
    },
    {
      id: 2,
      staffName: "Andi Pratama",
      taskTitle: "Setup Sensor Ultrasonik",
      date: "06 Feb 2026",
      description:
        "Sensor telah dipasang di pin D4 dan D5. Dokumentasi terlampir.",
      file: "dokumentasi_sensor.pdf",
      status: "Menunggu Validasi",
    },
    {
      id: 3,
      staffName: "Eko Wijaya",
      taskTitle: "Integrasi API Authentication",
      date: "06 Feb 2026",
      description: "Endpoint login dan register sudah terhubung dengan JWT. Token berhasil disimpan di localStorage.",
      file: "auth_integration_report.pdf",
      status: "Menunggu Validasi",
    },
    {
      id: 4,
      staffName: "Rina Kartika",
      taskTitle: "Desain Wireframe Dashboard",
      date: "05 Feb 2026",
      description: "Revisi desain dashboard admin sesuai feedback minggu lalu. Warna sudah disesuaikan dengan palet perusahaan.",
      file: "wireframe_v2.fig",
      status: "Revisi",
    },
    {
      id: 5,
      staffName: "Budi Santoso",
      taskTitle: "Kalibrasi Sensor Suhu",
      date: "05 Feb 2026",
      description: "Melakukan kalibrasi ulang pada sensor DHT11 karena pembacaan sempat error. Sekarang deviasi sudah di bawah 1%.",
      file: "kalibrasi_log.xlsx",
      status: "Menunggu Validasi",
    },
    {
      id: 6,
      staffName: "Siti Aminah",
      taskTitle: "Training Model Deteksi Wajah",
      date: "04 Feb 2026",
      description: "Model YOLOv8 telah dilatih selama 100 epoch. Akurasi mAP mencapai 85%. Grafik loss terlampir.",
      file: "training_metrics.png",
      status: "Menunggu Validasi",
    },
    {
      id: 7,
      staffName: "Reza Rahardian",
      taskTitle: "Konfigurasi Docker Container",
      date: "04 Feb 2026",
      description: "Docker Compose untuk environment development sudah siap (Node.js + PostgreSQL + Redis).",
      file: "docker-compose.yml",
      status: "Valid",
    },
    {
      id: 8,
      staffName: "Maya Sari",
      taskTitle: "Testing Skenario Checkout",
      date: "04 Feb 2026",
      description: "Menemukan bug saat user melakukan pembayaran dengan e-wallet. Laporan bug detail ada di dokumen.",
      file: "bug_report_checkout.docx",
      status: "Menunggu Validasi",
    },
    {
      id: 9,
      staffName: "Andi Pratama",
      taskTitle: "Solder PCB NodeMCU",
      date: "03 Feb 2026",
      description: "Perakitan 5 unit device IoT untuk titik pantau A sampai E telah selesai disolder.",
      file: "foto_perakitan.zip",
      status: "Menunggu Validasi",
    },
    {
      id: 10,
      staffName: "Dedi Kurniawan",
      taskTitle: "Slicing Halaman Landing Page",
      date: "03 Feb 2026",
      description: "Konversi desain Figma ke React.js selesai. Responsif untuk mobile dan desktop.",
      file: "screenshot_landing.jpg",
      status: "Valid",
    },
    {
      id: 11,
      staffName: "Eko Wijaya",
      taskTitle: "Optimasi Query Database",
      date: "02 Feb 2026",
      description: "Menambahkan indexing pada tabel 'Transactions'. Waktu load data berkurang dari 2s menjadi 200ms.",
      file: "query_analysis.sql",
      status: "Menunggu Validasi",
    },
    {
      id: 12,
      staffName: "Rina Kartika",
      taskTitle: "User Research Interview",
      date: "02 Feb 2026",
      description: "Hasil wawancara dengan 5 responden terkait fitur baru. Rangkuman insight user terlampir.",
      file: "user_research_summary.pdf",
      status: "Menunggu Validasi",
    },
    {
      id: 13,
      staffName: "Siti Aminah",
      taskTitle: "Augmentasi Data Gambar",
      date: "01 Feb 2026",
      description: "Menambahkan variasi rotasi dan brightness pada dataset untuk mencegah overfitting.",
      file: "dataset_sample.zip",
      status: "Revisi",
    },
    {
      id: 14,
      staffName: "Reza Rahardian",
      taskTitle: "Setup CI/CD Pipeline",
      date: "01 Feb 2026",
      description: "GitHub Actions sudah dikonfigurasi untuk auto-deploy ke server staging saat push ke branch main.",
      file: "pipeline_config.yaml",
      status: "Menunggu Validasi",
    },
    {
      id: 15,
      staffName: "Budi Santoso",
      taskTitle: "Instalasi Gateway LoRa",
      date: "31 Jan 2026",
      description: "Gateway LoRaWAN telah dipasang di atap gedung B untuk cakupan area 2km.",
      file: "dokumentasi_gateway.pdf",
      status: "Valid",
    },
    {
      id: 16,
      staffName: "Maya Sari",
      taskTitle: "UAT (User Acceptance Test)",
      date: "30 Jan 2026",
      description: "Dokumen UAT telah ditandatangani oleh klien. Semua fitur utama berjalan lancar.",
      file: "uat_signed.pdf",
      status: "Menunggu Validasi",
    },
    {
      id: 17,
      staffName: "Dedi Kurniawan",
      taskTitle: "Fix Bug Navigasi Mobile",
      date: "30 Jan 2026",
      description: "Memperbaiki masalah hamburger menu yang tidak bisa diklik di iOS Safari.",
      file: "patch_notes.txt",
      status: "Menunggu Validasi",
    },
  ]);

  // State Modal
  const [selectedReport, setSelectedReport] = useState(null);

  // State Form Input
  const [validationStatus, setValidationStatus] = useState("ACC"); // Default 'ACC' (Terima)
  const [feedback, setFeedback] = useState("");

  const handleReview = (report) => {
    setSelectedReport(report);
    setValidationStatus("ACC"); // Reset default ke ACC saat buka baru
    setFeedback("");
  };

  const handleClose = () => {
    setSelectedReport(null);
  };

  // Logic Simpan (Single Button)
  const handleSaveValidation = () => {
    // Tentukan status akhir berdasarkan radio button yang dipilih
    const finalStatus = validationStatus === "ACC" ? "Valid" : "Revisi";

    const updatedReports = reports.map((r) => {
      if (r.id === selectedReport.id) {
        return { ...r, status: finalStatus };
      }
      return r;
    });

    setReports(updatedReports);

    // Feedback Message
    const msg =
      finalStatus === "Valid"
        ? `Validasi Disimpan: Laporan ${selectedReport.staffName} DITERIMA.`
        : `Validasi Disimpan: Laporan dikembalikan untuk REVISI.`;

    alert(msg);
    handleClose();
  };

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
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Staff</th>
              <th>Judul Tugas</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.staffName}</td>
                <td>{report.taskTitle}</td>
                <td>
                  <span
                    className={`${styles.badge} ${getBadgeClass(report.status)}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>
                  {report.status !== "Valid" && (
                    <button
                      className={styles.reviewBtn}
                      onClick={() => handleReview(report)}
                    >
                      Review
                    </button>
                  )}
                  {report.status === "Valid" && <span>✓ Selesai</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL SESUAI WIREFRAME --- */}
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
              {/* 1. KOTAK INFO LAPORAN (Report Box) */}
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

                {/* Tombol Lampiran */}
                <button
                  className={styles.attachmentBtn}
                  onClick={() => alert("Membuka file: " + selectedReport.file)}
                >
                  📎 Lihat Lampiran ({selectedReport.file})
                </button>
              </div>

              {/* 2. RADIO BUTTON (Status Validasi) */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Status Validasi</label>
                <div className={styles.radioGroup}>
                  {/* Opsi Terima (ACC) */}
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

                  {/* Opsi Perlu Revisi */}
                  <label
                    className={`${styles.radioItem} ${validationStatus === "Revisi" ? styles.radioItemSelected : ""}`}
                  >
                    <input
                      type="radio"
                      name="validasi"
                      className={styles.radioInput}
                      checked={validationStatus === "Revisi"}
                      onChange={() => setValidationStatus("Revisi")}
                    />
                    <span>Perlu Revisi</span>
                  </label>
                </div>
              </div>

              {/* 3. FEEDBACK SUPERVISOR */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Catatan / Feedback Supervisor
                </label>
                <textarea
                  className={styles.formTextarea}
                  rows="3"
                  placeholder="Berikan komentar jika ada revisi, atau catatan tambahan..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* 4. FOOTER (Single Button) */}
            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleSaveValidation}>
                Simpan Validasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Validation;
