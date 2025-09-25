import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import './pages/Home.css';
import AboutUs from "./components/AboutUs";
import Search from "./pages/Search";
import DonorPage from "./pages/DonorPage";
import AgentPage from "./pages/AgentPage";
import AdminPage from "./pages/AdminPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />        
        <Route path="/about" element={<AboutUs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
