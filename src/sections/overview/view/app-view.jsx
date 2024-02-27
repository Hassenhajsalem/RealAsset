import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



export default function AppView() {

  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome to Meta Estate Empire👋
      </Typography>
      <Typography variant="h6" gutterBottom>
        Making Real Estate <br /> Investments Available for <br /> Anyone, Anywhere, Anytime
      </Typography>
      {/* Uncommented grid and other components */}
    </Container>
  );
}
