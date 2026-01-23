// src/components/charts/ReusableBarChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// --- IMPORT FILE CSS YANG BARU KITA BUAT ---
import "./ReusableBarChart.css";

const ReusableBarChart = ({
  data,
  xKey = "name",
  yKey = "value",
  color = "#2563eb",
  layout = "horizontal",
}) => {
  const isVertical = layout === "vertical";

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            type={isVertical ? "number" : "category"}
            dataKey={isVertical ? undefined : xKey}
            hide={isVertical}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            type={isVertical ? "category" : "number"}
            dataKey={isVertical ? xKey : undefined}
            width={isVertical ? 40 : 30}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize:"1.1rem",
              padding: "0.4rem 0.8em",
            }}
          />

          <Bar
            dataKey={yKey}
            radius={[4, 4, 4, 4]}
            barSize={isVertical ? 20 : 40}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={color}
                // --- KITA GUNAKAN CLASS CSS DISINI ---
                className="bar-cell"
                // Kita atur titik tumpu (Origin) lewat inline style
                // karena tergantung layout (vertical/horizontal)
                style={{
                  transformOrigin: isVertical ? "left center" : "bottom center",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableBarChart;
