import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import config from '../../../config.json';
import RealEstateABI from '../../../abis/RealEstate.json';
import { account } from 'src/_mock/account';
import { Card, CardContent, Button } from '@mui/material';

export default function UserPage() {
  const [propertyBalances, setPropertyBalances] = useState([]);
 
  useEffect(() => {
    async function fetchPropertyBalances() {
      try {
        const providerInstance = new ethers.providers.Web3Provider(window.ethereum);

        const network = await providerInstance.getNetwork();
        const networkConfig = config[network.chainId];
        if (!networkConfig || !networkConfig.realEstate || !networkConfig.realEstate.address) {
          console.error("RealEstate contract address is undefined for the current network");
          return;
        }

        const realEstate = new ethers.Contract(networkConfig.realEstate.address, RealEstateABI.abi, providerInstance);
        
        window.ethereum.on('accountsChanged', async (accounts) => {
          const connectedAccount = ethers.utils.getAddress(accounts[0]);
          // setAccount(connectedAccount);
        });

        const count = await realEstate.propertyCount();
        const balances = [];

        if (account) {
          for (let i = 0; i < count; i+=1) {
            const balance = await realEstate.balanceOf(account.address, i);
            balances.push(balance.toString()); // Convert balance to string if necessary
          }
        }
        
        setPropertyBalances(balances);
      } catch (error) {
        console.error('Error fetching property balances:', error);
      }
    }

    fetchPropertyBalances();
  }, [account]);

  const handleSellProperty = (index) => {
    // Implement the logic to sell the property at the given index
    console.log(`Sell property at index ${index}`);
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Action</TableCell> {/* Add Action column */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {propertyBalances.map((balance, index) => (
                    <TableRow key={index}>
                      <TableCell>Property {index + 1}</TableCell>
                      <TableCell>{balance}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleSellProperty(index)}>Sell</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
