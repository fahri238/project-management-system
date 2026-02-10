// src/controllers/UserController.js

// DATA DUMMY (Sesuai tabel users.csv: user_id, name, username, password, role, created_at)
let usersDB = [
  {
    user_id: 1,
    name: "Budi Santoso",
    username: "budi.santoso",
    role: "Supervisor",
    created_at: "2025-12-01 08:00:00",
  },
  {
    user_id: 2,
    name: "Siti Aminah",
    username: "siti_aminah",
    role: "Staff",
    created_at: "2026-01-10 09:30:00",
  },
  {
    user_id: 3,
    name: "Andi Pratama",
    username: "andi123",
    role: "Staff",
    created_at: "2026-01-15 10:00:00",
  },
  {
    user_id: 4,
    name: "Diana Putri",
    username: "diana.p",
    role: "Supervisor",
    created_at: "2025-11-20 14:00:00",
  },
  {
    user_id: 5,
    name: "Eko Wijaya",
    username: "ekowijaya",
    role: "Staff",
    created_at: "2026-02-01 08:15:00",
  },
  {
    user_id: 104,
    name: "Rina Kartika",
    username: "rina.k",
    role: "Staff",
    created_at: "2026-02-05 11:00:00",
  },
  {
    user_id: 105,
    name: "Fajar Nugraha",
    username: "fajar.n",
    role: "Staff",
    created_at: "2026-02-06 09:00:00",
  },
  {
    user_id: 106,
    name: "Dewi Lestari",
    username: "dewi.l",
    role: "Staff",
    created_at: "2026-02-07 14:30:00",
  },
];

export const UserController = {
  // 1. GET ALL USERS (Untuk Halaman Manajemen User Admin)
  getAllUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...usersDB]), 500);
    });
  },

  // 2. GET ALL STAFF (PENTING: Ini yang dicari oleh TaskManagement.jsx)
  getAllStaff: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter hanya user dengan role 'Staff'
        const staffOnly = usersDB.filter((u) => u.role === "Staff");
        resolve(staffOnly);
      }, 300);
    });
  },

  // 3. CREATE USER
  createUser: async (userData) => {
    const newUser = {
      user_id: Date.now(),
      name: userData.name,
      username: userData.username,
      role: userData.role,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    usersDB.push(newUser);
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            success: true,
            message: `User ${newUser.username} berhasil dibuat!`,
          }),
        800,
      );
    });
  },

  // 4. UPDATE USER
  updateUser: async (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = usersDB.findIndex((u) => u.user_id === id);
        if (index !== -1) {
          usersDB[index] = {
            ...usersDB[index],
            name: updatedData.name,
            username: updatedData.username,
            role: updatedData.role,
          };
          resolve({ success: true, message: "Data user berhasil diperbarui." });
        } else {
          resolve({ success: false, message: "User tidak ditemukan." });
        }
      }, 800);
    });
  },

  // 5. DELETE USER
  deleteUser: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        usersDB = usersDB.filter((u) => u.user_id !== id);
        resolve({ success: true, message: "User berhasil dihapus." });
      }, 600);
    });
  },
};
