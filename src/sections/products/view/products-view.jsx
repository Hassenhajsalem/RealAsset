import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Modal, Button, TextField, Card, CardMedia, CardContent, Typography, CardActions, Grid } from '@mui/material';
import { fNumber } from 'src/utils/format-number';
import config from '../../../config.json';
import image from '../../../assets/houses.png';
import RealEstateABI from '../../../abis/RealEstate.json';

export default function ProductsView() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState([]);
  const [sharesToBuy, setSharesToBuy] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (!config || !window.ethereum) {
          console.error("Config is undefined or Ethereum provider not found.");
          return;
        }
        const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
        await providerInstance.send("eth_requestAccounts", []);
        setProvider(providerInstance);

        const network = await providerInstance.getNetwork();
        const networkConfig = config[network.chainId];
        if (!networkConfig || !networkConfig.realEstate || !networkConfig.realEstate.address) {
          console.error("RealEstate contract address is undefined for the current network");
          return;
        }

        const realEstate = new ethers.Contract(networkConfig.realEstate.address, RealEstateABI.abi, providerInstance);
        const count = await realEstate.propertyCount();

        const propertyPromises = [];
        for (let i = 1; i <= count.toNumber(); i+=1) {
          propertyPromises.push(realEstate.properties(i));
        }

        const properties = await Promise.all(propertyPromises);
        const fetchedHomes = properties.map((property, index) => ({
          id: index + 1,
          owner: property.owner,
          totalSupply: property.totalSupply,
          tokenPrice: property.tokenPrice,
          sharesRemaining: property.sharesRemaining,
          description: property.description,
        }));

        setHomes(fetchedHomes);

        window.ethereum.on('accountsChanged', async () => {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const connectedAccount = ethers.utils.getAddress(accounts[0]);
          setAccount(connectedAccount);
        });
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  const handleBuyButtonClick = (property) => {
    setSelectedProperty(property);
    setModalOpen(true);
  };

  const handleBuyShares = async () => {
    if (!provider || !selectedProperty || !sharesToBuy) return;
    const network = await provider.getNetwork();
    const signer = provider.getSigner();

    const realEstate = new ethers.Contract(
      config[network.chainId].realEstate.address,
      RealEstateABI.abi,
      signer
    );

    try {
      await realEstate.buyToken(selectedProperty.id, {
        value: selectedProperty.tokenPrice.mul(sharesToBuy),
      });
      // Reload data or update UI as needed after successful purchase
    } catch (error) {
      console.error('Error buying shares:', error);
      // Handle error
    }

    setModalOpen(false);
  };

  return (
    
    <Container >
      <div className='cards__section'>
        <h3>Homes For You</h3>
        <hr />
        <Grid container spacing={3}>
          {homes.map((home, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Property"
                  height="140"
                  image={image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   <strong>Property Number:</strong>{index}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Total Shares: </strong>{fNumber(home.totalSupply.toString())} <br />
                    <strong>Shares Remaining: </strong>{fNumber(home.sharesRemaining.toString())} <br />
                    <strong>APY%: </strong> <br />
                    <strong>Price in €: </strong> <br />
                    <strong>Price in Crypto:  </strong> {fNumber(home.tokenPrice.toString())} Wei
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Description: </strong>{home.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleBuyButtonClick(home)} size="small">Buy</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* Modal for buying shares */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} sx={{ backgroundColor: 'white', width: '300px', mx: 'auto', mt: '100px',height:'300px', modalShadow: 'white' }}>
        <Container>
          {selectedProperty && (
            <div>
              <h3>Buy Shares</h3>
              <p>Enter the number of shares to buy:</p>
              <TextField
                type="number"
                value={sharesToBuy}
                onChange={(e) => setSharesToBuy(e.target.value)}
                label="Shares to Buy"
                variant="outlined"
              />
              <p>Total Value: {selectedProperty.tokenPrice && fNumber(selectedProperty.tokenPrice)} Wei</p>
              <Button onClick={handleBuyShares}>Buy</Button>
            </div>
          )}
        </Container>
      </Modal>
    </Container>
  );
}
