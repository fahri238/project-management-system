import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1. IMPORT useLocation
import styles from "./DetailMonitoring.module.css";
import {
  X,
  Send,
  History,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Info,
  ThumbsUp,
} from "lucide-react";

// IMPORT CONTROLLER
import { ProjectController } from "../../controllers/ProjectController";

const DetailMonitoring = () => {
  // 2. INITIALIZE LOCATION
  const location = useLocation();

  // STATE
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State UI lain
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("detail");

  // State Form Evaluasi
  const [evaluationNote, setEvaluationNote] = useState("");
  const [evalCategory, setEvalCategory] = useState("arahan");
  const [actionType, setActionType] = useState("notifikasi");
  const [priority, setPriority] = useState("Normal");
  const [isSending, setIsSending] = useState(false);

  const [history] = useState([
    { date: "2026-02-06", action: "Upload Progress Mingguan", user: "Supervisor" },
    { date: "2026-02-01", action: "Proyek Dimulai", user: "System" },
  ]);

  // Handlers (Definisikan dulu sebelum useEffect agar bisa dipanggil)
  const handleOpenDetail = (project) => {
    setSelectedProject(project);
    setViewMode("detail");
    setEvaluationNote("");
    setEvalCategory("arahan");
    setActionType("notifikasi");
    setPriority("Normal");
  };

  const handleClose = () => setSelectedProject(null);
  const handleSwitchToEval = () => setViewMode("eval");
  const handleBackToDetail = () => setViewMode("detail");

  const handleSubmit = async () => {
    if (!evaluationNote.trim()) {
      alert("Mohon isi pesan evaluasi.");
      return;
    }
    setIsSending(true);
    try {
      const payload = {
        note: evaluationNote,
        category: evalCategory,
        priority: priority,
        action: actionType
      };
      const result = await ProjectController.addEvaluation(selectedProject.id, payload);
      if (result.success) {
        alert(result.message);
        handleClose();
      }
    } catch (err) {
      alert("Gagal mengirim evaluasi.");
    } finally {
      setIsSending(false);
    }
  };

  // --- 3. FETCH DATA & CEK NAVIGASI ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProjectController.getAllProjects();
        setProjects(data);

        // LOGIC BARU: Cek apakah ada kiriman ID dari halaman ProjectList?
        // Jika ada, langsung buka modal detailnya
        if (location.state?.projectId) {
            const targetProject = data.find(p => p.id === location.state.projectId);
            if (targetProject) {
                // Panggil handler open detail secara otomatis
                // Kita panggil manual setState-nya karena handleOpenDetail ada di scope luar
                setSelectedProject(targetProject);
                setViewMode("detail");
                
                // (Opsional) Bersihkan state agar kalau di-refresh tidak nempel terus
                window.history.replaceState({}, document.title);
            }
        }

      } catch (error) {
        console.error("Gagal load project", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Dependency array kosong agar jalan sekali saat mount

  // ... Filter Logic & Helper Colors SAMA SEPERTI SEBELUMNYA ...
  const filteredProjects = projects.filter((project) => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getProgressColor = (p) => p === 100 ? "#10b981" : p < 40 ? "#f59e0b" : "#2563eb";
  const getStatusClass = (s) => 
    (s === "Aktif" || s === "Active") ? styles.statusAktif : 
    (s === "Pending") ? styles.statusPending : 
    (s === "Selesai" || s === "Completed") ? styles.statusSelesai : "";

  if (loading) return <div style={{padding:'40px', textAlign:'center', color:'#64748b'}}>Memuat data monitoring...</div>;

  return (
    <div className={styles.container}>
      {/* ... (Layout HTML Return SAMA PERSIS, tidak ada perubahan tampilan) ... */}
      <div className={styles.header}>
        <h2 className={styles.title}>Monitoring Proyek</h2>
        <p className={styles.subtitle}>Pantau progres dan berikan evaluasi kinerja tim.</p>
      </div>

      <div className={styles.controls}>
          <input 
            className={styles.searchInput} 
            placeholder="Cari proyek..." 
            value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)} 
          />
      </div>

      <div className={styles.gridContainer}>
            {filteredProjects.map((project) => (
            <div key={project.id} className={styles.card} onClick={() => handleOpenDetail(project)}>
                <div className={styles.cardHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={`${styles.statusBadge} ${getStatusClass(project.status)}`}>{project.status}</span>
                </div>
                <div className={styles.cardBody}>
                <p className={styles.description}>{project.description}</p>
                <div style={{ fontSize: "0.85rem", marginTop: "10px" }}>Sv: <strong>{project.supervisor}</strong></div>
                </div>
                <div className={styles.progressSection}>
                <div className={styles.progressBarBg}>
                    <div className={styles.progressBarFill} style={{ width: `${project.progress}%`, background: getProgressColor(project.progress) }}></div>
                </div>
                </div>
            </div>
            ))}
      </div>

      {selectedProject && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{viewMode === "detail" ? "Monitoring Proyek" : "Evaluasi & Feedback"}</h3>
              <button className={styles.closeBtn} onClick={handleClose}><X /></button>
            </div>
            <div className={styles.modalBody}>
                {viewMode === 'detail' && (
                    <>
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

                        <div className={styles.detailGrid}>
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
                                     {selectedProject.startDate || "-"} s/d {selectedProject.endDate || "-"}
                                  </div>
                                </div>
                            </div>
                            <div className={styles.detailSection}>
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

                        <div style={{marginTop:'24px', borderTop:'1px solid #e2e8f0', paddingTop:'20px', textAlign:'right'}}>
                            <button className={styles.btnPrimary} onClick={handleSwitchToEval}>
                            <Send size={16} /> Berikan Evaluasi / Teguran
                            </button>
                        </div>
                    </>
                )}

                {viewMode === 'eval' && (
                    <>
                        <div className={styles.snapshotBox}>
                            <div className={styles.snapshotLeft}>
                              <h4 style={{margin:'0 0 4px 0', color:'#334155'}}>{selectedProject.title}</h4>
                              <div style={{fontSize:'0.85rem', color:'#64748b'}}>Supervisor: <strong>{selectedProject.supervisor}</strong></div>
                            </div>
                            <div className={styles.snapshotStats} style={{display:'flex', alignItems:'center', gap:'20px'}}>
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
                              <div className={styles.statItem} style={{paddingLeft:'20px', borderLeft:'1px solid #e2e8f0', minWidth:'80px'}}>
                                <div className={styles.statValue} style={{color:'#ef4444'}}>{selectedProject.deadlineInfo || 'H-10'}</div>
                                <div className={styles.statLabel}>Deadline</div>
                              </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Kategori Pesan</label>
                            <div className={styles.categoryGroup}>
                              <div className={`${styles.categoryChip} ${evalCategory === 'teguran' ? styles.chipActiveTeguran : ''}`} onClick={() => setEvalCategory('teguran')}>
                                <AlertTriangle size={14}/> Teguran / Revisi
                              </div>
                              <div className={`${styles.categoryChip} ${evalCategory === 'arahan' ? styles.chipActiveArahan : ''}`} onClick={() => setEvalCategory('arahan')}>
                                <Info size={14}/> Arahan Teknis
                              </div>
                              <div className={`${styles.categoryChip} ${evalCategory === 'apresiasi' ? styles.chipActiveApresiasi : ''}`} onClick={() => setEvalCategory('apresiasi')}>
                                <ThumbsUp size={14}/> Apresiasi
                              </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Isi Pesan Evaluasi</label>
                            <textarea rows="6" className={styles.textArea} placeholder="Tuliskan evaluasi mendalam..." value={evaluationNote} onChange={(e) => setEvaluationNote(e.target.value)}></textarea>
                        </div>

                        <div className={styles.actionRow}>
                            <div className={styles.actionCol}>
                              <label className={styles.formLabel} style={{fontSize:'0.85rem'}}>Tindak Lanjut Sistem</label>
                              <div className={styles.radioGroup} style={{flexDirection:'column', gap:'8px', marginTop:'5px'}}>
                                <label style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem', cursor:'pointer'}}>
                                  <input type="radio" name="act" checked={actionType==='notifikasi'} onChange={()=>setActionType('notifikasi')}/> Kirim Notifikasi Saja
                                </label>
                                <label style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem', cursor:'pointer'}}>
                                  <input type="radio" name="act" checked={actionType==='meeting'} onChange={()=>setActionType('meeting')}/> Wajibkan Meeting Evaluasi
                                </label>
                              </div>
                            </div>
                            <div className={styles.actionCol}>
                              <label className={styles.formLabel} style={{fontSize:'0.85rem'}}>Prioritas Pesan</label>
                              <select className={styles.selectInput} value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="Normal">Normal</option>
                                <option value="High">Tinggi (Urgent)</option>
                                <option value="Low">Rendah</option>
                              </select>
                            </div>
                        </div>

                        <div className={styles.btnGroup} style={{marginTop:'24px', borderTop:'1px solid #e2e8f0', paddingTop:'20px'}}>
                            <button className={styles.btnSecondary} onClick={handleBackToDetail}><ArrowLeft size={16} style={{marginRight:'5px'}}/> Kembali</button>
                            <button className={styles.btnPrimary} onClick={handleSubmit} disabled={isSending}>
                                {isSending ? "Mengirim..." : <><Send size={16} /> Kirim Evaluasi</>}
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