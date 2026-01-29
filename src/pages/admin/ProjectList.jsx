// src/pages/admin/ProjectList.jsx
import React, { useState } from 'react';
import styles from './ProjectList.module.css'; // Pastikan path css benar

const ProjectList = () => {
  // 1. Data Dummy Proyek
  const [projects, setProjects] = useState([
    { id: 1, name: 'Sistem Informasi HRD', supervisor: 'Budi Santoso', deadline: '2026-03-20', status: 'Active' },
    { id: 2, name: 'Aplikasi E-Commerce Batik', supervisor: 'Diana Putri', deadline: '2026-02-15', status: 'Pending' },
    { id: 3, name: 'Deteksi Banjir IoT', supervisor: 'Budi Santoso', deadline: '2026-01-30', status: 'Completed' },
    { id: 4, name: 'Company Profile Sagara', supervisor: 'Diana Putri', deadline: '2026-04-10', status: 'Active' },
    { id: 5, name: 'Dashboard Monitoring', supervisor: 'Budi Santoso', deadline: '2026-05-01', status: 'Active' },
    { id: 6, name: 'Sistem Inventaris Gudang', supervisor: 'Indra Wijaya', deadline: '2026-02-28', status: 'Pending' },
  ]);

  // State Filter & Search
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Active', 'Pending', 'Completed'
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Logika Filtering
  const filteredProjects = projects.filter((project) => {
    const matchStatus = filterStatus === 'all' ? true : project.status === filterStatus;
    const matchSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        project.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Helper untuk warna badge status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return styles.statusActive;
      case 'Pending': return styles.statusPending;
      case 'Completed': return styles.statusCompleted;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Daftar Proyek</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Kelola dan pantau seluruh proyek yang berjalan
          </p>
        </div>
        <button className={styles.addButton}>
          + Tambah Proyek
        </button>
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        {/* Search */}
        <input 
          type="text" 
          placeholder="Cari proyek atau supervisor..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Tabs */}
        {['all', 'Active', 'Pending', 'Completed'].map((status) => (
          <button 
            key={status}
            className={`${styles.filterButton} ${filterStatus === status ? styles.active : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {status === 'all' ? 'Semua Proyek' : status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="5%">No</th>
              <th width="30%">Nama Proyek</th>
              <th width="20%">Supervisor</th>
              <th width="15%">Deadline</th>
              <th width="15%">Status</th>
              <th width="15%" style={{ textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{project.name}</div>
                  </td>
                  <td>{project.supervisor}</td>
                  <td style={{ color: '#64748b' }}>{project.deadline}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${getStatusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionCell}>
                      {/* Tombol Detail (Text) */}
                      <button 
                        className={styles.detailBtn}
                        onClick={() => console.log("Detail Proyek:", project.name)}
                      >
                        Detail
                      </button>

                      {/* Tombol Edit (Icon) */}
                      <button className={`${styles.iconBtn} ${styles.editBtn}`} title="Edit Proyek">
                        ✎
                      </button>

                      {/* Tombol Delete (Icon) */}
                      <button className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Hapus Proyek">
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  Tidak ada proyek yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;