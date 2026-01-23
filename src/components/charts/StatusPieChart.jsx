// src/components/charts/StatusPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Import CSS Animation
import './StatusPieChart.css'; 

const StatusPieChart = () => {
  const data = [
    { name: 'Selesai', value: 60 },
    { name: 'Aktif', value: 20 },
    { name: 'Pending', value: 20 },
  ];

  const COLORS = ['#1c4d8d', '#4988c4', '#bde8f5'];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%" 
            innerRadius={50}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                
                // --- TERAPKAN CLASS CSS ---
                className="pie-cell"
              />
            ))}
          </Pie>
          
          <Tooltip 
             contentStyle={{ 
               borderRadius: '8px', 
               border: 'none', 
               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
               fontSize: '12px',
               padding: '8px 12px'
             }}
             itemStyle={{ color: '#1c4d8d', fontWeight: 600 }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            iconSize={10} // Sedikit diperbesar dari 8 ke 10 agar imbang
            
            // --- MODIFIKASI LEGEND AGAR LEBIH KELIHATAN ---
            wrapperStyle={{ 
              paddingTop: '0px'
            }}
            
            // Kita gunakan formatter untuk styling teks legend secara spesifik
            formatter={(value, entry) => (
              <span style={{ 
                color: '#334155',       // Warna abu tua (Slate 700) -> Lebih kontras
                fontSize: '14px',       // Ukuran pas
                fontWeight: 600,        // Semi-bold agar tegas
                marginLeft: '5px'       // Jarak dari icon bulat
              }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;