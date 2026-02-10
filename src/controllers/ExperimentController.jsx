// src/controllers/ExperimentController.js

// DATA DUMMY (DATABASE SEMENTARA)
let experimentsDB = [
  {
    id: 1,
    staffName: "Siti Aminah",
    taskTitle: "Cleaning Data Curah Hujan",
    date: "07 Feb 2026",
    description:
      "Saya telah membersihkan data null dan duplikat menggunakan Pandas.",
    file: "cleaning_result_v1.csv",
    status: "Menunggu Validasi",
    taskId: 101, // ID Tugas terkait
  },
  {
    id: 2,
    staffName: "Andi Pratama",
    taskTitle: "Setup Sensor Ultrasonik",
    date: "06 Feb 2026",
    description:
      "Sensor telah dipasang di pin D4 dan D5. Dokumentasi terlampir.",
    file: "dokumentasi_sensor.pdf",
    status: "Menunggu Validasi",
    taskId: 102,
  },
  {
    id: 3,
    staffName: "Rina Kartika",
    taskTitle: "Desain Wireframe Dashboard",
    date: "05 Feb 2026",
    description: "Revisi desain dashboard admin sesuai feedback minggu lalu.",
    file: "wireframe_v2.fig",
    status: "Revisi",
    taskId: 103,
  },
  {
    id: 7,
    staffName: "Reza Rahardian",
    taskTitle: "Konfigurasi Docker Container",
    date: "04 Feb 2026",
    description: "Docker Compose untuk environment development sudah siap.",
    file: "docker-compose.yml",
    status: "Valid",
    taskId: 107,
  },
  // ... Tambahkan data lain jika perlu
];

export const ExperimentController = {
  // 1. UPLOAD (Staff)
  uploadExperiment: async (data) => {
    // ... kode upload sebelumnya ...
  },

  // 2. GET ALL EXPERIMENTS (Supervisor - Halaman Validasi)
  getAllExperiments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Urutkan: Menunggu Validasi paling atas
        const sorted = [...experimentsDB].sort((a, b) => {
          if (
            a.status === "Menunggu Validasi" &&
            b.status !== "Menunggu Validasi"
          )
            return -1;
          if (
            a.status !== "Menunggu Validasi" &&
            b.status === "Menunggu Validasi"
          )
            return 1;
          return 0;
        });
        resolve(sorted);
      }, 500);
    });
  },

  // 3. VALIDASI (Supervisor - Aksi Simpan)
  validateExperiment: async (experimentId, newStatus, feedback) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Cari dan update di DB dummy
        const index = experimentsDB.findIndex((e) => e.id === experimentId);
        if (index !== -1) {
          experimentsDB[index].status = newStatus;
          experimentsDB[index].feedback = feedback; // Simpan feedback

          resolve({
            success: true,
            message: `Laporan berhasil divalidasi sebagai ${newStatus}.`,
          });
        } else {
          resolve({ success: false, message: "Laporan tidak ditemukan." });
        }
      }, 800);
    });
  },
};
