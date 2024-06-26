import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Exercise = ({ exercise }) => {
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
                            <Typography variant="h2" gutterBottom> <strong>{exercise[0].Name}</strong> </Typography>
                            <Typography variant="body1" paragraph> <strong>Description:</strong> {exercise[0].Description} </Typography>
                        </div>
                    </Grid>
                    {/* Image */}
                    <Grid item xs={7}> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <CardMedia component="img" image={exercise[0].Image} alt={exercise[0].Name}/>
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
                        <Typography variant="body1" paragraph> {exercise[0]['Starting position']} </Typography>
                        <Typography variant="h4" paragraph> <strong>Execution</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise[0].Execution} </Typography>
                    </Grid>

                    {/* Equipment required and Main muscles */}
                    <Grid item xs={6}>
                        <Typography variant="h4" paragraph>  <strong>Equipment required:</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise[0]['Equipment required']} </Typography>
                        <Typography variant="h4" paragraph> <strong>Main muscles:</strong> </Typography>
                        <Typography variant="body1" paragraph> {exercise[0]['Main muscles']} </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </div>
  );
};

const ExerciseDetail = () => {
  //const [exercise, setExercise] = useState(null);
  const { exerciseName } = useParams();
  const exercise = [
    {
        "Exercise_ID": 1,
        "Name": "Barbell Deadlift",
        "Description": "Exercise mainly for back, legs and the whole body",
        "Starting position": "Barbell placed on the ground in front of you. Feet a little less than shoulder width apart with your knees bent. With your arms fully extended, grab the barbell in pronation, hands shoulder-width apart Keep your torso slightly bent forward, back straight, shoulders pulled back and chest out. Inhale and tighten your abdominal muscles.",
        "Execution": "While keeping your arms straight, lift the barbell by extending your legs and straightening your torso to reach a vertical position. Exhale at the end of the motion. Then slowly go back to the starting position. Always remember never to bend your back.",
        "Equipment required": "Barbell, platesBack, legs",
        "Main muscles": "Back",
        "Secondary muscles": "legs",
        "Image": "https://cdn.shopify.com/s/files/1/0269/5551/3900/files/Barbell-Deadlift_600x600.png?v=1619977112"
    }
]

  return (
    <Container>
      {exercise && <Exercise exercise={exercise} />}
    </Container>
  );
};

export default ExerciseDetail;