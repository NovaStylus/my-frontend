"use client";

import { useState } from "react";

export default function AdminTotalRevenue() {
  const [searchTerm, setSearchTerm] = useState("");

  const revenues = [
    { date: "Apr 18, 2025", patient: "John Doe", amount: "$200", status: "Completed" },
    { date: "Apr 18, 2025", patient: "Jane Smith", amount: "$150", status: "Completed" },
    { date: "Apr 18, 2025", patient: "Tom Johnson", amount: "$300", status: "Completed" },
  ];

  const filteredRevenues = revenues.filter((rev) =>
    rev.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Total Revenue
      </h2>

      <input
        type="text"
        placeholder="🔍Search by patient..."
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Date</th>
            <th className="p-4">Patient</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRevenues.map((rev, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{rev.date}</td>
              <td className="p-4">{rev.patient}</td>
              <td className="p-4">{rev.amount}</td>
              <td className="p-4">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-white ${
                    rev.status === "Completed" ? "bg-blue-500" : "bg-gray-500"
                  }`}
                >
                  {rev.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
