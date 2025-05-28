"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    const minLength = 6;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    const letters = /[a-zA-Z]/g;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters.`;
    }
    if (!specialChars.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (!letters.test(password)) {
      return "Password must contain at least one letter.";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email) ? "" : "Please enter a valid email.";
  };

  const validateConfirmPassword = () => {
    return form.password !== form.confirmPassword ? "Passwords do not match." : "";
  };

  const validatePhone = (phone: string) => {
    const regex = /^[67]\d{8}$/;
    return regex.test(phone)
      ? ""
      : "Enter a valid phone number.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordError = validatePassword(form.password);
    const emailError = validateEmail(form.email);
    const confirmPasswordError = validateConfirmPassword();
    const phoneError = validatePhone(form.phone);

    if (passwordError || emailError || confirmPasswordError || phoneError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        phone: phoneError,
      });
      return;
    }

    setErrors({ email: "", password: "", confirmPassword: "", phone: "" });

    try {
      const formattedForm = {
        ...form,
        phone: "+255" + form.phone,
      };

      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedForm),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Signup successful:", result);
        window.location.href = "/login";
      } else {
        setErrors({
          email: result.error || "An error occurred. Please try again.",
          password: "",
          confirmPassword: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors({
        email: "Failed to connect to server.",
        password: "",
        confirmPassword: "",
        phone: "",
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 transition-all duration-300 shadow-md ${
          isScrolled ? "bg-blue-700 py-3" : "bg-blue-600 py-3"
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <span className="text-blue-600 text-7xl font-bold leading-none">+</span>
          </div>
          <h1 className="text-2xl font-bold text-white">MASS</h1>
        </div>
        <div className="space-x-6">
          <Link href="/" className="text-white font-medium">
            Home
          </Link>
          <Link href="/login" className="text-white font-medium">
            Login
          </Link>
        </div>
      </nav>

      {/* Sign Up Form */}
      <section className="flex-1 flex flex-col justify-center items-center w-full px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mt-32 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
            <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
            <FormPhoneNumber label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
            <FormInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              showToggle
              toggleVisibility={() => setShowPassword(!showPassword)}
              visible={showPassword}
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              showToggle
              toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              visible={showConfirmPassword}
            />

            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition">
              Sign Up
            </button>
          </form>
        </div>
      </section>
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
  onChange: any;
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
        <span className="absolute right-3 top-[43px] cursor-pointer text-gray-500" onClick={toggleVisibility}>
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function FormPhoneNumber({
  label,
  name,
  value,
  onChange,
  error = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex items-center px-3 bg-gray-100">
   
          <span className="text-gray-700">+255</span>
        </div>
        <input
          type="tel"
          name={name}
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (raw.length <= 9) {
              onChange({ target: { name, value: raw } });
            }
          }}
         
          className="flex-1 p-3 focus:outline-none"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
