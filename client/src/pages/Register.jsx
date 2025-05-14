import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg border border-white/20 bg-purple-200/30 backdrop-blur-md space-y-4 transition-all"
    >
      <h2 className="text-2xl font-bold text-purple-900 text-center">
        Register
      </h2>

      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="w-full p-3 border rounded backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-3 my-3 border rounded backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-3 my-1 border rounded backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <button
        type="submit"
        className="w-full px-5 py-2 my-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-800 hover:shadow-md transition"
      >
        Register
      </button>
    </form>
  );
}

export default Register;
