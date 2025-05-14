'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fbff] flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center p-3 bg-blue-600 shadow-sm">
      
  <div className="flex items-center space-x-4">
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
  <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
</div>
    <h1 className="text-2xl font-bold text-white">MASS</h1>
  </div>


        
    </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Effortlessly Schedule Medical Appointments
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Book appointments with your healthcare provider quickly and easily.
        </p>
        <div className="flex space-x-4">
          <Link href="/signup">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              Login
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
