import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. TAMBAHKAN IMPORT INI
import styles from "./ProjectList.module.css";

// IMPORT CONTROLLER
import { ProjectController } from "../../controllers/ProjectController";

const ProjectList = () => {
  // 2. INITIALIZE NAVIGATE
  const navigate = useNavigate();

  // 1. STATE
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (Bagian Fetch Data, State Form, Filter, dll biarkan SAMA PERSIS) ...
  // ... (Agar kode tidak kepanjangan, saya skip bagian tengah yang tidak berubah) ...

  const fetchProjects = async () => {
    try {
      const data = await ProjectController.getAllProjects();
      const mappedData = data.map((p) => ({
        ...p,
        name: p.title,
      }));
      setProjects(mappedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const initialFormState = {
    name: "",
    category: "",
    description: "",
    supervisor: "",
    deadline: "",
    status: "Active",
    teamMembers: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  // HANDLERS
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setIsEditMode(true);
    setCurrentProjectId(project.id);
    setFormData({
      name: project.name,
      category: project.category,
      description: project.description || "",
      supervisor: project.supervisor,
      deadline: project.deadline || "",
      status:
        project.status === "Aktif"
          ? "Active"
          : project.status === "Pending"
            ? "Pending"
            : "Active",
      teamMembers: project.team || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Yakin ingin menghapus proyek "${name}"?`)) {
      try {
        const result = await ProjectController.deleteProject(id);
        if (result.success) {
          alert(result.message);
          fetchProjects();
        }
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  const filteredProjects = projects.filter((project) => {
    const statusMap = { Active: "Aktif", Completed: "Selesai" };
    const currentStatus = statusMap[project.status] || project.status;
    const filterKey = statusMap[filterStatus] || filterStatus;

    const matchStatus =
      filterStatus === "all"
        ? true
        : project.status === filterKey || project.status === filterStatus;
    const matchSearch =
      (project.name || project.title)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const { teamMembers } = formData;
    if (checked) {
      setFormData({ ...formData, teamMembers: [...teamMembers, value] });
    } else {
      setFormData({
        ...formData,
        teamMembers: teamMembers.filter((name) => name !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let result;
      if (isEditMode) {
        result = await ProjectController.updateProject(
          currentProjectId,
          formData,
        );
      } else {
        result = await ProjectController.createProject(formData);
      }

      if (result.success) {
        alert(result.message);
        fetchProjects();
        setIsModalOpen(false);
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Aktif" || status === "Active") return styles.statusActive;
    if (status === "Pending") return styles.statusPending;
    if (status === "Selesai" || status === "Completed")
      return styles.statusCompleted;
    return "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Daftar Proyek</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Kelola dan pantau seluruh proyek yang berjalan
          </p>
        </div>
        <button className={styles.addButton} onClick={handleOpenAdd}>
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
            {status === "all" ? "Semua" : status}
          </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div
            style={{ padding: "20px", textAlign: "center", color: "#64748b" }}
          >
            Memuat data...
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th width="5%">No</th>
                <th width="25%">Nama Proyek</th>
                <th width="15%">Kategori</th>
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
                  <td style={{ color: "#64748b" }}>
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${getStatusStyle(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionCell}>
                      {/* 3. TOMBOL DETAIL SEKARANG NAVIGASI KE MONITORING */}
                      <button
                        className={styles.detailBtn}
                        onClick={() =>
                          navigate("/admin/monitoring", {
                            state: { projectId: project.id },
                          })
                        }
                      >
                        Detail
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.editBtn}`}
                        onClick={() => handleOpenEdit(project)}
                      >
                        ✎
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDelete(project.id, project.name)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL FORM (Isi tetap sama) */}
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
              <h3 className={styles.modalTitle}>
                {isEditMode ? "Edit Proyek" : "Buat Proyek Baru"}
              </h3>
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
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nama Proyek</label>
                    <input
                      type="text"
                      name="name"
                      className={styles.formInput}
                      placeholder="Contoh: Sistem Deteksi Banjir"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Kategori Proyek</label>
                    <select
                      name="category"
                      className={styles.formSelect}
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Pilih Kategori --</option>
                      <option value="Web App">Web Application</option>
                      <option value="Mobile App">Mobile Application</option>
                      <option value="IoT">IoT</option>
                      <option value="AI/ML">AI / Machine Learning</option>
                    </select>
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Deskripsi Proyek</label>
                    <textarea
                      name="description"
                      className={styles.formTextarea}
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Supervisor</label>
                    <select
                      name="supervisor"
                      className={styles.formSelect}
                      value={formData.supervisor}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Pilih Supervisor --</option>
                      <option value="Budi Santoso">Budi Santoso</option>
                      <option value="Diana Putri">Diana Putri</option>
                      <option value="Haldi Budiman">Haldi Budiman</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      className={styles.formInput}
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>Anggota Tim</label>
                    <div className={styles.checkboxContainer}>
                      <div className={styles.checkboxGrid}>
                        {availableStaff.map((staff) => (
                          <label key={staff.id} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              value={staff.name}
                              checked={formData.teamMembers.includes(
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
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Status Awal</label>
                    <select
                      name="status"
                      className={styles.formSelect}
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
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
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : isEditMode
                      ? "Simpan Perubahan"
                      : "Simpan Proyek"}
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
