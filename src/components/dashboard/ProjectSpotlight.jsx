// src/components/dashboard/ProjectSpotlight.jsx
import React from 'react';
import { ArrowRight, Clock, UserCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
// Kita pakai inline style utk simplisitas komponen kecil, 
// atau bisa buat ProjectSpotlight.module.css jika ingin sangat rapi.
// Di sini saya pakai style object untuk mempercepat.

const ProjectSpotlight = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem' }}>
      
      {/* Header: Status & Judul */}
      <div>
        <span style={{
          fontSize: '1rem',
          padding: '4px 12px',
          borderRadius: '20px',
          fontWeight: 600,
          textTransform: 'uppercase',
          backgroundColor: 'rgba(28, 77, 141, 0.1)',
          color: 'var(--color-primary)'
        }}>
          Active
        </span>
        <h3 style={{ 
          marginTop: '1rem', 
          fontSize: '1.8rem', 
          fontWeight: 700, 
          color: 'var(--color-primary)', 
          lineHeight: 1.2 
        }}>
          Deteksi Banjir
        </h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-faded)', marginTop: '0.5rem' }}>
          Sistem Monitoring level air real-time
        </p>
      </div>

      {/* Meta: Penanggung Jawab */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px'
      }}>
        <UserCircle size={32} color="var(--color-secondary)" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1rem', color: 'var(--color-text-faded)' }}>Supervisor</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Fahri Ilmi</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <ProgressBar 
          value={75} 
          showLabel={true} 
          height={12} 
          color="var(--color-primary)" 
        />
      </div>

      {/* Footer: Update & Button */}
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '1rem', 
        borderTop: '1px solid #eee', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
          <Clock size={14} />
          <span>Updated: 12 Feb, 15:00</span>
        </div>
        <button style={{
          width: '36px', height: '36px', borderRadius: '50%', border: 'none',
          backgroundColor: 'var(--neutral)', color: 'var(--color-primary)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default ProjectSpotlight;