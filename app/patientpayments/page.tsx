"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const dummyData = [
  {
    name: "Bijo",
    department: "Dermatology",
    date: "April 10, 2024",
    amount: "2,000 TSH",
    method: "M-Pesa",
    status: "Completed",
  },
];

export default function PaymentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleDownloadReceipt = async () => {
    const input = document.getElementById("receipt-content");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("receipt.pdf");
  };

  return (
    <div className="relative">
      {/* Blurred content wrapper */}
      <div className={`max-w-6xl mx-auto p-4 transition-all duration-300 ${showModal ? "blur-sm" : ""}`}>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Payments</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{payment.name}</td>
                  <td className="p-4">{payment.department}</td>
                  <td className="p-4">{payment.date}</td>
                  <td className="p-4">{payment.amount}</td>
                  <td className="p-4">{payment.method}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewReceipt(payment)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
 {showModal && selectedPayment && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
      

      <div id="receipt-content" className="text-sm space-y-2 border p-4 rounded">
         <h3 className="text-xl font-semibold mb-4 text-center">
    MASS Payment Receipt
  </h3>
        <p><strong>Name:</strong> {selectedPayment.name}</p>
        <p><strong>Department:</strong> {selectedPayment.department}</p>
        <p><strong>Date:</strong> {selectedPayment.date}</p>
        <p><strong>Amount:</strong> {selectedPayment.amount}</p>
        <p><strong>Payment Method:</strong> {selectedPayment.method}</p>
        <p><strong>Status:</strong> {selectedPayment.status}</p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
        <button
          onClick={handleDownloadReceipt}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Receipt
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
