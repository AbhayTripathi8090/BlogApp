// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await axios.delete(`http://localhost:5000/blog/${id}`);
      // alert("Blog deleted!");
      toast.success("Blog deleted!")
      navigate("/");
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 mb-8 rounded-lg shadow-lg border border-white/20 bg-purple-200/30 backdrop-blur-md hover:shadow-xl transition-all">
      <h2 className="text-3xl font-bold text-purple-800">{blog.title}</h2>
      <p className="mt-2 text-gray-800">{blog.description}</p>
      <p className="mt-4 text-gray-700">
        <strong>Author:</strong> {blog.author}
      </p>
      <button
        onClick={handleDelete}
        className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition"
      >
        Delete
      </button>
    </div>
  );
}

export default BlogDetail;
