import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DonorPage.css";

function DonorPage() {
  const [donor, setDonor] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    dob: "",
    donationType: "",
    bloodType: "",
    organType: "",
    location: "",
    hospital: "",
    phone: "",
    email: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/api/donor/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDonor(res.data);
        setFormData({
          age: res.data.age || "",
          dob: res.data.dob || "",
          donationType: res.data.donorDetails?.donationType || "",
          bloodType: res.data.donorDetails?.bloodType || "",
          organType: res.data.donorDetails?.organType || "",
          location: res.data.donorDetails?.location || "",
          hospital: res.data.hospital || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
        });
        setIsFormSubmitted(
          !!(res.data.donorDetails?.donationType || res.data.age)
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put("http://localhost:5001/api/donor/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Successfully completed!");
      setIsFormSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error saving details");
    }
  };

  if (!donor) return <p>Loading...</p>;

  return (<>
    <div className="donor-page-container">
      {/* === Sidebar === */}
      
      {/* === Main Content === */}
      <main className="donor-content">
        <div className="donor-dashboard-section">
          <h2>Welcome, {donor.name}!</h2><br></br>
          <p>Here is your dashboard.</p>
        </div>

        {!isFormSubmitted ? (
          <div id="form" className="donor-form-section">
            <h3>Please fill this form to proceed:</h3><br></br><br></br>
            <form onSubmit={handleSubmit}>
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />

              <label>Today's Date:</label>
              <input
                type="date"
                value={new Date().toISOString().slice(0, 10)}
                disabled
              />

              <label>Donation Type:</label>
              <select
                name="donationType"
                value={formData.donationType}
                onChange={handleChange}
                required
              >
                <option value="">--Select--</option>
                <option value="blood">Blood</option>
                <option value="organ">Organ</option>
              </select>

              {formData.donationType === "blood" && (
                <>
                  <label>Blood Type:</label>
                  <input
                    type="text"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    placeholder="e.g. A+, O-"
                    required
                  />
                </>
              )}

              {formData.donationType === "organ" && (
                <>
                  <label>Organ Type:</label>
                  <input
                    type="text"
                    name="organType"
                    value={formData.organType}
                    onChange={handleChange}
                    placeholder="e.g. Kidney, Liver"
                    required
                  />
                </>
              )}

              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <label>Hospital:</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
              />

              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <button type="submit" className="donor-btn-primary">Submit</button>
            </form>
          </div>
        ) : (
          <div id="details" className="donor-details-section">
            <h3>Your Details</h3>
            <p><b>Age:</b> {formData.age}</p>
            <p><b>DOB:</b> {formData.dob}</p>
            <p><b>Donation Type:</b> {formData.donationType}</p>
            {formData.donationType === "blood" && <p><b>Blood Type:</b> {formData.bloodType}</p>}
            {formData.donationType === "organ" && <p><b>Organ Type:</b> {formData.organType}</p>}
            <p><b>Location:</b> {formData.location}</p>
            <p><b>Hospital:</b> {formData.hospital}</p>
            <p><b>Phone:</b> {formData.phone}</p>
            <p><b>Email:</b> {formData.email}</p>
            <button onClick={() => setIsFormSubmitted(false)}>Edit Details</button>
          </div>
        )}
      </main>
    </div>
    <footer className="foot3">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
 
</>
 
)};
export default DonorPage;
