import React, { useState } from "react";
import {toast} from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Message submit alert
    toast.success("Thank you for reaching out! We'll reply soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px", color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "2rem" }}>Contact Us</h1>
      <p style={{ textAlign: "center", color: "#a0aec0", marginBottom: "30px" }}>
        Have questions, feedback, or need help with bidding? Drop us a message!
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem" }}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="your name "
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #333",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem" }}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #333",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem" }}>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="How can we help?"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #333",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem" }}>Message</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #333",
              backgroundColor: "#1a1a1a",
              color: "#fff",
              resize: "vertical",
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#d9534f", // Red/orange accent matching your design
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "10px",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;