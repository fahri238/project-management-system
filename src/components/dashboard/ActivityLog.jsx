import React from 'react';
import { UserPlus, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const ActivityLog = ({ data }) => { // TERIMA PROPS DATA
  
  // Jika data belum ada (loading), pakai array kosong
  const activities = data || [];

  const getIconStyle = (type) => {
    switch (type) {
      case 'user': return { icon: <UserPlus size={18} />, color: '#10b981', bg: '#ecfdf5' };
      case 'project': return { icon: <FileText size={18} />, color: '#2563eb', bg: '#eff6ff' };
      case 'alert': return { icon: <AlertCircle size={18} />, color: '#f59e0b', bg: '#fffbeb' };
      case 'system': default: return { icon: <CheckCircle2 size={18} />, color: '#64748b', bg: '#f1f5f9' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {activities.map((activity) => {
        const style = getIconStyle(activity.type);
        return (
          <div key={activity.id} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{ minWidth: '36px', height: '36px', borderRadius: '50%', backgroundColor: style.bg, color: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
              {style.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-main)', margin: 0, lineHeight: 1.4 }}>
                {activity.message}
              </p>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
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