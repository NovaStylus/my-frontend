"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/store";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // show red dot initially
  const [userName, setUserName] = useState("Patient");
  const menuRef = useRef<HTMLDivElement>(null);

  const clearUser = useUserStore((state) => state.clearUser);
  const storeUser = useUserStore((state) => state.user);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // On component mount, load user data and show notification dot only (no welcome message)
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.fullName || "Patient");
      setShowNotification(true);  // Show red dot on login
    }
  }, []);

  const onLogout = () => {
    clearUser();
  };

  const handleBellClick = () => {
    setShowWelcome(true);
    setShowNotification(false); // remove red dot when clicked
    setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
  };

  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-3 bg-blue-600 text-white shadow relative">
        {/* Left logo */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
          </div>
          <h1 className="text-2xl font-bold">MASS</h1>
        </div>

        {/* Center title */}
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold">Patient Dashboard</h2>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6 relative">
          {/* Notification bell */}
          <div className="text-2xl cursor-pointer relative" onClick={handleBellClick}>
            🔔
            {showNotification && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
            )}
            {showWelcome && (
              <div className="absolute top-12 right-0 bg-white text-blue-700 font-semibold px-3 py-2 rounded shadow-lg text-sm whitespace-nowrap z-50 welcome-popup">
                👋 Welcome {storeUser?.name || userName}! Book your appointment with ease.
                <span className="absolute top-[-6px] right-3 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-white"></span>
              </div>
            )}
          </div>

          {/* User dropdown trigger */}
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

      {/* Main Content */}
      <div className="p-6">{children}</div>

      {/* Popup Arrow styling */}
      <style jsx>{`
        .welcome-popup {
          position: absolute;
          top: 2.25rem;
          right: 0;
          background: white;
          color: #2563eb;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
          z-index: 1000;
        }
        .welcome-popup > span {
          position: absolute;
          top: -6px;
          right: 12px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid white;
        }
      `}</style>
    </main>
  );
}
