import React, { useState } from "react";
import styles from "./ProjectList.module.css";

const ProjectList = () => {
  // 1. Data Dummy Proyek
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Sistem Informasi HRD",
      category: "Web App",
      supervisor: "Budi Santoso",
      deadline: "2026-03-20",
      status: "Active",
    },
    {
      id: 2,
      name: "Aplikasi E-Commerce Batik",
      category: "Mobile App",
      supervisor: "Diana Putri",
      deadline: "2026-02-15",
      status: "Pending",
    },
    {
      id: 3,
      name: "Deteksi Banjir",
      category: "Mobile App",
      supervisor: "Diana Putri",
      deadline: "2026-02-15",
      status: "Completed",
    },
  ]);

  // 2. Data Dummy STAFF (Yang akan muncul di Checkbox)
  const availableStaff = [
    { id: 101, name: "Siti Aminah" },
    { id: 102, name: "Andi Pratama" },
    { id: 103, name: "Eko Wijaya" },
    { id: 104, name: "Rina Kartika" },
    { id: 105, name: "Fajar Nugraha" },
    { id: 106, name: "Dewi Lestari" },
  ];

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. State Form Baru (Ada Category & TeamMembers Array)
  const [newProject, setNewProject] = useState({
    name: "",
    category: "", // Dropdown Kategori
    description: "",
    supervisor: "",
    deadline: "",
    status: "Active",
    teamMembers: [], // Array untuk menampung staff yang dicentang
  });

  // Filter Logic
  const filteredProjects = projects.filter((project) => {
    const matchStatus =
      filterStatus === "all" ? true : project.status === filterStatus;
    const matchSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Handle Input Biasa (Text & Select)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // 4. Handle Checkbox Change (Logic Staff)
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const { teamMembers } = newProject;

    if (checked) {
      // Jika dicentang, tambahkan nama ke array
      setNewProject({ ...newProject, teamMembers: [...teamMembers, value] });
    } else {
      // Jika hapus centang, buang nama dari array
      setNewProject({
        ...newProject,
        teamMembers: teamMembers.filter((name) => name !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Project Baru:", newProject); // Cek console untuk lihat hasilnya

    const newId = projects.length + 1;
    setProjects([...projects, { id: newId, ...newProject }]);

    setIsModalOpen(false);
    // Reset Form
    setNewProject({
      name: "",
      category: "",
      description: "",
      supervisor: "",
      deadline: "",
      status: "Active",
      teamMembers: [],
    });
    alert(
      `Proyek "${newProject.name}" berhasil dibuat dengan ${newProject.teamMembers.length} anggota tim!`,
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return styles.statusActive;
      case "Pending":
        return styles.statusPending;
      case "Completed":
        return styles.statusCompleted;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER & CONTROLS SAMA SEPERTI SEBELUMNYA */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Daftar Proyek</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Kelola dan pantau seluruh proyek yang berjalan
          </p>
        </div>
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Tambah Proyek
        </button>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Cari proyek atau supervisor..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {["all", "Active", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            className={`${styles.filterButton} ${filterStatus === status ? styles.active : ""}`}
            onClick={() => setFilterStatus(status)}
          >
            {status === "all" ? "Semua Proyek" : status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="5%">No</th>
              <th width="25%">Nama Proyek</th>
              <th width="15%">Kategori</th> {/* Kolom Baru */}
              <th width="20%">Supervisor</th>
              <th width="15%">Deadline</th>
              <th width="10%">Status</th>
              <th width="10%" style={{ textAlign: "center" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>
                    {project.name}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    {project.category || "-"}
                  </span>
                </td>
                <td>{project.supervisor}</td>
                <td style={{ color: "#64748b" }}>{project.deadline}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${getStatusStyle(project.status)}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionCell}>
                    <button className={styles.detailBtn}>Detail</button>
                    <button className={`${styles.iconBtn} ${styles.editBtn}`}>
                      ✎
                    </button>
                    <button className={`${styles.iconBtn} ${styles.deleteBtn}`}>
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL FORM --- */}
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Buat Proyek Baru</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  {/* Nama Proyek */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nama Proyek</label>
                    <input
                      type="text"
                      name="name"
                      className={styles.formInput}
                      placeholder="Contoh: Sistem Deteksi Banjir"
                      value={newProject.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* KATEGORI (Dropdown Baru) */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Kategori Proyek</label>
                    <select
                      name="category"
                      className={styles.formSelect}
                      value={newProject.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Pilih Kategori --</option>
                      <option value="Web App">Web Application</option>
                      <option value="Mobile App">Mobile Application</option>
                      <option value="IoT">Internet of Things (IoT)</option>
                      <option value="AI/ML">
                        Artificial Intelligence / ML
                      </option>
                      <option value="Riset">Penelitian / Riset</option>
                    </select>
                  </div>

                  {/* Deskripsi (Full Width) */}
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Deskripsi Proyek</label>
                    <textarea
                      name="description"
                      className={styles.formTextarea}
                      placeholder="Jelaskan tujuan dan detail proyek ini..."
                      value={newProject.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Supervisor */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Supervisor</label>
                    <select
                      name="supervisor"
                      className={styles.formSelect}
                      value={newProject.supervisor}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Pilih Supervisor --</option>
                      <option value="Budi Santoso">Budi Santoso</option>
                      <option value="Diana Putri">Diana Putri</option>
                      <option value="Haldi Budiman">Haldi Budiman</option>
                    </select>
                  </div>

                  {/* Deadline */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Deadline Target</label>
                    <input
                      type="date"
                      name="deadline"
                      className={styles.formInput}
                      value={newProject.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* ANGGOTA TIM (CHECKBOX LIST) */}
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>
                      Anggota Tim (Staff)
                      <span
                        style={{
                          fontWeight: "normal",
                          color: "#64748b",
                          marginLeft: "8px",
                          fontSize: "0.8rem",
                        }}
                      >
                        *Pilih staff yang terlibat
                      </span>
                    </label>

                    <div className={styles.checkboxContainer}>
                      <div className={styles.checkboxGrid}>
                        {availableStaff.map((staff) => (
                          <label key={staff.id} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              value={staff.name}
                              checked={newProject.teamMembers.includes(
                                staff.name,
                              )}
                              onChange={handleCheckboxChange}
                            />
                            {staff.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Awal */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Status Awal</label>
                    <select
                      name="status"
                      className={styles.formSelect}
                      value={newProject.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active (Sedang Berjalan)</option>
                      <option value="Pending">Pending (Persiapan)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
