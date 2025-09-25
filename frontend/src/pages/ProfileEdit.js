import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfileEdit() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    location: "",
    role: "",
    type: "",
    hospital: "",
    contact: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(""); // for showing uploaded profile picture

  // === Fetch existing user profile ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setForm({
          name: res.data.name || "",
          age: res.data.age || "",
          location: res.data.location || "",
          role: res.data.role || "",
          type: res.data.type || "",
          hospital: res.data.hospital || "",
          contact: res.data.contact || "",
          profileImage: null, // image not stored here directly
        });
        setPreview(res.data.profileImage || ""); // backend should return profileImage URL
      })
      .catch((err) => console.error(err));
  }, []);

  // === Handle input change ===
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // === Handle file change ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profileImage: file });
    setPreview(URL.createObjectURL(file)); // show preview before upload
  };

  // === Submit form with FormData ===
  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    formData.append(key, form[key]);
  });

  try {
    await axios.put("http://localhost:5001/api/user/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Profile updated successfully");
  } catch (err) {
    console.error(err);
    alert("Error updating profile");
  }
};

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        {/* Profile Image Preview */}
        <div className="profile-image-preview">
          {preview ? (
            <img src={preview} alt="Profile" width="120" height="120" />
          ) : (
            <p>No image uploaded</p>
          )}
        </div>

        <input
          name="name"
          value={form.name}
          placeholder="Full Name"
          onChange={handleChange}
        />
        <input
          name="age"
          value={form.age}
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          name="location"
          value={form.location}
          placeholder="Location"
          onChange={handleChange}
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="donor">Donor</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>

        <input
          name="type"
          value={form.type}
          placeholder="Blood/Organ Type"
          onChange={handleChange}
        />
        <input
          name="hospital"
          value={form.hospital}
          placeholder="Hospital"
          onChange={handleChange}
        />
        <input
          name="contact"
          value={form.contact}
          placeholder="Contact Info"
          onChange={handleChange}
        />

        <input
          name="profileImage"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
