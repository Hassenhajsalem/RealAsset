import React, { useState } from 'react';

import { Button, TextField } from '@mui/material';

const SupportAndFAQ = () => {
  // Define FAQ data
  const faqData = [
    {
      question: "What is real estate tokenization?",
      answer: "Real estate tokenization is the process of digitally representing ownership rights to a real estate asset on a blockchain. It allows investors to purchase fractional ownership in real estate properties, making it easier to invest in high-value properties and enabling liquidity in traditionally illiquid assets."
    },
    {
      question: "How does real estate tokenization work?",
      answer: "Real estate tokenization involves converting ownership rights of a property into tokens, which are then recorded on a blockchain. These tokens can be bought, sold, or traded by investors. Smart contracts govern the ownership and transfer of tokens, providing transparency and security to all parties involved."
    },
    {
      question: "How can I start?",
      answer: "To get started with real estate tokenization, follow these steps: 1. Connect your Metamask wallet and ensure that you are connected to the Ethereum blockchain. 2. Discover and compare all available real estate properties on our platform. 3. Purchase your first real estate token without any paperwork or intermediaries involved."
    },
    // Add more FAQ items as needed
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="support-faq-container">
      <h2>Support and FAQ</h2>
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <h4>{item.question}</h4>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
      {/* Include a support section with contact information or a form */}
      <div className="support-section">
        <h3>Need Further Assistance?</h3>
        <p>If you have any additional questions or require further assistance, please dont hesitate to contact us.</p>
        {/* Include contact form or contact information */}
        <div className="contact-form-section">
        <h3>Contact Us</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "8px", width: "40%" }}>
  <TextField
    required
    label="Name"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    style={{ marginBottom: "20px", width: "100%" }}
  />
  <TextField
    required
    label="Email"
    type="email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    style={{ marginBottom: "20px", width: "100%" }}
  />
  <TextField
    required
    label="Subject"
    name="subject"
    value={formData.subject}
    onChange={handleInputChange}
    style={{ marginBottom: "20px", width: "100%" }}
  />
  <div style={{ marginBottom: "20px", width: "100%" }}>
    <label htmlFor="message">Message:
    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", resize: "vertical" }} />
</label>
  </div>
  <Button type="submit" variant="contained" color="primary" style={{ width: "100%" }}>
    Submit
  </Button>
</form>

      </div>
      </div>
    </div>
  );
};

export default SupportAndFAQ;
