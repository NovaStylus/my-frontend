"use client";

import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export default function AdminDoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-3 bg-blue-600 text-white shadow">
        {/* Left side - Logo and title */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
          </div>
          <h1 className="text-2xl font-bold">MASS</h1>
        </div>

        {/* Center title */}
        <h2 className="text-2xl font-semibold">Departments</h2>

        {/* Right side - Back to Dashboard */}
        <Link href="/admindashboard" className="hover:text-gray-300">
          <ArrowRightCircle className="w-8 h-8" />
        </Link>
      </nav>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </main>
  );
}

