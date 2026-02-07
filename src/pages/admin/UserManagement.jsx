// src/pages/admin/UserManagement.jsx
import React, { useState } from "react";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  // 1. Data Dummy (Sekarang pakai Username)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      username: "budi.santoso", // Ganti Email ke Username
      role: "supervisor",
      status: "Active",
    },
    {
      id: 2,
      name: "Siti Aminah",
      username: "siti_aminah",
      role: "staff",
      status: "Active",
    },
    {
      id: 3,
      name: "Andi Pratama",
      username: "andi123",
      role: "staff",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Diana Putri",
      username: "diana.p",
      role: "supervisor",
      status: "Active",
    },
    {
      id: 5,
      name: "Eko Wijaya",
      username: "ekowijaya",
      role: "staff",
      status: "Active",
    },
  ]);

  // State Filter & Search
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // State Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Perubahan di state form: pakai username
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    role: "staff",
    password: "",
  });

  // 2. Logika Filtering (Search by Name OR Username)
  const filteredUsers = users.filter((user) => {
    const matchRole = filterRole === "all" ? true : user.role === filterRole;
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()); // Cek Username
    return matchRole && matchSearch;
  });

  // 3. Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Khusus username, kita bisa paksa huruf kecil dan tanpa spasi (Opsional)
    if (name === "username") {
      setNewUser({
        ...newUser,
        [name]: value.toLowerCase().replace(/\s/g, ""),
      });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    // Simpan data dengan username
    setUsers([
      ...users,
      {
        id: newId,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
        status: "Active",
      },
    ]);

    setIsModalOpen(false);
    setNewUser({ name: "", username: "", role: "staff", password: "" });
    alert(`User "${newUser.username}" berhasil ditambahkan!`);
  };

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
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Tambah User
        </button>
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Cari nama atau username..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
              <th width="25%">Username</th> {/* Header Berubah */}
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
                    <div style={{ fontWeight: 600, color: "#1e293b" }}>
                      {user.name}
                    </div>
                  </td>

                  {/* Tampilkan Username */}
                  <td style={{ color: "#64748b", fontFamily: "monospace" }}>
                    @{user.username}
                  </td>

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
                      <button
                        className={styles.detailBtn}
                        onClick={() => console.log("Detail:", user.username)}
                      >
                        Detail
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.editBtn}`}
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        title="Hapus"
                        onClick={() => {
                          if (window.confirm(`Hapus user ${user.username}?`))
                            setUsers(users.filter((u) => u.id !== user.id));
                        }}
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
                    padding: "40px",
                    color: "#94a3b8",
                  }}
                >
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
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
              <h3 className={styles.modalTitle}>Tambah User Baru</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  className={styles.formInput}
                  placeholder="Contoh: Ahmad Fauzi"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* INPUT USERNAME (GANTIKAN EMAIL) */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Username</label>
                <input
                  type="text"
                  name="username"
                  className={styles.formInput}
                  placeholder="Contoh: ahmad_fauzi"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Role</label>
                <select
                  name="role"
                  className={styles.formSelect}
                  value={newUser.role}
                  onChange={handleInputChange}
                >
                  <option value="staff">Staff</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password</label>
                <input
                  type="password"
                  name="password"
                  className={styles.formInput}
                  placeholder="Min. 6 karakter"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
