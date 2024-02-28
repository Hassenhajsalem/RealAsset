import React, { useState } from 'react';

import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    address: '',
    idType: '',
    idNumber: '',
    idExpiryDate: '',
    issuingCountry: '',
    taxId: '',
    picture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePictureChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server for processing
    console.log(formData);
    // Reset form after submission
    setFormData({
      fullName: '',
      email: '',
      dob: '',
      address: '',
      idType: '',
      idNumber: '',
      idExpiryDate: '',
      issuingCountry: '',
      taxId: '',
      picture: null
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "8px", width: "40%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
        <TextField
          required
          id="fullName"
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          required
          id="email"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          id="dob"
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="address"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          required
          id="idType"
          label="ID Type"
          name="idType"
          value={formData.idType}
          onChange={handleChange}
        />
        <TextField
          required
          id="idNumber"
          label="ID Number"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
        />
        <TextField
          required
          id="idExpiryDate"
          label="ID Expiry Date"
          type="date"
          name="idExpiryDate"
          value={formData.idExpiryDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="issuingCountry"
          label="Issuing Country"
          name="issuingCountry"
          value={formData.issuingCountry}
          onChange={handleChange}
        />
        <TextField
          required
          id="taxId"
          label="Tax ID"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="picture">Picture Holding Government ID:
          <input id="picture" type="file" accept="image/*" onChange={handlePictureChange} />
          </label>

        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default KYCForm;
