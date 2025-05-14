import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully");
      navigate("/blogs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg border border-white/20 bg-purple-200/30 backdrop-blur-md space-y-4 transition-all"
    >
      <h2 className="text-2xl font-bold text-purple-900 text-center">Login</h2>

      <input
        name="email"
        type="email"
        onChange={handleChange}
        value={formData.email}
        className="w-full p-3 my-3 border rounded backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        placeholder="Email"
        required
      />

      <input
        name="password"
        type="password"
        onChange={handleChange}
        value={formData.password}
        className="w-full p-3 my-3 border rounded backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        placeholder="Password"
        required
      />

      <button
        type="submit"
        className="w-full px-5 py-3 my-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-800 hover:shadow-md transition"
      >
        Login
      </button>

      <p className="my-3 text-center text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link to="/register" className="text-purple-800 font-medium hover:underline !no-underline">
          Register
        </Link>
      </p>
    </form>
  );
}

export default Login;
