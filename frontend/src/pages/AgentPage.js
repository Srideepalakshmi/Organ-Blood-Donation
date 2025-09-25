import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AgentPage.css";

function AgentPage() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [agentName, setAgentName] = useState("");

  useEffect(() => {
    // ✅ get agent name saved in localStorage during login
    const storedName = localStorage.getItem("name") || "Agent";
    setAgentName(storedName);

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/api/agent/donors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDonors(res.data);
        setFilteredDonors(res.data);
      })
      .catch((err) => console.error("Error fetching donors:", err));
  }, []);

  // Handle filter by location
  const handleFilter = () => {
    if (!locationFilter.trim()) {
      setFilteredDonors(donors); // reset if empty
      return;
    }
    const filtered = donors.filter((d) =>
      d.donorDetails?.location
        ?.toLowerCase()
        .includes(locationFilter.toLowerCase())
    );
    setFilteredDonors(filtered);
  };

  return (
    <>
      <div className="agent-container">
        {/* ✅ Welcome message with actual agent name */}
        <h2>
          <b>Welcome, {agentName}!</b>
        </h2>
        <br />
        <h3 className="dashboard-title">
          <b>Agent Dashboard</b>
        </h3>

        {/* === Location Filter === */}
        <div className="filter-box">
          <input
            type="text"
            placeholder="Enter location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <div className="filter-actions">
            <button onClick={handleFilter} className="btn btn-primary">
              Filter
            </button>
            <button
              onClick={() => {
                setLocationFilter("");
                setFilteredDonors(donors);
              }}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>

        {/* === Donors List === */}
        <div className="agent-cards">
          {filteredDonors.length === 0 ? (
            <p>No donors found for this location.</p>
          ) : (
            filteredDonors.map((d) => (
              <div key={d._id} className="card shadow-sm">
                <h4>{d.name}</h4>
                <p>
                  <b>Donation:</b> {d.donorDetails?.donationType || "N/A"}
                </p>
                {d.donorDetails?.donationType === "blood" && (
                  <p>
                    <b>Blood Type:</b> {d.donorDetails?.bloodType || "N/A"}
                  </p>
                )}
                {d.donorDetails?.donationType === "organ" && (
                  <p>
                    <b>Organ Type:</b> {d.donorDetails?.organType || "N/A"}
                  </p>
                )}
                <p>
                  <b>Location:</b> {d.donorDetails?.location || "N/A"}
                </p>
                <p>
                  <b>Hospital:</b> {d.hospital || "N/A"}
                </p>
                <p>
                  <b>Phone:</b> {d.phone || "N/A"}
                </p>
                <p>
                  <b>Email:</b> {d.email || "N/A"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="foot3">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
    </>
  );
}

export default AgentPage;
