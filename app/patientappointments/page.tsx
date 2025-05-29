"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const storedUser = useUserStore((store) => store.user)
  console.log('outside useeffect',storedUser)

  const router = useRouter();

  useEffect(() => {
    // Fetch appointments from backend
    const fetchAppointments = async () => {

    if (!storedUser) {
      //console.log(storedUser)
      return;
    }

    console.log('inside useeffect', storedUser.id)
     
      try {
        const res = await fetch(`http://localhost:5000/api/bookappointment/book/${storedUser.id}`); // replace with your actual API
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, [storedUser]);

  const handleRescheduleClick = (id: any) => {
    setSelectedAppointmentId(id);
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = () => {
    setShowRescheduleModal(false);
    router.push(`/bookappointment?reschedule=${selectedAppointmentId}`);
  };

  const handleCancelClick = (id: any) => {
    setSelectedAppointmentId(id);
    console.log(id)
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    setShowCancelModal(false);
    try {
      await fetch(`http://localhost:5000/api/bookappointment/${selectedAppointmentId}/cancel`, {
        method: "DELETE",
      });
      setAppointments((prev) =>
        prev.filter((appt: any) => appt.id !== selectedAppointmentId)
      );
      toast.success("Appointment Cancelled");
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Appointments</h2>

      <table className="w-full border rounded-lg shadow-sm">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-4">Department</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td className="p-4 text-center" colSpan={6}>
                No appointments found.
              </td>
            </tr>
          ) : (
            appointments?.map((appointment: any) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-4">{appointment.department?.name || "General Medicine"}</td>
                <td className="p-4">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {new Date(appointment.appointmentTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-4">TSH {appointment.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-2 rounded font-medium text-white ${
                      appointment.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleRescheduleClick(appointment.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancelClick(appointment.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Do you want to reschedule your appointment?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmReschedule}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to cancel your appointment?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmCancel}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
