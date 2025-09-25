import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    role: "donor",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/signup", formData);

      if (res.data.success) {
        alert("Signup successful! Please login.");
        window.location.href = "/login"; // ✅ match your route
      } else {
        setErrors([{ msg: res.data.msg || "Signup failed" }]);
      }
    } catch (err) {
      if (err.response && err.response.data.msg) {
        setErrors([{ msg: err.response.data.msg }]);
      } else {
        setErrors([{ msg: "Something went wrong. Please try again." }]);
      }
    }
  };

  return (
    <>
      <div className="form-container2">
        <h2>Signup</h2>

        {errors.length > 0 &&
          errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error.msg}
            </p>
          ))}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password1"
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="donor">Donor</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Signup</button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>

      {/* ✅ Footer same as Login */}
      <footer className="foot2">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
    </>
  );
};

export default Signup;
