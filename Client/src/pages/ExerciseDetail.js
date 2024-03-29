import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Exercise = ({ exercise }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        {/* Name and Description */}
        <Grid item xs={5}>
          <Typography variant="h4" gutterBottom>
            {exercise.Name}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Description:</strong> {exercise.Description}
          </Typography>
        </Grid>
        {/* Image */}
        <Grid item xs={5}>
          <CardMedia
            component="img"
            image={exercise.Image}
            alt={exercise.Name}
          />
        </Grid>
        {/* Starting position and Execution */}
        <Grid item xs={6}>
          <Typography variant="body1" paragraph>
            <strong>Starting position:</strong> {exercise['Starting position']}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Execution:</strong> {exercise.Execution}
          </Typography>
        </Grid>
        {/* Equipment required and Main muscles */}
        <Grid item xs={6}>
          <Typography variant="body1" paragraph>
            <strong>Equipment required:</strong> {exercise['Equipment required']}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Main muscles:</strong> {exercise['Main muscles']}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const ExerciseDetail = () => {
  const [exercise, setExercise] = useState(null);
  const { exerciseName } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:2000/exercises/${exerciseName}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          setExercise(response.data[0]); // Assuming the API returns an array of exercises and we take the first one
        }
      })
      .catch(error => {
        console.error('Error fetching exercise data:', error);
      });
  }, []);

  return (
    <Container>
      {exercise && <Exercise exercise={exercise} />}
    </Container>
  );
};

export default ExerciseDetail;
