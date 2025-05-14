import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CreateBlog from "./pages/CreateBlog";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import EditBlog from "./pages/EditBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute"; // ✅ PRIVATE ROUTE
import ProfilePage from "./pages/ProfilePage.jsx";
// import jwtDecode from "jwt-decode";

function App() {
  
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // ✅ CHECK LOGIN STATUS

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ CLEAR TOKEN
    toast.success("Logged out successfully!");
    navigate("/login"); // ✅ REDIRECT TO LOGIN
  };

  return (
    <div className="container mx-auto mt-4">
      {/* Navbar */}
      <nav className="bg-purple-900 p-4 rounded-lg shadow-lg flex items-center justify-between">
        <Link
          to="/"
          className="text-white font-bold text-2xl tracking-wide hover:text-purple-300 transition duration-200 !no-underline"
        >
          MyBlog
        </Link>

        <div className="space-x-6 text-sm sm:text-base flex items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/blogs"
                className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-600 transition !no-underline"
              >
                All Blogs
              </Link>
              <Link
                to="/create"
                className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-600 transition !no-underline"
              >
                Create
              </Link>
              {/* <button
                onClick={handleLogout}
                className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
              >
                Logout
              </button> */}
              <Link
                to="/profile"
                className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-600 transition !no-underline"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-purple-300 transition duration-200 !no-underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-purple-300 transition duration-200 !no-underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <BlogList />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PrivateRoute>
              <BlogDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
