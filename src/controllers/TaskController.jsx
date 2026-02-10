// src/controllers/TaskController.js

let tasksDB = [
  {
    id: 1,
    title: "Slicing Halaman Dashboard",
    projectName: "Sistem Deteksi Banjir",
    projectStatus: "Aktif",
    supervisor: "Haldi Budiman",
    deadline: "20 Feb 2026",
    status: "In Progress",
    priority: "High",
    assignee: "Fahri Ilmi", // PENTING: Nama Staff
    todoList: [
      "Gunakan grid layout 3 kolom.",
      "Pastikan responsif mobile (max 768px).",
      "Sesuaikan warna grafik dengan style guide.",
    ],
  },
  {
    id: 2,
    title: "Integrasi API Login",
    projectName: "AI Chatbot Layanan",
    projectStatus: "Pending",
    supervisor: "Haldi Budiman",
    deadline: "22 Feb 2026",
    status: "Revisi", // Status REVISI
    priority: "Medium",
    assignee: "Fahri Ilmi",
    todoList: [
      "Endpoint: /api/v1/auth/login",
      "Validasi regex email.",
      "Simpan token di localStorage.",
    ],
    revisionNote:
      "Validasi email masih lolos meski format salah. Perbaiki regex-nya.",
  },
  {
    id: 3,
    title: "Fix Bug Menu Mobile",
    projectName: "Sistem Deteksi Banjir",
    projectStatus: "Aktif",
    supervisor: "Haldi Budiman",
    deadline: "19 Feb 2026",
    status: "Pending", // To Do
    priority: "Low",
    assignee: "Fahri Ilmi",
    todoList: [
      "Hamburger menu tidak jalan di iOS.",
      "Padding header terlalu besar.",
    ],
  },
];

export const TaskController = {
  // 1. Create Task (Untuk Supervisor)
  createTask: async (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: "Pending",
      todoList: [], // Default kosong jika tidak diisi
      projectStatus: "Aktif",
    };
    tasksDB.push(newTask);
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ success: true, message: "Tugas berhasil!" }),
        800,
      );
    });
  },

  // 2. Get Tasks By Staff (Untuk Staff)
  getTasksByStaff: async (staffName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter berdasarkan nama staff
        const myTasks = tasksDB.filter((t) => t.assignee === staffName);
        resolve(myTasks);
      }, 600); // Delay loading
    });
  },
};
