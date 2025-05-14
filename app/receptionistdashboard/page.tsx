"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

export default function ReceptionistDashboardCards() {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setMessages([...messages, message]);
    setMessage("");
  };
  const handleDelete = (indexToDelete: number) => {
    setMessages(messages.filter((_, index) => index !== indexToDelete));
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

      {/* Today's Appointments Card */}
      <Link
        href="/receptionistappointments"
        className="block cursor-pointer bg-white p-6 rounded-xl shadow flex items-center space-x-4 hover:bg-blue-100"
      >
        <Calendar className="w-10 h-10 text-blue-600" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Appointments</h3>
          <p className="text-gray-600">24 appointments</p>
        </div>
      </Link>

      {/* Chat Support Card */}
      <div
        onClick={() => setShowChat(true)}
        className="block cursor-pointer bg-white p-6 rounded-xl shadow flex items-center space-x-4 hover:bg-blue-100"
      >
        <MessageSquare className="w-10 h-10 text-indigo-600" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Chat Support</h3>
          <p className="text-gray-600">5 active chats</p>
        </div>
      </div>

      {/* Chat Support Dialog */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-xl z-50 flex flex-col h-[500px]">
          {/* Chat Navbar */}
          <div className="flex justify-between items-center p-4 bg-blue-600 rounded-t-xl">
            <h3 className="text-lg font-semibold text-white">Sami</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
            {messages.length === 0 ? (
              <p className="text-gray-400 italic">Start chatting with Sami...</p>
            ) : (
              messages.map((msg, index) => (
                 <div key={index} className="flex justify-end">
    <div className="relative group">
      <div className="bg-blue-100 text-blue-800 p-2 rounded-lg w-fit max-w-[95%] ml-auto">
        {msg}
      </div>
      <button
        onClick={() => handleDelete(index)}
        className="absolute -top-2 -right-2 text-red-500 hidden group-hover:block"
      >
        <span className="text-xs">✖</span>
      </button>
    </div>
  </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-full py-2 px-4 pr-12"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

