import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Grid, Typography, CardMedia } from '@mui/material';

const Exercise = ({ exercise }) => {
  console.log(exercise)
  return (
    <div>
        <style>
            {`
                .css-1oqqzyl-MuiContainer-root{
                    max-width: 100vw;
                    padding:0;
                    display:flex;
                    flex-direction: column;
                    align-items: center;
                }
                .css-o69gx8-MuiCardMedia-root{
                    width: auto;
                } 
            `}
        </style>
        <Container >
            <Box sx={{ bgcolor: '#ccccff', maxheight: '40vh', width:'100%'}} >
                <Grid container spacing={2}>
                    {/* Name and Description */}
                    <Grid item xs={5} style={{display:'flex', justifyContent:'center'}}>
                        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'center', flexDirection:'column'}}>
                            <Typography variant="h2" gutterBottom style={{ paddingLeft: '30px' }}> <strong>{exercise.Name}</strong> </Typography>
                            <Typography variant="body1" paragraph style={{ paddingLeft: '30px' }}> {exercise.Description} </Typography>
                        </div>
                    </Grid>
                    {/* Image */}
                    <Grid item xs={7}> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <CardMedia component="img" image={exercise.Image} alt={exercise.Name}/>
                        </div>
                    </Grid>
                </Grid>     
            </Box>
            <br/><br/><br/>
            <Box sx={{ minheight: '50vh', width:'80%'}}>
                <Grid container spacing={40}>
                    {/* Starting position and Execution */}
                    <Grid item xs={6}>
                        <Typography variant="h4" paragraph> <strong>Starting position</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise['Starting position']} </Typography>
                        <Typography variant="h4" paragraph> <strong>Execution</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise.Execution} </Typography>
                    </Grid>

                    {/* Equipment required and Main muscles */}
                    <Grid item xs={6}>
                        <Typography variant="h4" paragraph>  <strong>Equipment required:</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise['Equipment required']} </Typography>
                        <Typography variant="h4" paragraph> <strong>Main muscles:</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise['Main muscles']} </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </div>
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
