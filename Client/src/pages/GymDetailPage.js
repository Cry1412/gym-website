import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const GymDetailPage = () => {
  const classes = useStyles();

  // Sample gym data (replace with actual data)
  const gymData = {
    name: 'Gym Fitness Center',
    address: '123 Main Street, Cityville',
    hours: 'Mon - Fri: 6:00 AM - 10:00 PM',
    services: ['Cardio', 'Weightlifting', 'Yoga', 'Personal Training'],
    images: ['gym-image1.jpg', 'gym-image2.jpg', 'gym-image3.jpg'],
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {gymData.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={gymData.images[0]} // Display the first image
              title={gymData.name}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
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
      <Grid container spacing={2} className={classes.root}>
        {gymData.images.slice(1).map((image, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={image}
                title={`${gymData.name} Image ${index + 2}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GymDetailPage;
