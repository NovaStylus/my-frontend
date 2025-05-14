"use client";

import { useState } from "react";

export default function AdminDepartments() {
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    { name: "Cardiology", appointments: 24, doctorsCount: 5 },
    { name: "Dermatology", appointments: 18, doctorsCount: 3 },
    { name: "Neurology", appointments: 30, doctorsCount: 4 },
  ];

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        Departments
      </h2>

      <input
        type="text"
        placeholder="🔍Search by department..."
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Department</th>
            <th className="p-4">Appointments Handled</th>
            <th className="p-4">Total Doctors</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{department.name}</td>
              <td className="p-4">{department.appointments}</td>
              <td className="p-4">{department.doctorsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


