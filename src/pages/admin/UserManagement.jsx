import React, { useState, useEffect } from "react";
import styles from "./UserManagement.module.css";
import { User, Shield, Calendar, Key } from "lucide-react"; 

// IMPORT CONTROLLER
import { UserController } from "../../controllers/UserController";

const UserManagement = () => {
  // STATE DATA
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchUsers = async () => {
    try {
      const data = await UserController.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // State UI
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State Edit & Create
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // --- STATE DETAIL MODAL ---
  const [detailUser, setDetailUser] = useState(null);

  // Form State (Hanya field yang ada di DB: name, username, role, password)
  const initialFormState = {
    name: "",
    username: "",
    role: "Staff", // Default value enum
    password: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // LOGIKA FILTER
  const filteredUsers = users.filter((user) => {
    const matchRole = filterRole === "all" ? true : user.role === filterRole;
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchSearch;
  });

  // HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormData({
        ...formData,
        [name]: value.toLowerCase().replace(/\s/g, ""), // Username lowercase & no space
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setIsEditMode(true);
    setCurrentUserId(user.user_id);
    setFormData({
        name: user.name,
        username: user.username,
        role: user.role, // Pastikan casing sesuai enum (Supervisor/Staff)
        password: "" // Kosongkan saat edit
    });
    setIsModalOpen(true);
  };

  // View Detail Handler
  const handleViewDetail = (user) => {
    setDetailUser(user);
  };

  const handleCloseDetail = () => {
    setDetailUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        let result;
        if (isEditMode) {
            result = await UserController.updateUser(currentUserId, formData);
        } else {
            result = await UserController.createUser(formData);
        }

        if (result.success) {
            alert(result.message);
            fetchUsers(); 
            setIsModalOpen(false);
        }
    } catch (error) {
        alert("Gagal menyimpan data.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, username) => {
    if (window.confirm(`Yakin ingin menghapus user ${username}?`)) {
        try {
            const result = await UserController.deleteUser(id);
            if(result.success) {
                alert(result.message);
                fetchUsers();
            }
        } catch (error) {
            alert("Gagal menghapus user.");
        }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Manajemen User</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Kelola data akun Supervisor dan Staff.
          </p>
        </div>
        <button className={styles.addButton} onClick={handleOpenAdd}>
          + Tambah User
        </button>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Cari nama atau username..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {["all", "Supervisor", "Staff"].map(role => (
            <button
                key={role}
                className={`${styles.filterButton} ${filterRole === role ? styles.active : ""}`}
                onClick={() => setFilterRole(role)}
            >
                {role === 'all' ? "Semua User" : role}
            </button>
        ))}
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
            <div style={{padding:'40px', textAlign:'center', color:'#64748b'}}>Memuat data user...</div>
        ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="5%">No</th>
              <th width="30%">Nama Lengkap</th>
              <th width="20%">Username</th>
              <th width="15%">Role</th>
              <th width="20%">Terdaftar Sejak</th>
              <th width="10%" style={{ textAlign: "center" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.user_id}>
                  <td>{index + 1}</td>
                  <td><div style={{ fontWeight: 600, color: "#1e293b" }}>{user.name}</div></td>
                  <td style={{ color: "#64748b", fontFamily: "monospace" }}>@{user.username}</td>
                  <td>
                    <span className={`${styles.roleBadge} ${user.role === "Supervisor" ? styles.roleSupervisor : styles.roleStaff}`}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.9rem", color: "#64748b" }}>
                      {/* Format Tanggal Sederhana */}
                      {user.created_at ? user.created_at.split(' ')[0] : "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={styles.actionCell}>
                      <button className={styles.detailBtn} onClick={() => handleViewDetail(user)}>
                        Detail
                      </button>
                      <button className={`${styles.iconBtn} ${styles.editBtn}`} title="Edit" onClick={() => handleOpenEdit(user)}>
                        ✎
                      </button>
                      <button className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Hapus" onClick={() => handleDelete(user.user_id, user.username)}>
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>Tidak ada data ditemukan.</td></tr>
            )}
          </tbody>
        </table>
        )}
      </div>

      {/* --- MODAL FORM (CREATE/EDIT) --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{isEditMode ? "Edit User" : "Tambah User Baru"}</h3>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nama Lengkap</label>
                <input type="text" name="name" className={styles.formInput} placeholder="Contoh: Ahmad Fauzi" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Username</label>
                <input type="text" name="username" className={styles.formInput} placeholder="Contoh: ahmad_fauzi" value={formData.username} onChange={handleInputChange} required />
              </div>
              
              {/* STATUS DIHAPUS (Tidak ada di DB) */}
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Role</label>
                <select name="role" className={styles.formSelect} value={formData.role} onChange={handleInputChange}>
                  <option value="Staff">Staff</option>
                  <option value="Supervisor">Supervisor</option>
                  {/* Admin biasanya tidak dibuat lewat sini, tapi bisa ditambah jika perlu */}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{isEditMode ? "Reset Password (Opsional)" : "Password"}</label>
                <input type="password" name="password" className={styles.formInput} placeholder={isEditMode ? "Kosongkan jika tidak diubah" : "Min. 6 karakter"} value={formData.password} onChange={handleInputChange} required={!isEditMode} />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Batal</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan Data"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL DETAIL USER (Update: Hanya Info DB) --- */}
      {detailUser && (
        <div className={styles.modalOverlay} onClick={handleCloseDetail}>
            <div className={styles.modalContent} style={{maxWidth:'400px'}} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Detail Pengguna</h3>
                    <button className={styles.closeButton} onClick={handleCloseDetail}>×</button>
                </div>
                <div className={styles.detailBody} style={{paddingBottom:'20px'}}>
                    
                    {/* Header Profil */}
                    <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'24px'}}>
                        <div style={{
                            width:'60px', height:'60px', borderRadius:'50%', 
                            background:'#eff6ff', color:'#2563eb', fontSize:'1.5rem', fontWeight:'700',
                            display:'flex', alignItems:'center', justifyContent:'center'
                        }}>
                            {detailUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h4 style={{margin:0, color:'#1e293b'}}>{detailUser.name}</h4>
                            <span className={`${styles.roleBadge} ${detailUser.role === "Supervisor" ? styles.roleSupervisor : styles.roleStaff}`}>
                                {detailUser.role}
                            </span>
                        </div>
                    </div>

                    {/* List Detail Sesuai DB */}
                    <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                            <User size={18} color="#64748b"/>
                            <div>
                                <div style={{fontSize:'0.8rem', color:'#64748b'}}>Username</div>
                                <div style={{fontWeight:'500', color:'#334155'}}>@{detailUser.username}</div>
                            </div>
                        </div>
                        
                        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                            <Shield size={18} color="#64748b"/>
                            <div>
                                <div style={{fontSize:'0.8rem', color:'#64748b'}}>User ID (DB)</div>
                                <div style={{fontWeight:'500', color:'#334155'}}>#{detailUser.user_id}</div>
                            </div>
                        </div>

                        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                            <Calendar size={18} color="#64748b"/>
                            <div>
                                <div style={{fontSize:'0.8rem', color:'#64748b'}}>Terdaftar Sejak</div>
                                <div style={{fontWeight:'500', color:'#334155'}}>{detailUser.created_at}</div>
                            </div>
                        </div>
                        
                        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                            <Key size={18} color="#64748b"/>
                            <div>
                                <div style={{fontSize:'0.8rem', color:'#64748b'}}>Password</div>
                                <div style={{fontWeight:'500', color:'#334155'}}>******** (Terenkripsi)</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;