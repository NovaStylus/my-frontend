"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const storedUser = useUserStore((state) => state.user);

  // Close dropdown on outside click
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

  // Handle bell click: show popup, hide notification badge, auto-hide popup after 3s
  const handleBellClick = () => {
    setShowPopup(true);
    setShowNotification(false);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-3 bg-blue-600 text-white shadow relative">
        {/* Left group */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
          </div>
          <h1 className="text-2xl font-bold">MASS</h1>
        </div>

        {/* Center */}
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>

        {/* Right group */}
        <div className="flex items-center space-x-6 relative">
          {/* Bell icon with notification */}
          <div className="relative text-2xl cursor-pointer" onClick={handleBellClick}>
            🔔
            {showNotification && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                1
              </span>
            )}

            {showPopup && (
              <div className="absolute top-6 right-0 bg-white text-blue-700 font-semibold px-3 py-1 rounded shadow-lg text-sm whitespace-nowrap z-50 welcome-popup">
                Welcome back! Let’s run smoothly.
                <span className="absolute top-[-6px] right-3 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-white"></span>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <User className="w-6 h-6" />
              <span className="font-medium">{storedUser?.name}</span>
            </div>

            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50"
              >
                <Link
                  href="/updateadetails"
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
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">{children}</div>

      <style jsx>{`
        .welcome-popup {
          position: absolute;
          top: 2.25rem; /* 36px */
          right: 0;
          background: white;
          color: #2563eb; /* Tailwind blue-700 */
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
