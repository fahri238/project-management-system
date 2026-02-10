// src/controllers/ReportController.js

// DATA DUMMY HISTORY
const historyDB = {
  admin: [
    { id: 101, title: "Laporan Rekapitulasi - Januari", date: "01 Feb 2026, 09:00", size: "1.2 MB", type: "PDF" },
    { id: 102, title: "Hasil Monev - Sistem Banjir", date: "30 Jan 2026, 14:30", size: "850 KB", type: "PDF" },
    { id: 103, title: "Distribusi Tim Q1 2026", date: "15 Jan 2026, 10:15", size: "2.4 MB", type: "PDF" },
    { id: 104, title: "Laporan Akhir Tahun 2025", date: "31 Dec 2025, 16:45", size: "5.0 MB", type: "ZIP" },
  ],
  supervisor: [
    { id: 201, title: "Status Tugas - Minggu 1 Feb", date: "07 Feb 2026, 16:00", size: "650 KB", type: "PDF" },
    { id: 202, title: "Logbook Harian - Andi & Siti", date: "06 Feb 2026, 17:30", size: "1.2 MB", type: "PDF" },
    { id: 203, title: "Rekap Validasi Tahap 1", date: "01 Feb 2026, 09:15", size: "900 KB", type: "PDF" },
  ]
};

export const ReportController = {
  // 1. GET HISTORY (Berdasarkan Role)
  getReportHistory: async (role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(historyDB[role] || []);
      }, 500);
    });
  },

  // 2. GENERATE PREVIEW DATA
  // Fungsi ini menggantikan logic 'getDummyRow' yang ada di UI sebelumnya
  // agar datanya terpusat di Controller.
  generateReportPreview: async (type, projectId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let headers = [];
        let rows = [];

        // --- LOGIC ADMIN ---
        if (type === "rekap") {
          headers = ["No", "Nama Proyek", "Supervisor", "Status", "Progress"];
          // Generate 5 baris dummy
          for (let i = 1; i <= 5; i++) {
            rows.push([
              `Proyek Demo ${i}`,
              i % 2 === 0 ? "Haldi Budiman" : "Diana Putri",
              i % 2 === 0 ? "Aktif" : "Selesai",
              `${60 + i * 5}%`
            ]);
          }
        } 
        else if (type === "monev") {
          headers = ["No", "Proyek", "Tanggal Evaluasi", "Komentar Admin", "Status"];
          for (let i = 1; i <= 5; i++) {
            rows.push([
              `Sistem IoT ${i}`,
              `2026-02-0${i}`,
              "Perlu percepatan testing modul sensor.",
              "Pending"
            ]);
          }
        }
        else if (type === "distribusi") {
          headers = ["No", "Proyek", "Supervisor", "Jumlah Staff", "Divisi"];
          for (let i = 1; i <= 5; i++) {
            rows.push([ `Proyek ${i}`, "Fahri Ilmi", `${i + 2} Orang`, "Frontend, IoT" ]);
          }
        }

        // --- LOGIC SUPERVISOR ---
        else if (type === "status_tugas") {
          headers = ["No", "Nama Staff", "Judul Tugas", "Deadline", "Status"];
          const names = ["Siti Aminah", "Andi Pratama", "Rina Kartika"];
          const status = ["Done", "In Progress", "To Do"];
          for (let i = 1; i <= 5; i++) {
            rows.push([
              names[i % 3],
              `Slicing UI Modul ${i}`,
              `2${i} Feb 2026`,
              status[i % 3]
            ]);
          }
        }
        else if (type === "logbook") {
          headers = ["No", "Tanggal", "Nama Staff", "Aktivitas / Jurnal", "File Bukti"];
          for (let i = 1; i <= 5; i++) {
            rows.push([
              `0${i} Feb 2026`,
              "Andi Pratama",
              "Melakukan soldering komponen PCB dan testing tegangan...",
              `bukti_foto_${i}.jpg`
            ]);
          }
        }
        else if (type === "validasi") {
          headers = ["No", "Judul Tugas", "Staff", "Status Awal", "Status Akhir"];
          for (let i = 1; i <= 5; i++) {
            rows.push([
              "Integrasi API Login",
              "Eko Wijaya",
              "Menunggu Validasi",
              i % 2 === 0 ? "Valid (ACC)" : "Revisi (Regex)"
            ]);
          }
        }

        resolve({ headers, rows });
      }, 1000); // Simulasi loading generate
    });
  }
};