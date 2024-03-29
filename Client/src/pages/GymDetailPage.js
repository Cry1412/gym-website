import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

import imgDetail2 from '../assets/many-girls.jpg';

const GymDetailPage = () => {
  // Sample gym data (replace with actual data)
  const gymData = {
    name: 'Gym Fitness Center',
    address: '123 Main Street, Cityville',
    hours: 'Mon - Fri: 6:00 AM - 10:00 PM',
    services: ['Cardio', 'Weightlifting', 'Yoga', 'Personal Training'],
    images: [imgDetail2, imgDetail2, imgDetail2],
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {gymData.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card style={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              image={gymData.images[0]} // Display the first image
              title={gymData.name}
              style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Address:
              </Typography>
              <Typography>{gymData.address}</Typography>
              <Typography gutterBottom variant="h6">
                Hours:
              </Typography>
              <Typography>{gymData.hours}</Typography>
              <Typography gutterBottom variant="h6">
                Services:
              </Typography>
              <ul>
                {gymData.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Additional images */}
      <Grid container spacing={2} style={{ marginTop: '2rem' }}>
        {gymData.images.slice(1).map((image, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card style={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={image}
                title={`${gymData.name} Image ${index + 2}`}
                style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GymDetailPage;
