"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/store";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState("Patient");

  const clearUser = useUserStore((state) => state.clearUser)
  const storeUser = useUserStore((state) => state.user)

  console.log(storeUser)


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    setUserName(user.fullName || "Patient");
  }
}, []);

const onLogout = () => {
  clearUser()
}

  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-3 bg-blue-600 text-white shadow">
        {/* Left group */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
          </div>
          <h1 className="text-2xl font-bold">MASS</h1>
        </div>

        {/* Center */}
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold">Patient Dashboard</h2>
        </div>

        {/* Right group */}
        <div className="flex items-center space-x-6 relative">
          <div className="text-2xl cursor-pointer">🔔</div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <User className="w-6 h-6" />
           <span className="font-medium">{storeUser?.name || "Invalid"}</span>

          </div>
        </div>
      </nav>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-4 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50"
        >
          <Link
            href="/update-details"
            className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            <Settings className="w-4 h-4" />
            <span>Update Details</span>
          </Link>
          <Link
            href="/delete-account"
            className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      )}

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </main>
  );
}



