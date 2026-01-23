// src/components/ui/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ value, height = 10, color = 'var(--color-primary)', showLabel = false }) => {
  return (
    <div style={{ width: '100%' }}>
      {/* Label (Opsional) */}
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
          <span>Progress</span>
          <span style={{ color: color }}>{value}%</span>
        </div>
      )}

      {/* Track (Lintasan Abu-abu) */}
      <div style={{ 
        width: '100%', 
        height: `${height}px`, 
        backgroundColor: '#e2e8f0', 
        borderRadius: '99px',
        overflow: 'hidden'
      }}>
        {/* Fill (Isi Warna) */}
        <div style={{ 
          width: `${value}%`, 
          height: '100%', 
          backgroundColor: color, 
          borderRadius: '99px',
          transition: 'width 1s ease-in-out' // Animasi gerak
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;