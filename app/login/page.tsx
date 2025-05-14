"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email: string) =>
    /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email.";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(form.email);

    if (emailError) {
      setErrors({ ...errors, email: emailError });
      return;
    }

    setErrors({ email: "", password: "" });

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        const { email } = data.user;

        if (email === "muganyizi05@gmail.com") router.push("/admindashboard");
        else if (email === "irenekokujona@gmail.com") router.push("/receptionistdashboard");
        else router.push("/patientdashboard");
      } else {
        setErrors({ ...errors, password: data.error || "Login failed" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ ...errors, password: "Error connecting to server" });
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();
      setResetMessage(res.ok ? "Reset link sent! Check your email." : data.error || "Failed to send reset link.");
    } catch (err) {
      console.error("Reset error:", err);
      setResetMessage("Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative flex flex-col flex-1 min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 transition-all duration-300 shadow-md ${
          isScrolled ? "bg-blue-700" : "bg-blue-600"
        } py-3`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-4xl font-bold">+</span>
          </div>
          <h1 className="text-2xl text-white font-bold">MASS</h1>
        </div>
        <div className="space-x-6">
          <Link href="/" className="text-white font-medium">Home</Link>
          <Link href="/signup" className="text-white font-medium">Sign Up</Link>
        </div>
      </nav>

      {/* Login Form */}
      <section className={`flex-1 flex justify-center items-center p-4 pt-24 ${showForgotModal ? "blur-sm" : ""}`}>
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            showToggle
            toggleVisibility={() => setShowPassword((prev) => !prev)}
            visible={showPassword}
          />

          <div className="text-right">
            <p
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </section>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
            <form onSubmit={handleForgotSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                disabled={isSending}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Reset Link"}
              </button>
              {resetMessage && (
                <p className="mt-3 text-sm text-center text-gray-600">{resetMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  error = "",
  showToggle = false,
  toggleVisibility = () => {},
  visible = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  showToggle?: boolean;
  toggleVisibility?: () => void;
  visible?: boolean;
}) {
  return (
    <div className="relative">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      {showToggle && (
        <span
          className="absolute right-3 top-[43px] cursor-pointer text-gray-500"
          onClick={toggleVisibility}
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
