import React from "react";

function AboutUs() {
  return (<>
    <section id="about-organ-blood" className="about-organ-blood-section" style={{ padding: "60px 20px", background: "#ffffffff", textAlign: "center" }}>
      <div className="about-organ-blood-container">
        <h2 className="about-organ-blood-heading" style={{ fontSize: "2.8rem", color: "#1e4d7b", marginBottom: "30px" }}>
          <b>About Organ & Blood Donation</b>
        </h2>

        <p className="about-organ-blood-text" style={{ maxWidth: "1100px", margin: "0 auto 40px", fontSize: "1.4rem", color: "#333", lineHeight: "1.8" }}>
          <b>Organ & Blood Donation</b> is a life-saving act of kindness that gives countless individuals
          a second chance at life. Every donation can make a difference—whether it’s saving a patient in
          urgent need of blood or helping someone waiting for an organ transplant.  
          Our mission is to create awareness, encourage voluntary donors, and connect hospitals
          with people in need.
        </p>
        <hr></hr>

        <h3 className="about-organ-blood-subheading" style={{ fontSize: "2.2rem", color: "#2c5d7a", marginTop: "50px", marginBottom: "20px" }}>
          <b>Why It Matters ❤️</b>
        </h3>
        <p className="about-organ-blood-text" style={{ maxWidth: "1100px", margin: "0 auto 40px", fontSize: "1.3rem", color: "#444", lineHeight: "1.8" }}>
          Every year, thousands of lives are lost due to the unavailability of blood or organs on time.  
          By pledging to donate, you become a beacon of hope for patients battling critical illnesses.  
          Together, we can build a compassionate society where no life is lost due to shortage of donors.
        </p>
<hr></hr>
        <h3 className="about-organ-blood-subheading" style={{ fontSize: "2.2rem", color: "#2c5d7a", marginTop: "50px", marginBottom: "20px" }}>
          <b>Who I am 🛠️</b>
        </h3>
        <p style={{ maxWidth: "1200px", margin: "30px auto", fontSize: "1.3rem", color: "#444", lineHeight: "1.8" }}>
  I am an individual passionate about spreading awareness on organ and blood donation.  
  My platform connects donors and recipients, bridges hospitals with volunteers,  
  and makes the process of donation more transparent and accessible.
</p>


        <p className="about-organ-blood-quote" style={{ fontSize: "1.5rem", marginTop: "50px", fontStyle: "italic", color: "#555" }}>
          <b>“One donation can save many lives – your gift of life matters.”</b>
        </p>
      </div>
    </section>
    <footer className="foot3">
        <div className="credit">
          © 2025 Organ Donor Network | Built for Hospitals & People in Need
        </div>
      </footer>
    </>
  );
}
 

export default AboutUs;
