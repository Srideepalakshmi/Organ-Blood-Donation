import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // get admin name from localStorage (set during login)
    const storedName = localStorage.getItem("adminName") || "Admin";
    setAdminName(storedName);

    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5001/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((u) => u._id !== id));
      alert("Donor deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting donor");
    }
  };

  // Helper: check if date is older than 1 month
  const isOlderThanOneMonth = (dateString) => {
    if (!dateString) return false;
    const createdDate = new Date(dateString);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return createdDate < oneMonthAgo;
  };

  return (
    <>
      <div className="admin-container">
        {/* ✅ Welcome message */}
        <h2>
          <b>Welcome, {adminName}!</b>
        </h2>
        <br />

        <h2><b>Admin Dashboard</b></h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((u) => {
            const oldUser = isOlderThanOneMonth(u.createdAt);
            return (
              <div
                key={u._id}
                className={`card p-3 mb-3 shadow-sm ${
                  oldUser ? "card-expired" : ""
                }`}
              >
                <h4>
                  {u.name} <span className="role-badge">{u.role}</span>
                </h4>
                <p>
                  <b>Email:</b> {u.email}
                </p>
                <p>
                  <b>Joined:</b>{" "}
                  {new Date(u.createdAt).toLocaleDateString()}
                </p>

                {u.donorDetails && (
                  <>
                    <p>
                      <b>Donation Type:</b> {u.donorDetails.donationType}
                    </p>
                    {u.donorDetails.bloodType && (
                      <p>
                        <b>Blood:</b> {u.donorDetails.bloodType}
                      </p>
                    )}
                    {u.donorDetails.organType && (
                      <p>
                        <b>Organ:</b> {u.donorDetails.organType}
                      </p>
                    )}
                    <p>
                      <b>Location:</b> {u.donorDetails.location || "N/A"}
                    </p>
                  </>
                )}

                {oldUser && (
                  <p className="expired-warning">
                    ⚠️ This donor’s record is older than 1 month!
                  </p>
                )}

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
      <footer className="foot3">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
    </>
  );
}

export default AdminPage;
