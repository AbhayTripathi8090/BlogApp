import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-all-blogs")
      .then((res) => setBlogs(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen rounded my-2 bg-blue-200/30 backdrop-blur-md py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">All Blogs</h2>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="mb-4 p-4 border rounded shadow  backdrop-blur-md border-white/20 transition-transform duration-200 hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-purple-900">
              {blog.title}
            </h3>
            <p className="text-gray-800">
              {blog.description.substring(0, 100)}...
            </p>
            <div className="mt-2 space-x-2">
              <Link
                to={`/blog/${blog._id}`}
                className="px-3 py-1 text-white border border-transparent rounded hover:text-purple-900 hover:border-purple-900 hover:shadow-md transition duration-200 !no-underline"
              >
                View
              </Link>

              <Link
                to={`/edit/${blog._id}`}
                className="px-3 py-1 text-white border border-transparent rounded hover:text-purple-900 hover:border-purple-900 hover:shadow-md transition duration-200 !no-underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
