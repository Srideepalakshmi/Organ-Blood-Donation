import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);

      if (res.data.success) {
        const role = res.data.user.role;

        // store token (optional, for auth-protected routes later)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);
       localStorage.setItem("name", res.data.user.name);

        // redirect based on role
        if (role === "donor") navigate("/donor");
        else if (role === "agent") navigate("/agent");
        else if (role === "admin") navigate("/admin");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
    <div className="form-container1">
      
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br></br>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br></br>
        <button type="submit">Login</button><br></br>
      </form><br></br>
    </div>

    <footer className="foot1">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
  

</>
)};
export default Login;
