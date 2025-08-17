import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data))
    .catch(err => console.log(err));
  }, []);

  return user ? (
    <div>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};
