"use client";

import { useState } from "react";

export default function AdminTotalRevenue() {
  const [searchTerm, setSearchTerm] = useState("");

  const revenues = [
    { date: "Apr 18, 2025", patient: "John Doe", amount: "$200", status: "Completed" },
    { date: "Apr 18, 2025", patient: "Jane Smith", amount: "$150", status: "Completed" },
    { date: "Apr 18, 2025", patient: "Tom Johnson", amount: "$300", status: "Completed" },
  ];

  // Filter revenues by patient name
  const filteredRevenues = revenues.filter((rev) =>
    rev.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sum amounts from filtered revenues
  // Strip the $ sign and convert to number, then sum
  const totalAmount = filteredRevenues.reduce((sum, rev) => {
    // Remove $ and commas if any, then convert to float
    const num = parseFloat(rev.amount.replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Total Revenue</h2>

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
            <th className="p-4">Date</th>
            <th className="p-4">Patient Name</th>
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
        {/* Add a footer row for total */}
        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td className="p-4" colSpan={2}>
              Total
            </td>
            <td className="p-4">${totalAmount.toFixed(2)}</td>
            <td className="p-4"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
