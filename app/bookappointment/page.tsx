"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/store";

export default function BookAppointmentPage() {
  const [department, setDepartment] = useState("");
  const [appointment_date, setDate] = useState("");
  const [appointment_time, setTime] = useState("");
  const [payment_method, setPayment] = useState("");
  const [amount, setAmount] = useState("");

  const router = useRouter();
  const storeUser = useUserStore((state) => state.user);

  const departments: { [key: string]: number } = {
    "General Medicine": 0,
    "Dermatology": 500,
    "Neurology": 1000,
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    const selectedFee = departments[selectedDepartment] || 0;
    setAmount(selectedFee.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !department ||
      !appointment_date ||
      !appointment_time ||
      (parseInt(amount) > 0 && !payment_method)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const isoString = `${appointment_date}T${appointment_time}:00`;
    const appointmentDateTime = new Date(isoString);

    try {
      const response = await fetch("http://localhost:5000/api/bookappointment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department: department === "General Medicine" ? 1 : department === "Dermatology" ? 2 : 3,
          appointment_date: appointmentDateTime,
          appointment_time: appointmentDateTime,
          amount,
          payment_method,
          patient_id: storeUser?.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push("/patientappointments");
      } else {
        const err = await response.json();
        if (err.error === "You already have an appointment at this time. Please choose a different time.") {
          alert("You already have an appointment at this time. Please reschedule.");
        } else if (
          err.error ===
          "This time slot in the selected department is already booked. Please choose a different time."
        ) {
          alert("Selected time slot is already booked in this department. Please choose another.");
        } else {
          alert(err.error || "Booking failed");
        }
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong while booking the appointment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4 pt-20">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-5">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Book Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Department */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Department
            </label>
            <select
              value={department}
              onChange={handleDepartmentChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            >
              <option value="">-- Choose Department --</option>
              {Object.keys(departments).map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={appointment_date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={appointment_time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount (TSH)
            </label>
            <input
              type="text"
              value={amount === "0" ? "No fee" : amount}
              readOnly
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100"
              placeholder="Auto-filled"
              required
            />
          </div>

          {/* Payment (Only show if fee > 0) */}
          {parseInt(amount) > 0 && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Payment Method
              </label>
              <select
                value={payment_method}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                required
              >
                <option value="">-- Choose a Payment Method --</option>
                <option value="M-Pesa">M-Pesa</option>
                <option value="Airtel Money">Airtel Money</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
