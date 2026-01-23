// src/components/ui/StatCard.jsx
import React from 'react';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react'; // <--- Import Icon Baru

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
    minWidth: '200px'
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

  status: {
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: 0,
    fontWeight: 500 // Sedikit tebal agar jelas
  },

  icon: {
    cursor: 'pointer',
    color: 'var(--color-secondary)',
    transform: 'scale(0.8)'
  }
};

const StatCard = ({ title, value, trend, isActive }) => {
  // 1. DETEKSI LOGIKA TREND
  // Kita cek apakah teks mengandung kata "meningkat" atau "naik"
  const isTrendingUp = trend.toLowerCase().includes('meningkat') || trend.toLowerCase().includes('naik');

  // 2. TENTUKAN WARNA STATUS (Hijau jika naik, Merah jika turun)
  // Note: Jika kartu sedang Active (Biru), warna status dipaksa jadi putih terang (#e0f2fe)
  const statusColor = isActive 
    ? '#e0f2fe' 
    : (isTrendingUp ? '#10b981' : '#ef4444'); // Hijau : Merah

  // 3. Style Override untuk Kartu Aktif
  const cardStyle = isActive 
    ? { ...styles.card, backgroundColor: 'var(--color-secondary)', color: '#fff' } 
    : styles.card;
    
  const textStyle = isActive ? { color: '#fff' } : {};
  const iconStyle = isActive ? { color: '#fff' } : styles.icon;

  return (
    <div style={cardStyle}>
      <div style={styles.header}>
        <h5 style={{ ...styles.title, ...textStyle }}>{title}</h5>
        <ArrowUpRight size={20} style={iconStyle} />
      </div>
      
      <p style={{ ...styles.value, ...textStyle }}>{value}</p>
      
      {/* BAGIAN STATUS DINAMIS */}
      <div style={{ ...styles.status, color: statusColor }}>
        {/* Render Icon Sesuai Kondisi */}
        {isTrendingUp ? (
          <TrendingUp size={16} /> 
        ) : (
          <TrendingDown size={16} />
        )}
        
        <span>{trend}</span>
      </div>
    </div>
  );
};

export default StatCard;