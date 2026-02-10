// src/controllers/DashboardController.js

import { ProjectController } from "./ProjectController";
import { UserController } from "./UserController";
import { ExperimentController } from "./ExperimentController";

export const DashboardController = {
  getDashboardData: async () => {
    // 1. Ambil semua data mentah dari Controller lain
    const [projects, users, experiments] = await Promise.all([
      ProjectController.getAllProjects(),
      UserController.getAllUsers(),
      ExperimentController.getAllExperiments()
    ]);

    // --- A. HITUNG STATISTIK UTAMA (StatCards) ---
    const activeProjects = projects.filter(p => p.status === "Aktif" || p.status === "Active").length;
    const completedProjects = projects.filter(p => p.status === "Selesai" || p.status === "Completed").length;
    const totalUsers = users.length;
    const pendingExperiments = experiments.filter(e => e.status === "Menunggu Validasi").length;

    // --- B. DATA BAR CHART (Project per Bulan) ---
    // Kita hitung berdasarkan 'startDate' proyek
    const monthCounts = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    
    // Inisialisasi 0
    months.forEach(m => monthCounts[m] = 0);

    projects.forEach(p => {
      if (p.startDate) {
        const date = new Date(p.startDate);
        if (!isNaN(date)) {
            const monthName = months[date.getMonth()];
            monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
        }
      }
    });

    // Format ke bentuk Recharts [{bulan: 'Jan', total: 5}, ...]
    // Ambil 6 bulan pertama saja untuk demo agar rapi
    const chartData = months.slice(0, 6).map(m => ({
      bulan: m,
      total: monthCounts[m]
    }));

    // --- C. DATA PIE CHART (Status) ---
    const pendingProjects = projects.filter(p => p.status === "Pending").length;
    const pieData = [
      { name: 'Selesai', value: completedProjects },
      { name: 'Aktif', value: activeProjects },
      { name: 'Pending', value: pendingProjects },
    ];

    // --- D. PROJECT SPOTLIGHT (Ambil 1 Proyek Aktif Terakhir) ---
    const spotlightProject = projects.find(p => p.status === "Aktif" || p.status === "Active") || projects[0];

    // --- E. ACTIVITY LOG (Simulasi dari data user & project terakhir) ---
    // Kita ambil 2 user terakhir dan 2 project terakhir untuk jadi "Log Palsu" agar terlihat dinamis
    const lastUser = users[users.length - 1];
    const lastProject = projects[projects.length - 1];
    
    const activityLog = [
      { 
        id: 1, type: 'user', 
        message: `User baru "${lastUser?.name || 'User'}" telah ditambahkan`, 
        time: 'Baru saja' 
      },
      { 
        id: 2, type: 'project', 
        message: `Proyek "${lastProject?.title || 'Project'}" dibuat`, 
        time: '5 menit yang lalu' 
      },
      { 
        id: 3, type: 'alert', 
        message: `Ada ${pendingExperiments} laporan menunggu validasi`, 
        time: '1 jam yang lalu' 
      },
      { 
        id: 4, type: 'system', 
        message: 'System backup daily successful', 
        time: '3 jam yang lalu' 
      },
    ];

    // RETURN SEMUA DATA
    return {
      stats: {
        activeProjects,
        completedProjects,
        totalUsers,
        pendingExperiments
      },
      chartData,
      pieData,
      spotlightProject,
      activityLog
    };
  }
};