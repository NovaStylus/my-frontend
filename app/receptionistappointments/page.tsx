"use client";

import { useState } from "react";

export default function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      department: "General Medicine",
      doctor: "Dr. White",
      patient: "John Doe",
      email: "john.doe@example.com",
      phone: "0765432134",
      payment: "No Fee",
      date: "Apr 18, 2025",
      time: "09:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      department: "Neurology",
      doctor: "Dr. Smith",
      patient: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "0765434434",
      payment: "5000TSH",
      date: "Apr 18, 2025",
      time: "10:00 AM",
      status: "Checked-In",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (id: number) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status:
                app.status === "Pending"
                  ? "Checked-In"
                  : app.status === "Checked-In"
                  ? "Completed"
                  : "Pending",
            }
          : app
      )
    );
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400 text-white";
      case "Checked-In":
        return "bg-green-500 text-white";
      case "Completed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const filteredAppointments = appointments.filter(
    (app) =>
      app.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Appointments</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍Search by Patient or Department"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4">Department</th>
            <th className="p-4">Patient</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Payment</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((app) => (
            <tr key={app.id} className="border-b">
              <td className="p-4">{app.department}</td>
              <td className="p-4">{app.patient}</td>
              <td className="p-4">{app.email}</td>
              <td className="p-4">{app.phone}</td>
              <td className="p-4">{app.payment}</td>
              <td className="p-4">{app.date}</td>
              <td className="p-4">{app.time}</td>
              <td className="p-4">
                <button
                  onClick={() => handleStatusChange(app.id)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
