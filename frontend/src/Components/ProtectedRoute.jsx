import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedpage, children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAccess = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/ProtectedRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ important
        },
        body: JSON.stringify({ allowedpage }),
      });

      const data = await res.json();

      if (data.success) {
        setAllowed(true);
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      console.log("Error:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAccess();
  }, []);

  if (loading) return <div>Loading...</div>;

  return allowed ? children : null;
};

export default ProtectedRoute;