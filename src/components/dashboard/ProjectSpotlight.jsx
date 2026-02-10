// src/components/dashboard/ProjectSpotlight.jsx
import React from 'react';
import { ArrowRight, Clock, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import Navigate
import ProgressBar from './ProgressBar';

const ProjectSpotlight = ({ project }) => {
  const navigate = useNavigate(); // Hook Navigasi

  if (!project) return <div>Loading...</div>;

  // Handler Tombol Panah
  const handleGoToDetail = () => {
    // Arahkan ke monitoring dengan state projectId
    // (DetailMonitoring.jsx akan membaca state ini dan membuka modal otomatis)
    navigate('/admin/monitoring', { 
      state: { projectId: project.id } 
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <span style={{
          fontSize: '1rem', padding: '4px 12px', borderRadius: '20px', fontWeight: 600,
          textTransform: 'uppercase', backgroundColor: 'rgba(28, 77, 141, 0.1)', color: 'var(--color-primary)'
        }}>
          {project.status || 'Active'}
        </span>
        <h3 style={{ marginTop: '1rem', fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1.2 }}>
          {project.title || 'Judul Proyek'}
        </h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-faded)', marginTop: '0.5rem' }}>
          {project.description || 'Deskripsi proyek...'}
        </p>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
        <UserCircle size={32} color="var(--color-secondary)" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1rem', color: 'var(--color-text-faded)' }}>Supervisor</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>{project.supervisor || '-'}</span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <ProgressBar 
          value={project.progress || 0} 
          showLabel={true} 
          height={12} 
          color="var(--color-primary)" 
        />
      </div>

      {/* Footer & ACTION BUTTON */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
          <Clock size={14} />
          <span>Deadline: {project.deadlineInfo || '-'}</span>
        </div>
        
        {/* TOMBOL AKTIF */}
        <button 
          onClick={handleGoToDetail}
          style={{ 
            width: '36px', height: '36px', borderRadius: '50%', border: 'none', 
            backgroundColor: 'var(--neutral)', color: 'var(--color-primary)', 
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e7ff'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral)'}
          title="Lihat Detail Monitoring"
        >
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default ProjectSpotlight;