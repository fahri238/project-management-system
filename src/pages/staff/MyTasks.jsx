import React, { useState } from "react";
import {
  Search,
  Calendar,
  User,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  ListChecks,
  ChevronRight,
} from "lucide-react";
import styles from "./MyTasks.module.css";

const MyTasks = () => {
  // --- 1. DATA TUGAS DUMMY ---
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Slicing Halaman Dashboard",
      projectName: "Sistem Deteksi Banjir",
      projectStatus: "Aktif",
      supervisor: "Haldi Budiman",
      deadline: "20 Feb 2026",
      status: "In Progress",
      priority: "High",
      todoList: [
        "Gunakan grid layout 3 kolom untuk statistik.",
        "Pastikan card responsif di layar mobile (max-width: 768px).",
        "Warna grafik harus sesuai panduan style guide (Indigo & Slate).",
      ],
    },
    {
      id: 2,
      title: "Integrasi API Login",
      projectName: "AI Chatbot Layanan",
      projectStatus: "Pending",
      supervisor: "Fahri Ilmi",
      deadline: "22 Feb 2026",
      status: "Revisi", // Status REVISI
      priority: "Medium",
      todoList: [
        "Endpoint API: /api/v1/auth/login",
        "Tambahkan validasi email format regex.",
        "Simpan token di localStorage, jangan di cookie.",
      ],
      // Catatan Revisi
      revisionNote:
        "Validasi email masih lolos meskipun formatnya salah (tanpa @). Tolong perbaiki regex-nya dan tes ulang.",
    },
    {
      id: 3,
      title: "Fix Bug Responsif Mobile",
      projectName: "Sistem Deteksi Banjir",
      projectStatus: "Aktif",
      supervisor: "Haldi Budiman",
      deadline: "19 Feb 2026",
      status: "To Do",
      priority: "Low",
      todoList: [
        "Menu hamburger tidak bisa diklik di iOS Safari.",
        "Padding header terlalu besar di layar < 400px.",
      ],
    },
  ]);

  // State Modal & Form
  const [selectedTask, setSelectedTask] = useState(null);
  const [journal, setJournal] = useState("");
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // --- LOGIC FILTER ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === "Semua" ? true : task.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // --- HANDLERS ---
  const handleOpenModal = (task) => {
    // Jika status "Menunggu Validasi", staff tidak bisa edit lagi
    if (task.status === "Menunggu Validasi") {
      alert("Tugas ini sedang diperiksa Supervisor. Harap tunggu validasi.");
      return;
    }
    setSelectedTask(task);
    setJournal("");
    setFile(null);
    setErrorMsg("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg("Ukuran file terlalu besar! Maksimal 5MB.");
        setFile(null);
      } else {
        setErrorMsg("");
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = () => {
    if (!journal.trim()) {
      setErrorMsg("Jurnal kegiatan wajib diisi.");
      return;
    }
    if (!file) {
      setErrorMsg("Wajib mengunggah bukti file.");
      return;
    }

    // Update Status menjadi 'Menunggu Validasi'
    const updatedTasks = tasks.map((t) =>
      t.id === selectedTask.id ? { ...t, status: "Menunggu Validasi" } : t,
    );

    setTasks(updatedTasks);
    alert(`Laporan Berhasil Disimpan! Status tugas kini 'Menunggu Validasi'.`);
    setSelectedTask(null);
  };

  // Helper Warna
  const getProjectStatusColor = (status) =>
    status === "Aktif"
      ? "#10b981"
      : status === "Pending"
        ? "#f59e0b"
        : "#3b82f6";

  const getTaskStatusClass = (status) => {
    if (status === "Revisi") return styles.statusRevisi;
    if (status === "In Progress") return styles.statusProgress;
    if (status === "Menunggu Validasi") return styles.statusPending;
    return styles.statusTodo;
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Tugas Saya</h2>
        <p className={styles.subtitle}>
          Kelola daftar pekerjaan dan laporkan progres harian Anda.
        </p>
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search
            size={20}
            style={{
              position: "absolute",
              left: "12px",
              top: "12px",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Cari judul proyek..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Semua">Semua Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Revisi">Perlu Revisi</option>
        </select>
      </div>

      {/* GRID TUGAS */}
      <div className={styles.taskGrid}>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={styles.taskCard}
            onClick={() => handleOpenModal(task)}
          >
            {/* Project Context */}
            <div className={styles.cardProjectCtx}>
              <span className={styles.projectName}>
                <span
                  className={styles.projectStatusDot}
                  style={{
                    background: getProjectStatusColor(task.projectStatus),
                  }}
                ></span>
                {task.projectName}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  color: "#64748b",
                  border: "1px solid #cbd5e1",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {task.priority}
              </span>
            </div>

            {/* Body */}
            <div className={styles.cardBody}>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <div className={styles.supervisorInfo}>
                <User size={14} /> Sv: {task.supervisor}
              </div>
            </div>

            {/* Footer */}
            <div className={styles.cardFooter}>
              <div className={styles.deadline}>
                <Calendar size={14} /> {task.deadline}
              </div>
              <span
                className={`${styles.badge} ${getTaskStatusClass(task.status)}`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL DETAIL & UPLOAD --- */}
      {selectedTask && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedTask(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Detail & Pelaporan</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                  Tugas: {selectedTask.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <X size={24} color="#64748b" />
              </button>
            </div>

            {/* Body Form */}
            <div className={styles.modalBody}>
              {/* SECTION 1: INSTRUKSI SUPERVISOR (TO DO LIST) */}
              <div className={styles.instructionBox}>
                <div className={styles.instructionTitle}>
                  <ListChecks size={18} /> Instruksi / To-Do List dari
                  Supervisor
                </div>
                <ul className={styles.todoList}>
                  {selectedTask.todoList.map((item, index) => (
                    <li key={index} className={styles.todoItem}>
                      <ChevronRight size={16} className={styles.todoIcon} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* --- UPDATE: SECTION ALERT REVISI (Menggunakan Class CSS) --- */}
              {selectedTask.status === "Revisi" && (
                <div className={styles.revisionBox}>
                  <AlertCircle
                    size={20}
                    color="#dc2626"
                    style={{ marginTop: "2px", flexShrink: 0 }}
                  />
                  <div>
                    <h4 className={styles.revisionTitle}>PERLU REVISI!</h4>
                    <p className={styles.revisionText}>
                      "{selectedTask.revisionNote}"
                    </p>
                  </div>
                </div>
              )}

              {/* Garis Pemisah */}
              <div className={styles.divider}></div>

              {/* SECTION 2: FORM PELAPORAN */}
              <h4 className={styles.sectionLabel}>Form Laporan Kerja</h4>

              {/* Error Message (Inline style ok untuk alert kecil, atau buat class errorMsg) */}
              {errorMsg && (
                <div
                  style={{
                    background: "#fef2f2",
                    color: "#ef4444",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              {/* Input Jurnal */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Jurnal Kegiatan</label>
                <textarea
                  className={styles.textArea}
                  rows="4"
                  placeholder="Deskripsikan perbaikan atau pekerjaan yang Anda lakukan hari ini..."
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                ></textarea>
              </div>

              {/* Input File */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bukti Eksperimen</label>
                <div
                  className={styles.fileUploadBox}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf,.zip,.png,.jpg,.jpeg"
                  />
                  <UploadCloud
                    size={32}
                    color={file ? "#2563eb" : "#94a3b8"}
                    style={{ margin: "0 auto" }}
                  />
                  {file ? (
                    <div className={styles.fileName}>
                      File Terpilih: {file.name}
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "10px",
                        color: "#64748b",
                        fontSize: "0.9rem",
                      }}
                    >
                      Klik untuk upload file (PDF/ZIP/IMG)
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        Maksimal 5MB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={!journal || !file}
              >
                <CheckCircle2 size={18} /> Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
