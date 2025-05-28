"use client";

import { useState, useEffect } from "react";

export default function AdminDepartments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("departments"));
    if (saved?.length) {
      setDepartments(saved);
    } else {
      const defaults = [
        { name: "Cardiology", appointments: 24 },
        { name: "Dermatology", appointments: 18 },
        { name: "Neurology", appointments: 3 },
      ];
      setDepartments(defaults);
      localStorage.setItem("departments", JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const handleAddDepartment = () => {
    const name = newDept.trim();
    if (!name) return;
    if (departments.some((d) => d.name.toLowerCase() === name.toLowerCase())) {
      alert("Department already exists!");
      return;
    }
    const updated = [...departments, { name, appointments: 0 }];
    setDepartments(updated);
    setNewDept("");
    setShowModal(false);
  };

  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        Departments
      </h2>

      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="🔍 Search..."
          className="p-2 text-sm border border-gray-300 rounded-md w-2/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowModal(true)}
          className="ml-3 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
        Add Department
        </button>
      </div>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden table-fixed text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 w-1/2">Department</th>
            <th className="p-3 w-1/2">Appointments Handled</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department, index) => (
            <tr key={index} className="border-b">
              <td className="p-3 truncate max-w-xs">{department.name}</td>
              <td className="p-3">{department.appointments}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Add Department</h3>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full p-2 text-sm border border-gray-300 rounded-md mb-4"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDepartment}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
