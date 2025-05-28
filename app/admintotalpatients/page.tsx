"use client";

import { useState } from "react";

export default function AdminTotalPatients() {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    { name: "John Doe", email: "john@example.com", phone: "0700000001", appointments: 4 },
    { name: "Jane Smith", email: "jane@example.com", phone: "0700000002", appointments: 2 },
    { name: "Tom Johnson", email: "tomj@example.com", phone: "0700000003", appointments: 5 },
  ];

  const filteredPatients = patients.filter((pat) =>
    pat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
      Total Patients
      </h2>

      <input
        type="text"
        placeholder="🔍Search by Patient Name..."
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Patient Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Appointments</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((pat, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{pat.name}</td>
              <td className="p-4">{pat.email}</td>
              <td className="p-4">{pat.phone}</td>
              <td className="p-4">{pat.appointments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
