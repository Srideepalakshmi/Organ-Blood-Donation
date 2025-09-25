import React, { useState } from "react";
import "./Home.css";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);

  // 🔹 Map of Tamil Nadu districts → agent phone number
  const agentContacts = {
    Chennai: "9876543210",
    Coimbatore: "9876543211",
    Madurai: "9876543212",
    Trichy: "9876543213",
    Salem: "9876543214",
    Erode: "9876543215",
    Tirunelveli: "9876543216",
    Thanjavur: "9876543217",
    Vellore: "9876543218",
    Dindigul: "9876543219",
    Kanyakumari: "9876543220",
    Cuddalore: "9876543221",
    Thoothukudi: "9876543222",
    Karur: "9876543223",
    Namakkal: "9876543224",
    Krishnagiri: "9876543225",
    Sivagangai: "9876543226",
    Virudhunagar: "9876543227",
    Ramanathapuram: "9876543228",
    Pudukkottai: "9876543229",
    // default fallback
    default: "9876500000",
  };

  const search = async (e) => {
    e.preventDefault();
    if (!q) return;
    const res = await fetch(
      `http://localhost:5001/api/search?q=${encodeURIComponent(q)}`
    );
    const data = await res.json();
    setResults(data);
  };

  // 🔹 Get agent contact for hospital/donor location
  const getAgentContact = (location = "") => {
    const district = Object.keys(agentContacts).find((d) =>
      location.toLowerCase().includes(d.toLowerCase())
    );
    return agentContacts[district] || agentContacts.default;
  };

  return (
    <>
      <section className="search"> <br /> <br />
        <h2>
          <b>Search Donors / Hospitals</b>
        </h2>
        <br />
        <br />
        <form onSubmit={search}>
          <input
            placeholder="Type blood type (O-) or organ (liver)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="results">
          {results.length === 0 ? (
            <p>No results</p>
          ) : (
            results.map((r) => (
              <div key={r._id} className="card">
                <h3>
                  {r.name} ({r.role})
                </h3>
                <p>Donation: {r.donorDetails?.donationType || "—"}</p>
                <p>Blood Type: {r.donorDetails?.bloodType || "—"}</p>
                <p>Organ: {r.donorDetails?.organType || "—"}</p>
                <p>Hospital: {r.hospital || "—"}</p>
                <p>
                  📞 Agent Contact (District):{" "}
                  <b>{getAgentContact(r.donorDetails?.location || "")}</b>
                </p>
                <small>
                  Contact the respective agent for this district to proceed with
                  donor matching.
                </small>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="foot">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
    </>
  );
}
