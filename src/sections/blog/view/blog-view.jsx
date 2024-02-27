import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { ethers } from 'ethers'; // Import ethers.js library
import { TextField } from '@mui/material';

import config from '../../../config.json';
import RealEstateABI from '../../../abis/RealEstate.json';

export default function BlogView() {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    totalSupply: '',
    tokenPrice: '',
    description: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    // Check if the value is a valid number for the first two fields
    if ((id === 'totalSupply' || id === 'tokenPrice') && !isNaN(value)) {
      setNewProperty((prevState) => ({
        ...prevState,
        [id]: value
      }));
    } else if (id === 'description') {
      // Allow any value for the description field
      setNewProperty((prevState) => ({
        ...prevState,
        [id]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const contractAddress = config[network.chainId].realEstate.address // Provide the address of your deployed smart contract
      const abi = RealEstateABI.abi
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.createProperty(
        newProperty.totalSupply,
        newProperty.tokenPrice,
        newProperty.description
      );
      await tx.wait(); // Wait for the transaction to be mined

      console.log('Property created successfully');
    } catch (error) {
      console.error('Error creating property:', error);
    }

    // Reset the form fields and hide the form
    setNewProperty({
      totalSupply: '',
      tokenPrice: '',
      description: ''
    });
    setShowPropertyForm(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Add Property</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setShowPropertyForm(true)}
        >
          New Property
        </Button>
      </Stack>
      {showPropertyForm && (
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px", borderRadius: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "40%" }}>
            <TextField
              required
              id="totalSupply"
              label="Total Supply"
              value={newProperty.totalSupply}
              onChange={handleChange}
                rowsMax={4} // Change maxRows to rowsMax

            />
            <TextField
              required
              id="tokenPrice"
              label="Token Price"
              value={newProperty.tokenPrice}
              onChange={handleChange}
                rowsMax={4} // Change maxRows to rowsMax

            />
            <TextField
              required
              id="description"
              label="Description"
              value={newProperty.description}
              onChange={handleChange}
              multiline
                rowsMax={4} // Change maxRows to rowsMax

            />
            <Button type="submit" variant="contained" color="primary">
              Add Property
            </Button>
          </div>
        </form>
      )}


    </Container>
  );
}
