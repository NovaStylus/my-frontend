"use client";

import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export default function PatientAppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
 {/* Navbar */}
<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 bg-blue-600 text-white shadow">
  <div className="flex items-center space-x-4">
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
      <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
    </div>
    <h1 className="text-2xl font-bold">MASS</h1>
  </div>

  <h2 className="text-2xl font-semibold">Book Appointment</h2>

  <Link href="/patientdashboard" className="hover:text-gray-300">
    <ArrowRightCircle className="w-8 h-8" />
  </Link>
</nav>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </main>
  );
}