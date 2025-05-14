"use client";

import Link from "next/link";
import { useState } from "react";

export default function UpdateDetailsPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Details: ", form);
    // backend update logic can be added here
  };

  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-3 bg-blue-600 text-white shadow z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
          </div>
          <h1 className="text-2xl font-bold">MASS</h1>
        </div>

        <div className="space-x-6">
          <Link href="/receptionistdashboard" className="font-medium hover:underline">
            My Dashboard
          </Link>
          <Link href="/login" className="font-medium hover:underline">
            Logout
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <section className="flex flex-col items-center justify-center flex-1 pt-24">
        <h2 className="text-4xl font-bold text-gray-900 mt-8">Update Personal Details</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5 mt-8"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
      </section>
    </main>
  );
}


