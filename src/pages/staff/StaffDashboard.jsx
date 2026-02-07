import React from 'react';
import { ClipboardList, Clock, AlertTriangle, BellRing } from 'lucide-react';
import styles from '../supervisor/SupervisorDashboard.module.css'; // Reuse CSS Dashboard

const StaffDashboard = () => {
  // Dummy Stats
  const stats = {
    activeTasks: 4,
    pendingReports: 2,
    revisions: 1 
  };

  return (
    <div className={styles.container}> {/* Container Standar */}
      <div className={styles.dashboardContent}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Dashboard Kinerja</h2>
          <p className={styles.subtitle}>Ringkasan aktivitas dan tugas Anda minggu ini.</p>
        </div>

        {/* 1. NOTIFIKASI CEPAT */}
        <div style={{
          background:'#eef2ff', border:'1px solid #c7d2fe', padding:'16px', borderRadius:'12px',
          marginBottom:'30px', display:'flex', alignItems:'center', gap:'12px', color:'#3730a3'
        }}>
          <BellRing size={20} />
          <span><strong>Notifikasi Baru:</strong> Anda memiliki 1 tugas baru dari Supervisor Agus: "Revisi UI Landing Page".</span>
        </div>

        {/* 2. STAT CARDS */}
        <div className={styles.statsGrid}>
          {/* Tugas Aktif */}
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.blue}`}>
              <ClipboardList size={24} />
            </div>
            <div className={styles.statValue}>{stats.activeTasks}</div>
            <div className={styles.statLabel}>Tugas Aktif</div>
          </div>

          {/* Pending Laporan */}
          <div className={styles.statCard}>
            <div className={`${styles.iconBox} ${styles.indigo}`}>
              <Clock size={24} />
            </div>
            <div className={styles.statValue}>{stats.pendingReports}</div>
            <div className={styles.statLabel}>Laporan Pending</div>
          </div>

          {/* Revisi (Warning) */}
          <div className={styles.statCard} style={{borderColor: '#fca5a5', background:'#fef2f2'}}>
            <div className={`${styles.iconBox}`} style={{background:'#fee2e2', color:'#dc2626'}}>
              <AlertTriangle size={24} />
            </div>
            <div className={styles.statValue} style={{color:'#dc2626'}}>{stats.revisions}</div>
            <div className={styles.statLabel}>Perlu Revisi</div>
          </div>
        </div>

        {/* 3. GRAFIK KECIL (Placeholder Visual) */}
        <div>
          <h3 className={styles.sectionTitle}>Progres Mingguan Saya</h3>
          <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:'16px', padding:'24px', height:'200px', display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8'}}>
            [Grafik Batang: Senin - Jumat (Placeholder)]
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffDashboard;