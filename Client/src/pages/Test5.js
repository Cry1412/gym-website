import React from 'react';
import { Typography, Paper, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FitnessCenter, People, FitnessCenterOutlined, DirectionsRun, HotTub, SportsMma } from '@mui/icons-material';
import imgDetail2 from '../assets/many-girls.jpg';

function GymDetails({ gym }) {
  return (
    <Paper style={{ padding: '20px', backgroundColor: '#dcdcdc'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              image={imgDetail2} // Thay đổi URL hình ảnh
              alt="Gym Image"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom>
            {gym.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> {gym.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Hours:</strong> {gym.hours}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Services:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <FitnessCenter />
              </ListItemIcon>
              <ListItemText primary="Gym" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Trainer" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FitnessCenterOutlined />
              </ListItemIcon>
              <ListItemText primary="Yoga" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DirectionsRun />
              </ListItemIcon>
              <ListItemText primary="Boxing" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HotTub />
              </ListItemIcon>
              <ListItemText primary="Sauna" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SportsMma />
              </ListItemIcon>
              <ListItemText primary="MMA" />
            </ListItem>
            {/* Add more services as needed */}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

function Test5() {
  const gymInfo = {
    name: 'Fitness Center',
    address: '123 Main Street, City, Country',
    hours: 'Mon - Fri: 6am - 10pm, Sat - Sun: 8am - 8pm',
    // Add more details as needed
  };

  return (
    <div style={{ padding: '20px' }}>
      <GymDetails gym={gymInfo} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5" style={{ backgroundColor: '#FF4081', color: 'white', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>
          Contact us now
        </Typography>
      </div>
    </div>
  );
}

export default Test5;
