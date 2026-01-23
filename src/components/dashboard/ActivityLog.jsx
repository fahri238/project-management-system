import React from 'react';
import { UserPlus, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const ActivityLog = () => {
  // 1. Data Dummy Aktivitas (Nanti bisa dari API)
  const activities = [
    { 
      id: 1, 
      type: 'user', 
      message: 'Fahri menambahkan user baru "Budi Santoso"', 
      time: '2 menit yang lalu' 
    },
    { 
      id: 2, 
      type: 'project', 
      message: 'Project "Deteksi Banjir" update status ke Active', 
      time: '1 jam yang lalu' 
    },
    { 
      id: 3, 
      type: 'alert', 
      message: 'Peringatan: Kapasitas server mencapai 80%', 
      time: '3 jam yang lalu' 
    },
    { 
      id: 4, 
      type: 'system', 
      message: 'Backup data harian berhasil diselesaikan', 
      time: '5 jam yang lalu' 
    },
  ];

  // 2. Helper untuk memilih Ikon & Warna berdasarkan tipe
  const getIconStyle = (type) => {
    switch (type) {
      case 'user':
        return { icon: <UserPlus size={18} />, color: '#10b981', bg: '#ecfdf5' }; // Hijau
      case 'project':
        return { icon: <FileText size={18} />, color: '#2563eb', bg: '#eff6ff' }; // Biru
      case 'alert':
        return { icon: <AlertCircle size={18} />, color: '#f59e0b', bg: '#fffbeb' }; // Kuning
      case 'system':
      default:
        return { icon: <CheckCircle2 size={18} />, color: '#64748b', bg: '#f1f5f9' }; // Abu
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {activities.map((activity) => {
        const style = getIconStyle(activity.type);
        
        return (
          <div key={activity.id} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            {/* Bagian Icon Bulat */}
            <div style={{
              minWidth: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: style.bg,
              color: style.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px' // Sedikit turun agar sejajar teks
            }}>
              {style.icon}
            </div>

            {/* Bagian Teks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--color-text-main)', 
                margin: 0, 
                lineHeight: 1.4 
              }}>
                {activity.message}
              </p>
              <span style={{ 
                fontSize: '0.85rem', 
                color: 'var(--color-text-muted)' 
              }}>
                {activity.time}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityLog;