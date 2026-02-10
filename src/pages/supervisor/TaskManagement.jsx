import React, { useState, useEffect } from "react";
import { Search, Calendar, Users, Plus, Layers } from "lucide-react";
import styles from "./TaskManagement.module.css";

// --- IMPORT CONTROLLERS ---
import { ProjectController } from "../../controllers/ProjectController";
import { UserController } from "../../controllers/UserController";
import { TaskController } from "../../controllers/TaskController";

const TaskManagement = () => {
  // --- 1. STATE DECLARATIONS ---
  const [projects, setProjects] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State UI
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Form
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    deadline: "",
    priority: "Normal",
  });

  // --- 2. LOAD DATA DARI CONTROLLER ---
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const dataProjects = await ProjectController.getAllProjects();
        const dataStaff = await UserController.getAllStaff();

        setProjects(dataProjects);
        setStaffList(dataStaff);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // --- 3. LOGIC FILTER STAFF UNTUK DROPDOWN ---
  // Kita buat variabel dinamis untuk dropdown
  // Jika ada proyek dipilih, filter staffList berdasarkan nama yang ada di selectedProject.team
  const availableStaffForProject = selectedProject
    ? staffList.filter((staff) => 
        selectedProject.team?.includes(staff.name)
      )
    : [];

  // --- 4. FILTERING & LOGIC PROJECT LIST ---
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 5. HANDLERS ---
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalData = {
      ...newTask,
      projectId: selectedProject.id,
      projectName: selectedProject.title,
    };

    try {
      const result = await TaskController.createTask(finalData);
      if (result.success) {
        alert(result.message);
        handleCloseModal();
      }
    } catch (error) {
      alert("Gagal membuat tugas.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper UI
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

      {/* LOADING CHECK */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          Memuat data proyek...
        </div>
      ) : (
        /* GRID CARDS */
        <div className={styles.gridContainer}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.card}>
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

              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                
                {/* INFO TIM (Menampilkan Jumlah Staff) */}
                <div className={styles.supervisorInfo} style={{ marginTop: 'auto' }}>
                  <Users size={14} style={{ marginRight: '6px' }} /> 
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Tim: <strong>{project.team ? project.team.length : 0} Staff</strong>
                  </span>
                </div>
              </div>

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
      )}

      {/* --- MODAL FORM --- */}
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
                  
                  {/* --- DROPDOWN STAFF (SUDAH DIFILTER) --- */}
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
                      
                      {/* TAMPILKAN STAFF YG DIFILTER */}
                      {availableStaffForProject.length > 0 ? (
                        availableStaffForProject.map((staff) => (
                          <option key={staff.user_id} value={staff.name}>
                            {staff.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>Tidak ada staff di proyek ini</option>
                      )}

                    </select>
                  </div>
                  {/* --------------------------------------- */}

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
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={styles.saveBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Tugas"}
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