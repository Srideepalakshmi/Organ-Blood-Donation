import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const toggleMissionDetails = () => {
    setShowMissionDetails(!showMissionDetails);
  };

  // Slideshow images
  const images = [
    "/images/home1.png",
    "/images/home2.png",
    "/images/home3.png",
    "/images/home4.png",
    "/images/home5.png",
    "/images/home6.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Contact form submit
  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Message sent!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      alert("Error sending message");
    }
  };

  return (
    <>
      {/* Home Section */}
      <section id="home" className="home">
        <div className="home-content">
          <div className="text">
            <h2>
              <b>
                <i>Organ & Blood Donation🩸🫀</i>
              </b>
            </h2>
            <h1>
              <span>Donate</span> Life, <span>Save</span> Lives
            </h1>
            <p>Your Trusted Organ & Blood Donation Platform</p>
            
<button className="btn-primary">
  <Link 
    to="/search" 
    style={{ 
      color: "white", 
      fontWeight: "bold", 
      textDecoration: "none" 
    }}
  >
    Search Donors
  </Link>
</button>

          </div>
          <div className="image">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Donation"
                className={index === currentImage ? "active" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h1 className="heading">
          <b>About Us</b>
        </h1>
        <div className="about-content">
          <img
            src="https://img.freepik.com/premium-vector/group-people-look-laptop-rejoice-success-vector-flat-style-cartoon-illustration_357257-1295.jpg"
            alt="Awareness"
          />
          <div className="about-text">
            <h2>We Spread Awareness!!!</h2>
            <p>
              We connect hospitals, donors, and patients in need through organ &
              blood donation programs.
            </p>
            <Link to="/about">
            <button className="btn-primary">Explore</button></Link>
          </div>
        </div>
      </section>

      {/* Contact Section (form directly inside Home) */}
      <section id="contact" className="contact">
        <h1 className="heading"><b>Contact Us</b></h1>
        <h3 className="title">We are here to help you!</h3>

        <div className="contact-content">
          <div className="image">
            <img
              src="https://img.freepik.com/premium-vector/3d-smiling-young-woman-with-headphones-microphone-laptop-customer-service-support-call-center_313242-1247.jpg"
              alt="Contact"
            />
          </div>

          <div className="form">
            <form onSubmit={submit}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="number"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <textarea
                placeholder="Your Message"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
    </>
  );
}

export default Home;
