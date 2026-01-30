import React, { useState } from "react";
import styles from "./DetailMonitoring.module.css";

const DetailMonitoring = () => {
  // 1. Data Dummy (Status sudah disesuaikan: Aktif, Pending, Selesai)
  const [projects] = useState([
    {
      id: 1,
      title: "Sistem Deteksi Banjir IoT",
      description:
        "Pengembangan model machine learning untuk prediksi level air real-time.",
      supervisor: "Haldi Budiman",
      progress: 75,
      status: "Aktif", // Status Baru
      deadline: "20 Feb 2026",
    },
    {
      id: 2,
      title: "AI Chatbot Layanan Publik",
      description:
        "Pembuatan agen cerdas untuk otomatisasi balasan layanan pelanggan.",
      supervisor: "Fahri Ilmi",
      progress: 30,
      status: "Pending", // Status Baru
      deadline: "10 Mar 2026",
    },
    {
      id: 3,
      title: "Manajemen Proyek Sagara",
      description: "Sistem informasi monitoring dan evaluasi proyek internal.",
      supervisor: "Haldi Budiman",
      progress: 100,
      status: "Selesai", // Status Baru
      deadline: "30 Jan 2026",
    },
    {
      id: 4,
      title: "Analisis Sentimen Medsos",
      description: "Eksperimen klasifikasi teks sentimen publik.",
      supervisor: "Siti Aminah",
      progress: 10,
      status: "Aktif",
      deadline: "15 Apr 2026",
    },
    {
      id: 5,
      title: "Computer Vision Absensi",
      description: "Sistem absensi wajah otomatis terintegrasi database.",
      supervisor: "Fahri Ilmi",
      progress: 100,
      status: "Selesai",
      deadline: "01 Jan 2026",
    },
    {
      id: 6,
      title: "Rekomendasi Produk E-Com",
      description: "Algoritma filtering berbasis konten untuk UMKM Batik.",
      supervisor: "Siti Aminah",
      progress: 0,
      status: "Pending",
      deadline: "22 Mar 2026",
    },
  ]);

  // 2. State untuk Search & Filter Category
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua"); // Default: Semua

  // 3. LOGIKA FILTER YANG DIPERBAIKI
  const filteredProjects = projects.filter((project) => {
    // Filter 1: Pencarian (Judul atau Supervisor)
    const matchSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter 2: Kategori Status
    // Jika filterCategory 'Semua', maka ambil semua. Jika tidak, harus sama persis dengan status project.
    const matchCategory =
      filterCategory === "Semua" ? true : project.status === filterCategory;

    // Gabungkan kedua syarat (DAN)
    return matchSearch && matchCategory;
  });

  // Helper Warna Progress Bar
  const getProgressColor = (progress) => {
    if (progress === 100) return "#10b981"; // Hijau (Selesai)
    if (progress < 40) return "#f59e0b"; // Kuning (Awal)
    return "#2563eb"; // Biru (Proses)
  };

  // Helper Initials Avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Helper untuk menentukan Class CSS Badge berdasarkan status teks
  const getStatusClass = (status) => {
    switch (status) {
      case "Aktif":
        return styles.statusAktif;
      case "Pending":
        return styles.statusPending;
      case "Selesai":
        return styles.statusSelesai;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>Monitoring & Evaluasi</h2>
        <p className={styles.subtitle}>
          Pantau progres eksperimen dan aktivitas tim secara real-time
        </p>
      </div>

      {/* CONTROLS (Search & Filter) */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Cari proyek atau supervisor..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* DROPDOWN FILTER YANG SUDAH BERFUNGSI */}
        <select
          className={styles.filterSelect}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="Semua">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Pending">Pending</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      {/* GRID CONTAINER */}
      <div className={styles.gridContainer}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className={styles.card}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span
                  className={`${styles.statusBadge} ${getStatusClass(project.status)}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.supervisorInfo}>
                  <div className={styles.avatar}>
                    {getInitials(project.supervisor)}
                  </div>
                  <div>
                    <span className={styles.supervisorLabel}>Supervisor</span>
                    <div className={styles.supervisorName}>
                      {project.supervisor}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div
                    className={styles.progressBarFill}
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: getProgressColor(project.progress),
                    }}
                  ></div>
                </div>

                <button
                  className={styles.detailButton}
                  onClick={() =>
                    alert(`Membuka detail proyek: ${project.title}`)
                  }
                >
                  Lihat Detail ➝
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Tampilan jika tidak ada data yang cocok */
          <div
            style={{
              colSpan: 3,
              textAlign: "center",
              color: "#94a3b8",
              width: "100%",
              padding: "40px",
            }}
          >
            Tidak ada proyek dengan status "{filterCategory}" atau pencarian "
            {searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailMonitoring;
