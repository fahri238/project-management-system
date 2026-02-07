import React, { useState } from "react";
import styles from "./DetailMonitoring.module.css";
import {
  X,
  Send,
  History,
  ArrowLeft,
  Calendar,
  BellRing,
  AlertTriangle,
  Info,
  ThumbsUp,
} from "lucide-react";

const DetailMonitoring = () => {
  // --- DATA DUMMY ---
  const [projects] = useState([
    {
      id: 1,
      title: "Sistem Deteksi Banjir IoT",
      category: "Internet of Things",
      description:
        "Pengembangan model machine learning untuk prediksi level air real-time.",
      supervisor: "Haldi Budiman",
      progress: 75,
      status: "Aktif",
      // Data tambahan simulasi untuk snapshot
      deadlineInfo: "H-13",
      pendingRevisions: 2,
      projectCode: "#PRJ-2026-001",
    },
    {
      id: 2,
      title: "AI Chatbot Layanan Publik",
      category: "Artificial Intelligence",
      description: "Pembuatan agen cerdas untuk otomatisasi balasan layanan pelanggan.",
      supervisor: "Fahri Ilmi",
      progress: 30,
      status: "Pending",
      deadlineInfo: "H-45",
      pendingRevisions: 0,
      projectCode: "#PRJ-2026-002",
    },
    {
      id: 3,
      title: "Manajemen Proyek Sagara",
      category: "Web Development",
      description: "Sistem informasi monitoring dan evaluasi proyek internal.",
      supervisor: "Haldi Budiman",
      progress: 100,
      status: "Selesai",
      deadlineInfo: "Selesai",
      pendingRevisions: 0,
      projectCode: "#PRJ-2026-003",
    },
    {
      id: 4,
      title: "Absensi Wajah Biometrik",
      category: "Computer Vision",
      description: "Sistem absensi otomatis menggunakan Computer Vision dan Face Recognition.",
      supervisor: "Siti Aminah",
      progress: 60,
      status: "Aktif",
      deadlineInfo: "H-20",
      pendingRevisions: 5,
      projectCode: "#PRJ-2026-004",
    },
    {
      id: 5,
      title: "Smart Farming Hidroponik",
      category: "Internet of Things",
      description: "Monitoring pH air dan nutrisi tanaman berbasis IoT via aplikasi mobile.",
      supervisor: "Haldi Budiman",
      progress: 90,
      status: "Aktif",
      deadlineInfo: "H-5",
      pendingRevisions: 1,
      projectCode: "#PRJ-2026-005",
    },
    {
      id: 6,
      title: "Analisis Sentimen Pilkada",
      category: "Data Science",
      description: "Crawling data Twitter/X untuk analisis sentimen calon kepala daerah.",
      supervisor: "Fahri Ilmi",
      progress: 100,
      status: "Selesai",
      deadlineInfo: "Selesai",
      pendingRevisions: 0,
      projectCode: "#PRJ-2026-006",
    },
    {
      id: 7,
      title: "Marketplace Katering UMKM",
      category: "Web Development",
      description: "Platform web penghubung penyedia katering lokal dengan kantor/event.",
      supervisor: "Siti Aminah",
      progress: 15,
      status: "Pending",
      deadlineInfo: "H-90",
      pendingRevisions: 0,
      projectCode: "#PRJ-2026-007",
    },
    {
      id: 8,
      title: "Deteksi Kantuk Pengemudi",
      category: "Artificial Intelligence",
      description: "Sistem peringatan dini menggunakan kamera dashboard dan sensor mata.",
      supervisor: "Haldi Budiman",
      progress: 45,
      status: "Aktif",
      deadlineInfo: "H-30",
      pendingRevisions: 3,
      projectCode: "#PRJ-2026-008",
    },
    {
      id: 9,
      title: "Verifikasi Ijazah Blockchain",
      category: "Blockchain",
      description: "Implementasi Smart Contract untuk mencegah pemalsuan dokumen akademik.",
      supervisor: "Fahri Ilmi",
      progress: 5,
      status: "Pending",
      deadlineInfo: "H-120",
      pendingRevisions: 0,
      projectCode: "#PRJ-2026-009",
    },
    // ... data lainnya sama ...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("detail");

  // --- STATE FORM EVALUASI BARU ---
  const [evaluationNote, setEvaluationNote] = useState("");
  const [evalCategory, setEvalCategory] = useState("arahan"); // teguran, arahan, apresiasi
  const [actionType, setActionType] = useState("notifikasi");
  const [priority, setPriority] = useState("Normal");

  const [history] = useState([
    {
      date: "2026-02-06",
      action: "Upload Progress Mingguan",
      user: "Supervisor",
    },
    { date: "2026-02-01", action: "Proyek Dimulai", user: "System" },
  ]);

  // Handlers
  const handleOpenDetail = (project) => {
    setSelectedProject(project);
    setViewMode("detail");
    // Reset Form
    setEvaluationNote("");
    setEvalCategory("arahan");
    setActionType("notifikasi");
    setPriority("Normal");
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleSwitchToEval = () => setViewMode("eval");
  const handleBackToDetail = () => setViewMode("detail");

  const handleSubmit = () => {
    if (!evaluationNote.trim()) {
      alert("Mohon isi pesan evaluasi terlebih dahulu.");
      return;
    }
    const msg = `Evaluasi Terkirim!\n\nJenis: ${evalCategory.toUpperCase()}\nPrioritas: ${priority}\nTindakan: ${actionType}`;
    alert(msg);
    handleClose();
  };

  // ... Filter Logic & Helper Colors sama seperti sebelumnya ...
  // (Saya persingkat disini agar fokus ke perubahan UI)
  const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const getProgressColor = (progress) =>
    progress === 100 ? "#10b981" : progress < 40 ? "#f59e0b" : "#2563eb";
  const getStatusClass = (status) =>
    status === "Aktif"
      ? styles.statusAktif
      : status === "Pending"
        ? styles.statusPending
        : "";

  return (
    <div className={styles.container}>
      {/* ... HEADER & GRID PROJECT (Sama seperti sebelumnya) ... */}
      <div className={styles.header}>
        <h2 className={styles.title}>Monitoring Proyek</h2>
        <p className={styles.subtitle}>
          Pantau progres dan berikan evaluasi kinerja tim.
        </p>
      </div>

      {/* Grid Projects (Code Grid Project Sama - tidak diubah) */}
      <div className={styles.gridContainer}>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={styles.card}
            onClick={() => handleOpenDetail(project)}
          >
            {/* Isi Card Proyek Sama ... */}
            <div className={styles.cardHeader}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span
                className={`${styles.statusBadge} ${getStatusClass(project.status)}`}
              >
                {project.status}
              </span>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.description}>{project.description}</p>
              <div style={{ fontSize: "0.85rem", marginTop: "10px" }}>
                Sv: <strong>{project.supervisor}</strong>
              </div>
            </div>
            <div className={styles.progressSection}>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${project.progress}%`,
                    background: getProgressColor(project.progress),
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL UTAMA --- */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>
                  {viewMode === "detail"
                    ? "Monitoring Proyek"
                    : "Evaluasi & Feedback"}
                </h3>
                {viewMode === "eval" && (
                  <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    ID: {selectedProject.projectCode || "#PRJ-GEN-001"}
                  </div>
                )}
              </div>
              <button className={styles.closeBtn} onClick={handleClose}>
                <X />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* VIEW 1: DETAIL (Tetap Sama) */}
              {/* --- TAMPILAN 1: DETAIL VIEW (RICH DATA SESUAI DB) --- */}
              {viewMode === 'detail' && (
                <>
                  {/* HEADER WITH PROGRESS */}
                  <div className={styles.wireframeDetailHeader}>
                    <div className={styles.headerLeft}>
                      <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'6px'}}>
                         <h2 style={{margin:0}}>{selectedProject.title}</h2>
                         <span className={`${styles.statusBadge} ${getStatusClass(selectedProject.status)}`}>
                            {selectedProject.status}
                         </span>
                      </div>
                      <p style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'0.9rem', color:'#64748b'}}>
                         <span style={{fontWeight:'600', color:'#334155'}}>Supervisor:</span> {selectedProject.supervisor} 
                         <span style={{margin:'0 4px'}}>•</span> 
                         <span>{selectedProject.category}</span>
                      </p>
                    </div>
                    <div className={styles.headerRight}>
                      <div className={styles.wfProgressContainer}>
                        <div 
                          className={styles.wfProgressFill} 
                          style={{width: `${selectedProject.progress}%`, background: getProgressColor(selectedProject.progress)}}
                        ></div>
                      </div>
                      <small>Overall Progress: {selectedProject.progress}%</small>
                    </div>
                  </div>

                  {/* GRID INFORMASI DETAIL (Grid 2 Kolom) */}
                  <div className={styles.detailGrid}>
                    
                    {/* KOLOM KIRI: Deskripsi & Waktu (Tabel: projects) */}
                    <div className={styles.detailSection}>
                       <h4 className={styles.sectionTitle}>Informasi Proyek</h4>
                       
                       <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Deskripsi:</span>
                          <p className={styles.infoText}>{selectedProject.description}</p>
                       </div>

                       <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Periode Pengerjaan:</span>
                          <div className={styles.dateBadge}>
                             <Calendar size={14}/>
                             {selectedProject.startDate} s/d {selectedProject.endDate}
                          </div>
                       </div>
                    </div>

                    {/* KOLOM KANAN: Statistik Tugas & Tim (Tabel: tasks & project_members) */}
                    <div className={styles.detailSection}>
                       
                       {/* Statistik Tugas (Agregasi Tabel Tasks) */}
                       <h4 className={styles.sectionTitle}>Statistik Tugas</h4>
                       <div className={styles.taskStatsGrid}>
                          <div className={styles.taskStatBox}>
                             <span className={styles.statNumber}>{selectedProject.taskStats?.total || 0}</span>
                             <span className={styles.statLabel}>Total Tugas</span>
                          </div>
                          <div className={styles.taskStatBox} style={{borderColor:'#86efac', background:'#f0fdf4'}}>
                             <span className={styles.statNumber} style={{color:'#15803d'}}>{selectedProject.taskStats?.completed || 0}</span>
                             <span className={styles.statLabel} style={{color:'#15803d'}}>Selesai</span>
                          </div>
                          <div className={styles.taskStatBox} style={{borderColor:'#fca5a5', background:'#fef2f2'}}>
                             <span className={styles.statNumber} style={{color:'#b91c1c'}}>{selectedProject.taskStats?.pending || 0}</span>
                             <span className={styles.statLabel} style={{color:'#b91c1c'}}>Pending</span>
                          </div>
                       </div>

                       {/* Anggota Tim (Tabel Project_Members) */}
                       <div style={{marginTop:'20px'}}>
                          <h4 className={styles.sectionTitle}>Anggota Tim (Staff)</h4>
                          <div className={styles.memberTags}>
                             {selectedProject.team?.map((member, idx) => (
                                <span key={idx} className={styles.memberBadge}>{member}</span>
                             )) || <span style={{color:'#94a3b8', fontStyle:'italic'}}>Belum ada anggota</span>}
                          </div>
                       </div>

                    </div>
                  </div>

                  {/* TIMELINE AKTIVITAS (Log System) */}
                  <div className={styles.timelineContainer}>
                    <h4 style={{marginBottom:'16px', color:'#334155', display:'flex', alignItems:'center', gap:'8px', fontSize:'1rem'}}>
                      <History size={18}/> Riwayat Aktivitas Terakhir
                    </h4>
                    {history.map((h, i) => (
                      <div key={i} style={{display:'flex', gap:'12px', marginBottom:'12px'}}>
                        <div style={{minWidth:'90px', fontSize:'0.8rem', color:'#64748b', fontWeight:'500'}}>{h.date}</div>
                        <div style={{fontSize:'0.9rem', color:'#334155'}}>
                          <strong>{h.user}:</strong> {h.action}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div style={{marginTop:'24px', borderTop:'1px solid #e2e8f0', paddingTop:'20px', textAlign:'right'}}>
                    <button className={styles.btnPrimary} onClick={handleSwitchToEval}>
                      <Send size={16} /> Berikan Evaluasi / Teguran
                    </button>
                  </div>
                </>
              )}

              {/* VIEW 2: FORM EVALUASI (UPDATED - RICH UI) */}
              {viewMode === 'eval' && (
                <>
                  {/* 1. PROJECT SNAPSHOT (REVISI: Progress Bar & Hapus Stats Revisi) */}
                  <div className={styles.snapshotBox}>
                    <div className={styles.snapshotLeft}>
                      <h4 style={{margin:'0 0 4px 0', color:'#334155'}}>{selectedProject.title}</h4>
                      <div style={{fontSize:'0.85rem', color:'#64748b'}}>Supervisor: <strong>{selectedProject.supervisor}</strong></div>
                    </div>
                    
                    <div className={styles.snapshotStats} style={{display:'flex', alignItems:'center', gap:'20px'}}>
                      
                      {/* PROGRESS BAR (Tampilan Baru) */}
                      <div style={{flex: 1}}>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
                           <span className={styles.statLabel}>Overall Progress</span>
                           <span style={{fontWeight:'700', color:'#334155', fontSize:'0.9rem'}}>{selectedProject.progress}%</span>
                        </div>
                        <div style={{height:'10px', width:'100%', backgroundColor:'#e2e8f0', borderRadius:'5px', overflow:'hidden'}}>
                           <div 
                             style={{
                               height:'100%', 
                               width:`${selectedProject.progress}%`, 
                               backgroundColor: getProgressColor(selectedProject.progress),
                               transition: 'width 0.5s ease'
                             }}
                           ></div>
                        </div>
                      </div>

                      {/* DEADLINE (Tetap Ada, Revisi Dihapus) */}
                      <div className={styles.statItem} style={{paddingLeft:'20px', borderLeft:'1px solid #e2e8f0', minWidth:'80px'}}>
                        <div className={styles.statValue} style={{color:'#ef4444'}}>{selectedProject.deadlineInfo || 'H-10'}</div>
                        <div className={styles.statLabel}>Deadline</div>
                      </div>

                    </div>
                  </div>

                  {/* 2. FORM INPUT (Sama seperti sebelumnya) */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Kategori Pesan</label>
                    <div className={styles.categoryGroup}>
                      <div 
                        className={`${styles.categoryChip} ${evalCategory === 'teguran' ? styles.chipActiveTeguran : ''}`}
                        onClick={() => setEvalCategory('teguran')}
                      >
                        <AlertTriangle size={14}/> Teguran / Revisi
                      </div>
                      <div 
                        className={`${styles.categoryChip} ${evalCategory === 'arahan' ? styles.chipActiveArahan : ''}`}
                        onClick={() => setEvalCategory('arahan')}
                      >
                        <Info size={14}/> Arahan Teknis
                      </div>
                      <div 
                        className={`${styles.categoryChip} ${evalCategory === 'apresiasi' ? styles.chipActiveApresiasi : ''}`}
                        onClick={() => setEvalCategory('apresiasi')}
                      >
                        <ThumbsUp size={14}/> Apresiasi
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Isi Pesan Evaluasi</label>
                    <textarea 
                      rows="6" 
                      className={styles.textArea} 
                      placeholder="Tuliskan evaluasi mendalam terkait performa tim atau kualitas hasil kerja..."
                      value={evaluationNote}
                      onChange={(e) => setEvaluationNote(e.target.value)}
                    ></textarea>
                  </div>

                  {/* 3. ACTION & PRIORITY ROW (Sama seperti sebelumnya) */}
                  <div className={styles.actionRow}>
                    <div className={styles.actionCol}>
                      <label className={styles.formLabel} style={{fontSize:'0.85rem'}}>Tindak Lanjut Sistem</label>
                      <div className={styles.radioGroup} style={{flexDirection:'column', gap:'8px', marginTop:'5px'}}>
                        <label style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem', cursor:'pointer'}}>
                          <input type="radio" name="act" checked={actionType==='notifikasi'} onChange={()=>setActionType('notifikasi')}/> 
                          Kirim Notifikasi Saja
                        </label>
                        <label style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem', cursor:'pointer'}}>
                          <input type="radio" name="act" checked={actionType==='meeting'} onChange={()=>setActionType('meeting')}/> 
                          Wajibkan Meeting Evaluasi
                        </label>
                      </div>
                    </div>
                    
                    <div className={styles.actionCol}>
                      <label className={styles.formLabel} style={{fontSize:'0.85rem'}}>Prioritas Pesan</label>
                      <select 
                        className={styles.selectInput}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="Normal">Normal</option>
                        <option value="High">Tinggi (Urgent)</option>
                        <option value="Low">Rendah</option>
                      </select>
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className={styles.btnGroup} style={{marginTop:'24px', borderTop:'1px solid #e2e8f0', paddingTop:'20px'}}>
                    <button className={styles.btnSecondary} onClick={handleBackToDetail}>
                      <ArrowLeft size={16} style={{marginRight:'5px'}}/> Kembali
                    </button>
                    <button className={styles.btnPrimary} onClick={handleSubmit}>
                      <Send size={16} /> Kirim Evaluasi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMonitoring;
