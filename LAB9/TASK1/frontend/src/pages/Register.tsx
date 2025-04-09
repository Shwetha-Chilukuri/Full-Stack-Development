import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registered successfully! Please login.");
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <input
        className="block w-full mb-2 p-2 border"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        className="block w-full mb-2 p-2 border"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        className="block w-full mb-2 p-2 border"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Register
      </button>
    </form>
  );
}
