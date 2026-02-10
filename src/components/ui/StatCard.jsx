// src/components/ui/StatCard.jsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '1.2rem',
    padding: '1.2rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.5rem',
    flex: 1,
    minWidth: '200px',
    transition: 'transform 0.2s, box-shadow 0.2s', // Animasi halus
    cursor: 'pointer' // Tanda bisa diklik
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },

  title: {
    margin: 0,
    padding: 0,
    fontSize: 'var(--fs-sm)', 
    color: 'var(--color-text-muted)',
    fontWeight: 'normal',
    lineHeight: 1
  },

  value: {
    margin: 0,
    padding: '0.5rem 0',
    fontSize: '2.4rem',
    fontWeight: 'var(--fw-semibold)',
    color: 'var(--color-text-main)',
    lineHeight: 1
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    margin: 0,
    padding: 0
  },

  trendText: {
    fontWeight: '500'
  },

  icon: {
    color: 'var(--color-text-muted)'
  }
};

const StatCard = ({ title, value, trend, isActive, onClick }) => {
  // 1. DETEKSI LOGIKA TREND
  const isTrendingUp = trend.toLowerCase().includes('meningkat') || trend.toLowerCase().includes('naik');

  // 2. TENTUKAN WARNA STATUS
  const statusColor = isActive 
    ? '#e0f2fe' 
    : (isTrendingUp ? '#10b981' : '#ef4444');

  // 3. Style Override untuk Kartu Aktif
  const cardStyle = isActive 
    ? { ...styles.card, backgroundColor: 'var(--color-secondary)', color: '#fff' } 
    : styles.card;
    
  const textStyle = isActive ? { color: '#fff' } : {};
  const iconStyle = isActive ? { color: '#fff' } : styles.icon;

  return (
    <div 
      style={cardStyle} 
      onClick={onClick} // Tambahkan event klik
      className="stat-card-hover" // Class untuk CSS eksternal (efek hover)
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
      }}
    >
      <div style={styles.header}>
        <h5 style={{ ...styles.title, ...textStyle }}>{title}</h5>
        <ArrowUpRight size={20} style={iconStyle} />
      </div>
      
      <p style={{ ...styles.value, ...textStyle }}>{value}</p>
      
      <div style={styles.footer}>
        <span style={{ 
          color: statusColor, 
          backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : (isTrendingUp ? '#ecfdf5' : '#fef2f2'),
          padding: '2px 8px',
          borderRadius: '12px',
          ...styles.trendText
        }}>
          {isTrendingUp ? '↗' : '↘'} 
        </span>
        <span style={{ color: isActive ? '#e0f2fe' : 'var(--color-text-muted)', fontSize: '0.8rem' }}>
          {trend}
        </span>
      </div>
    </div>
  );
};

export default StatCard;