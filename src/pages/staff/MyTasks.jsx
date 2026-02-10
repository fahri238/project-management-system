import React, { useState, useEffect } from "react";
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

// --- IMPORT CONTROLLER ---
import { TaskController } from "../../controllers/TaskController";
import { ExperimentController } from "../../controllers/ExperimentController";

const MyTasks = () => {
  // --- STATE ---
  const [tasks, setTasks] = useState([]); // Awalnya kosong
  const [loading, setLoading] = useState(true); // State Loading

  // State Filter & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // State Modal & Form
  const [selectedTask, setSelectedTask] = useState(null);
  const [journal, setJournal] = useState("");
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State Loading Submit

  // --- 1. FETCH DATA DARI CONTROLLER ---
  useEffect(() => {
    const loadTasks = async () => {
      try {
        // Simulasi: Ambil data untuk user yang sedang login "Fahri Ilmi"
        const data = await TaskController.getTasksByStaff("Fahri Ilmi");
        setTasks(data);
      } catch (err) {
        console.error("Gagal memuat tugas", err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // --- LOGIC FILTER ---
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Mapping status agar sesuai filter (Pending di DB = To Do di Filter UI)
    const normalizedStatus = task.status === "Pending" ? "To Do" : task.status;
    const matchStatus =
      filterStatus === "Semua" ? true : normalizedStatus === filterStatus;

    return matchSearch && matchStatus;
  });

  // --- HANDLERS ---
  const handleOpenModal = (task) => {
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

  // --- 2. SUBMIT DENGAN EXPERIMENT CONTROLLER ---
  const handleSubmit = async () => {
    if (!journal.trim()) {
      setErrorMsg("Jurnal kegiatan wajib diisi.");
      return;
    }
    if (!file) {
      setErrorMsg("Wajib mengunggah bukti file.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Panggil Controller Upload
      const payload = {
        taskId: selectedTask.id,
        notes: journal,
        file: file, // Di real backend ini dikirim sebagai FormData
      };

      const result = await ExperimentController.uploadExperiment(payload);

      if (result.success) {
        // Update Status Lokal UI agar langsung berubah
        const updatedTasks = tasks.map((t) =>
          t.id === selectedTask.id ? { ...t, status: "Menunggu Validasi" } : t,
        );
        setTasks(updatedTasks);

        alert(result.message);
        setSelectedTask(null); // Tutup Modal
      }
    } catch (error) {
      setErrorMsg("Gagal mengirim laporan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
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
          <option value="Pending">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Revisi">Perlu Revisi</option>
        </select>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
          Memuat tugas Anda...
        </div>
      ) : (
        /* GRID TUGAS */
        <div className={styles.taskGrid}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
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
                    {task.status === "Pending" ? "To Do" : task.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
                color: "#94a3b8",
              }}
            >
              Tidak ada tugas ditemukan.
            </div>
          )}
        </div>
      )}

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
              {/* SECTION 1: INSTRUKSI SUPERVISOR */}
              <div className={styles.instructionBox}>
                <div className={styles.instructionTitle}>
                  <ListChecks size={18} /> Instruksi / To-Do List dari
                  Supervisor
                </div>
                {selectedTask.todoList && selectedTask.todoList.length > 0 ? (
                  <ul className={styles.todoList}>
                    {selectedTask.todoList.map((item, index) => (
                      <li key={index} className={styles.todoItem}>
                        <ChevronRight size={16} className={styles.todoIcon} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      fontStyle: "italic",
                    }}
                  >
                    Tidak ada instruksi khusus.
                  </p>
                )}
              </div>

              {/* ALERT REVISI */}
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

              <div className={styles.divider}></div>

              {/* SECTION 2: FORM PELAPORAN */}
              <h4 className={styles.sectionLabel}>Form Laporan Kerja</h4>

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

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Jurnal Kegiatan</label>
                <textarea
                  className={styles.textArea}
                  rows="4"
                  placeholder="Deskripsikan perbaikan atau pekerjaan yang Anda lakukan..."
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bukti Eksperimen</label>
                <div
                  className={styles.fileUploadBox}
                  onClick={() =>
                    !isSubmitting &&
                    document.getElementById("fileInput").click()
                  }
                  style={{
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf,.zip,.png,.jpg,.jpeg"
                    disabled={isSubmitting}
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

              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={!journal || !file || isSubmitting}
              >
                {isSubmitting ? (
                  "Mengirim Laporan..."
                ) : (
                  <>
                    <CheckCircle2 size={18} /> Kirim Laporan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
