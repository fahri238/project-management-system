import React, { useState } from "react";
import {
  Search,
  Calendar,
  User,
  Plus,
  MoreHorizontal,
  Layers,
} from "lucide-react";
import styles from "./TaskManagement.module.css";

const TaskManagement = () => {
  // 1. Data Dummy Proyek
  const [projects] = useState([
    {
      id: 1,
      title: "Sistem Deteksi Banjir IoT",
      category: "Internet of Things", // Field baru untuk header card
      description:
        "Pengembangan model machine learning untuk prediksi level air real-time.",
      supervisor: "Haldi Budiman",
      progress: 75,
      status: "Aktif",
      deadline: "20 Feb 2026",
    },
    {
      id: 2,
      title: "AI Chatbot Layanan Publik",
      category: "Artificial Intelligence",
      description:
        "Pembuatan agen cerdas untuk otomatisasi balasan layanan pelanggan.",
      supervisor: "Haldi Budiman",
      progress: 30,
      status: "Pending",
      deadline: "10 Mar 2026",
    },
    {
      id: 3,
      title: "Computer Vision Absensi",
      category: "Computer Vision",
      description:
        "Sistem absensi wajah otomatis terintegrasi database karyawan.",
      supervisor: "Haldi Budiman",
      progress: 100,
      status: "Selesai",
      deadline: "01 Jan 2026",
    },
    {
      id: 4,
      title: "Sistem E-Voting Blockchain",
      category: "Blockchain",
      description:
        "Pencatatan suara pemilihan ketua himpunan menggunakan smart contract Ethereum.",
      supervisor: "Haldi Budiman",
      progress: 10,
      status: "Pending",
      deadline: "15 Apr 2026",
    },
    {
      id: 5,
      title: "Aplikasi Mobile Telemedicine",
      category: "Mobile Development",
      description:
        "Platform konsultasi dokter jarak jauh dengan fitur video call terenkripsi.",
      supervisor: "Haldi Budiman",
      progress: 65,
      status: "Aktif",
      deadline: "05 May 2026",
    },
    {
      id: 6,
      title: "Dashboard Analisis Saham",
      category: "Data Science",
      description:
        "Visualisasi data pergerakan harga saham real-time menggunakan Python.",
      supervisor: "Haldi Budiman",
      progress: 100,
      status: "Selesai",
      deadline: "30 Dec 2025",
    },
    {
      id: 7,
      title: "Smart Home Energy Saver",
      category: "Internet of Things",
      description:
        "Otomatisasi pemadaman listrik rumah berbasis sensor gerak dan cahaya.",
      supervisor: "Haldi Budiman",
      progress: 88,
      status: "Aktif",
      deadline: "28 Feb 2026",
    },
    {
      id: 8,
      title: "Analisis Sentimen Pemilu",
      category: "Natural Language Processing",
      description:
        "Crawling dan klasifikasi opini publik di media sosial terkait calon legislatif.",
      supervisor: "Haldi Budiman",
      progress: 45,
      status: "Aktif",
      deadline: "12 Mar 2026",
    },
    {
      id: 9,
      title: "Virtual Tour Museum 360",
      category: "Augmented Reality",
      description:
        "Aplikasi wisata virtual museum sejarah dengan panduan audio interaktif.",
      supervisor: "Haldi Budiman",
      progress: 5,
      status: "Pending",
      deadline: "20 Jun 2026",
    },
  ]);

  // 2. Data Dummy Staff
  const staffList = [
    { id: 101, name: "Siti Aminah" },
    { id: 102, name: "Andi Pratama" },
    { id: 103, name: "Eko Wijaya" },
    { id: 104, name: "Rina Kartika" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    deadline: "",
    priority: "Normal",
  });

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- HANDLERS ---
  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setNewTask({
      title: "",
      description: "",
      assignee: "",
      deadline: "",
      priority: "Normal",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tugas Baru:", newTask, "Proyek:", selectedProject.title);
    alert(`Tugas "${newTask.title}" berhasil ditambahkan!`);
    handleCloseModal();
  };

  // --- HELPER UI ---
  const getProgressColor = (progress) => {
    if (progress === 100) return "#10b981";
    if (progress < 40) return "#f59e0b";
    return "#2563eb";
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Kelola Tugas</h2>
        <p className={styles.subtitle}>
          Pilih proyek untuk mulai mendistribusikan tugas kepada tim.
        </p>
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Cari proyek..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* GRID CARDS (Style disamakan dengan MyTasks) */}
      <div className={styles.gridContainer}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.card}>
            {/* 1. Card Context (Header Abu-abu) */}
            <div className={styles.cardContext}>
              <span className={styles.categoryLabel}>
                <Layers size={12} style={{ marginRight: "4px" }} />
                {project.category}
              </span>
              <span
                className={`${styles.statusBadge} ${styles[project.status.toLowerCase()]}`}
              >
                {project.status}
              </span>
            </div>

            {/* 2. Card Body */}
            <div className={styles.cardBody}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.supervisorInfo}>
                <User size={14} /> Lead: {project.supervisor}
              </div>
            </div>

            {/* 3. Progress Section (Khas Halaman Ini) */}
            <div className={styles.progressArea}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: "4px",
                  color: "#64748b",
                }}
              >
                <span>Progress Tim</span>
                <span
                  style={{
                    fontWeight: "600",
                    color: getProgressColor(project.progress),
                  }}
                >
                  {project.progress}%
                </span>
              </div>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${project.progress}%`,
                    background: getProgressColor(project.progress),
                  }}
                ></div>
              </div>
            </div>

            {/* 4. Card Footer (Deadline & Action) */}
            <div className={styles.cardFooter}>
              <div className={styles.deadline}>
                <Calendar size={14} /> {project.deadline}
              </div>
              <button
                className={styles.createBtn}
                onClick={() => handleOpenModal(project)}
              >
                <Plus size={16} /> Buat Tugas
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL FORM (Sama seperti sebelumnya) --- */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Input Tugas Baru</h3>
                <div style={{ marginTop: "6px" }}>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    Proyek:{" "}
                  </span>
                  <span className={styles.selectedProjectBadge}>
                    {selectedProject.title}
                  </span>
                </div>
              </div>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Judul Tugas</label>
                    <input
                      type="text"
                      name="title"
                      className={styles.formInput}
                      placeholder="Contoh: Integrasi API Payment"
                      value={newTask.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Deskripsi Teknis</label>
                    <textarea
                      name="description"
                      className={styles.formTextarea}
                      placeholder="Spesifikasi teknis..."
                      value={newTask.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Ditugaskan Kepada
                    </label>
                    <select
                      name="assignee"
                      className={styles.formSelect}
                      value={newTask.assignee}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Pilih Staff --</option>
                      {staffList.map((staff) => (
                        <option key={staff.id} value={staff.name}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      className={styles.formInput}
                      value={newTask.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Prioritas</label>
                    <select
                      name="priority"
                      className={styles.formSelect}
                      value={newTask.priority}
                      onChange={handleInputChange}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High / Urgent</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
