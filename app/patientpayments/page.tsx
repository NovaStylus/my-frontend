"use client";

export default function PaymentsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Payments</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">April 10, 2024</td>
              <td className="p-4">2,000 KES</td>
              <td className="p-4">M-Pesa</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Completed
                </span>
              </td>
              <td className="p-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Receipt
                </button>
              </td>
            </tr>

            <tr>
              <td className="p-4">April 12, 2024</td>
              <td className="p-4">1,500 KES</td>
              <td className="p-4">Airtel Money</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Completed
                </span>
              </td>
              <td className="p-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Receipt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
