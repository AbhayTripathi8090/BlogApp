import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 


const ProfilePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login"); // ✅ Redirect to Login page
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-lg shadow-lg border border-white/20 bg-purple-200/30 backdrop-blur-md space-y-4 transition-all">
      <h2 className="text-2xl font-bold text-purple-900 text-center">
        Profile Page
      </h2>
      <div className="my-3 text-left space-y-4">
        <p>
          <span className="font-bold text-gray-600">Username:</span>{" "}
          <span className="text-gray-800">{user?.username}</span>
        </p>
        <p>
          <span className="font-bold text-gray-600">Email:</span>{" "}
          <span className="text-gray-800">{user?.email}</span>
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
