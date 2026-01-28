// src/pages/admin/UserManagement.jsx
import React, { useState } from "react";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  // 1. Data Dummy (Nanti diganti API)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@sagara.ai",
      role: "supervisor",
      status: "Active",
    },
    {
      id: 2,
      name: "Siti Aminah",
      email: "siti@sagara.ai",
      role: "staff",
      status: "Active",
    },
    {
      id: 3,
      name: "Andi Pratama",
      email: "andi@sagara.ai",
      role: "staff",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Diana Putri",
      email: "diana@sagara.ai",
      role: "supervisor",
      status: "Active",
    },
    {
      id: 5,
      name: "Eko Wijaya",
      email: "eko@sagara.ai",
      role: "staff",
      status: "Active",
    },
  ]);

  // State untuk Filter & Search
  const [filterRole, setFilterRole] = useState("all"); // 'all', 'supervisor', 'staff'
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Logika Filtering
  const filteredUsers = users.filter((user) => {
    const matchRole = filterRole === "all" ? true : user.role === filterRole;
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Manajemen User</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Kelola data Supervisor dan Staff Sagara AI
          </p>
        </div>
        <button className={styles.addButton}>+ Tambah User</button>
      </div>

      {/* CONTROLS (Search & Filter Tabs) */}
      <div className={styles.controls}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Cari nama atau email..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Tabs */}
        <button
          className={`${styles.filterButton} ${filterRole === "all" ? styles.active : ""}`}
          onClick={() => setFilterRole("all")}
        >
          Semua User
        </button>
        <button
          className={`${styles.filterButton} ${filterRole === "supervisor" ? styles.active : ""}`}
          onClick={() => setFilterRole("supervisor")}
        >
          Supervisor
        </button>
        <button
          className={`${styles.filterButton} ${filterRole === "staff" ? styles.active : ""}`}
          onClick={() => setFilterRole("staff")}
        >
          Staff
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="5%">No</th>
              <th width="25%">Nama Lengkap</th>
              <th width="25%">Email</th>
              <th width="15%">Role</th>
              <th width="15%">Status</th>
              <th width="15%" style={{ textAlign: "center" }}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{user.name}</div>
                  </td>
                  <td style={{ color: "#64748b" }}>{user.email}</td>
                  <td>
                    <span
                      className={`${styles.roleBadge} ${user.role === "supervisor" ? styles.roleSupervisor : styles.roleStaff}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: user.status === "Active" ? "#16a34a" : "#94a3b8",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      ● {user.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={styles.actionCell}>
                      {/* 1. Detail (TEXT ONLY) */}
                      <button
                        className={styles.detailBtn}
                        onClick={() => console.log("Detail user:", user.name)}
                      >
                        Detail
                      </button>

                      {/* 2. Edit (ICON ONLY) */}
                      <button
                        className={`${styles.iconBtn} ${styles.editBtn}`}
                        title="Edit"
                      >
                        ✎
                      </button>

                      {/* 3. Delete (ICON ONLY) */}
                      <button
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        title="Hapus"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#94a3b8",
                  }}
                >
                  Tidak ada data user ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
