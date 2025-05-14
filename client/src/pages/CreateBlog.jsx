import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/create-blog", formData);
      // alert("Blog created successfully!");
      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (error) {
      alert("Failed to create blog.");
      toast.error("Failed to update blog.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg border border-white/20 bg-purple-200/30 backdrop-blur-md space-y-4 transition-all"
    >
      <h2 className="text-2xl font-bold text-purple-900">Create Blog</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full p-3 border rounded  backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full p-3 my-3 border  rounded  backdrop-blur-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
        className="w-full p-3 border rounded backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <button
        type="submit"
        className="px-5 py-2 my-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-800 hover:shadow-md transition"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateBlog;
