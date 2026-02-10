import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./StatusPieChart.css";

const StatusPieChart = ({ data }) => {
  // TERIMA PROPS DATA
  // Default data jika kosong/loading
  const safeData =
    data && data.length > 0 ? data : [{ name: "No Data", value: 1 }];

  const COLORS = ["#1c4d8d", "#4988c4", "#bde8f5"];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={safeData}
            cx="50%"
            cy="45%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {safeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="pie-cell"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: "12px",
              padding: "8px 12px",
            }}
            itemStyle={{ color: "#1c4d8d", fontWeight: 600 }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ paddingTop: "0px" }}
            formatter={(value, entry) => (
              <span
                style={{
                  color: "#334155",
                  fontSize: "14px",
                  fontWeight: 600,
                  marginLeft: "5px",
                }}
              >
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
