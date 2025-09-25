import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <p>Welcome to your account!</p>
      <Link to="/profile/edit">Edit Profile</Link>
    </div>
  );
}

export default Dashboard;
