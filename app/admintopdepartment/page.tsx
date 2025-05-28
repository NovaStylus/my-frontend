"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const exampleDepartments = [
  { name: "Cardiology", appointments: 40 },
  { name: "Pediatrics", appointments: 25 },
  { name: "Orthopedics", appointments: 35 },
];

export default function TopBookedDepartments() {
  const chartData = exampleDepartments.map(dept => ({
    name: dept.name,
    value: dept.appointments,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📊 Top Booked Departments
      </h2>

      <div className="bg-white rounded-xl shadow p-4 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
