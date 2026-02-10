// src/controllers/ProjectController.js

let projectsDB = [
  {
    id: 1,
    title: "Sistem Deteksi Banjir IoT",
    category: "Internet of Things",
    description:
      "Pengembangan model machine learning untuk prediksi level air real-time.",
    supervisor: "Haldi Budiman",
    progress: 75,
    status: "Aktif",

    // --- PERBAIKAN DISINI ---
    deadline: "2026-03-20", // INI WAJIB ADA agar muncul di ProjectList
    // ------------------------

    deadlineInfo: "H-13",
    startDate: "01 Jan 2026",
    endDate: "20 Feb 2026",
    team: ["Siti Aminah", "Andi Pratama"],
    taskStats: { total: 12, completed: 8, pending: 4 },
    projectCode: "#PRJ-2026-001",
  },
  {
    id: 2,
    title: "AI Chatbot Layanan Publik",
    category: "Artificial Intelligence",
    description:
      "Pembuatan agen cerdas untuk otomatisasi balasan layanan pelanggan.",
    supervisor: "Fahri Ilmi",
    progress: 30,
    status: "Pending",

    // --- PERBAIKAN DISINI ---
    deadline: "2026-04-10",
    // ------------------------

    deadlineInfo: "H-45",
    startDate: "15 Feb 2026",
    endDate: "10 Apr 2026",
    team: ["Eko Wijaya"],
    taskStats: { total: 8, completed: 2, pending: 6 },
    projectCode: "#PRJ-2026-002",
  },
  {
    id: 3,
    title: "Manajemen Proyek Sagara",
    category: "Web Development",
    description: "Sistem informasi monitoring dan evaluasi proyek internal.",
    supervisor: "Haldi Budiman",
    progress: 100,
    status: "Selesai",

    // --- PERBAIKAN DISINI ---
    deadline: "2026-01-30",
    // ------------------------

    deadlineInfo: "Selesai",
    startDate: "01 Jan 2026",
    endDate: "30 Jan 2026",
    team: ["Rina Kartika", "Fajar Nugraha"],
    taskStats: { total: 20, completed: 20, pending: 0 },
    projectCode: "#PRJ-2026-003",
  },
  // Data dummy lainnya...
];

export const ProjectController = {
  // 1. GET ALL
  getAllProjects: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...projectsDB]), 500);
    });
  },

  // 2. CREATE
  createProject: async (newData) => {
    // ... (Kode Create sama seperti sebelumnya) ...
    // Saya singkat biar tidak kepanjangan di chat, pakai kode create terakhir Anda.
    const newProject = {
      id: Date.now(),
      title: newData.name,
      category: newData.category,
      description: newData.description,
      supervisor: newData.supervisor,
      deadline: newData.deadline,
      status: newData.status,
      progress: 0,
      team: newData.teamMembers || [],
      deadlineInfo: "Baru",
      startDate: new Date().toLocaleDateString("id-ID"),
      endDate: newData.deadline,
      taskStats: { total: 0, completed: 0, pending: 0 },
      projectCode: `#PRJ-${Date.now().toString().slice(-4)}`,
    };
    projectsDB.push(newProject);
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ success: true, message: "Proyek berhasil dibuat!" }),
        800,
      );
    });
  },

  // 3. UPDATE (EDIT) - BARU
  updateProject: async (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = projectsDB.findIndex((p) => p.id === id);
        if (index !== -1) {
          // Update data yang ada
          projectsDB[index] = {
            ...projectsDB[index],
            title: updatedData.name,
            category: updatedData.category,
            description: updatedData.description,
            supervisor: updatedData.supervisor,
            deadline: updatedData.deadline,
            status: updatedData.status,
            team: updatedData.teamMembers,
          };
          resolve({ success: true, message: "Proyek berhasil diperbarui!" });
        } else {
          resolve({ success: false, message: "Proyek tidak ditemukan." });
        }
      }, 800);
    });
  },

  // 4. DELETE (HAPUS) - BARU
  deleteProject: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = projectsDB.length;
        projectsDB = projectsDB.filter((p) => p.id !== id);

        if (projectsDB.length < initialLength) {
          resolve({ success: true, message: "Proyek berhasil dihapus." });
        } else {
          resolve({ success: false, message: "Gagal menghapus proyek." });
        }
      }, 500);
    });
  },

  // 5. EVALUASI
  addEvaluation: async (projectId, evalData) => {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ success: true, message: "Evaluasi berhasil dikirim!" }),
        1000,
      );
    });
  },
};
