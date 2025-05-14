import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch blog data");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/blog/${id}`, formData);
      toast.success("Blog updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500); // allow toast to show
    } catch (error) {
      toast.error("Failed to update blog.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg border border-white/20 bg-purple-200/30 backdrop-blur-md space-y-4 transition-all"
    >
      <h2 className="text-2xl font-bold text-purple-900">Edit Blog</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Blog Title"
        className="w-full p-3 border backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Blog Description"
        className="w-full p-3 my-2 border backdrop-blur-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
        placeholder="Author Name"
        className="w-full p-3 border backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <button
        type="submit"
        className="px-5 py-2 my-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-800 hover:shadow-md transition"
      >
        Update
      </button>
    </form>
  );
}

export default EditBlog;
