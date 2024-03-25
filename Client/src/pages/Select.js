import React, { useState } from 'react';
import { Container, Typography, TextField, MenuItem, Slider, Button, FormControl, InputLabel, Select } from '@mui/material';
import background from '../assets/backgroundguy.jpg';

function Select() {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(150);
  const [age, setAge] = useState(30);
  const [workoutPlan, setWorkoutPlan] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };

  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
  };

  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
  };

  const handleWorkoutPlanChange = (event) => {
    setWorkoutPlan(event.target.value);
  };

  return (
    <div style={{
      //background:'rgba(0, 0, 0, 0.5)',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff', // Màu trắng
    }}>
      <Container>
        <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
          Fill in Your Information
        </Typography>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="gender-label" style={{ color: '#ffffff' }}>Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender-select"
            value={gender}
            label="Gender"
            onChange={handleGenderChange}
            style={{ color: '#ffffff' }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <Typography id="weight-slider" gutterBottom style={{ color: '#ffffff' }}>
          Your Weight (kg)
        </Typography>
        <Slider
          value={weight}
          min={0}
          max={100}
          step={1}
          onChange={handleWeightChange}
          valueLabelDisplay="auto"
          aria-labelledby="weight-slider"
        />
        <Typography id="height-slider" gutterBottom style={{ color: '#ffffff' }}>
          Your Height (cm)
        </Typography>
        <Slider
          value={height}
          min={100}
          max={200}
          step={1}
          onChange={handleHeightChange}
          valueLabelDisplay="auto"
          aria-labelledby="height-slider"
        />
        <Typography id="age-slider" gutterBottom style={{ color: '#ffffff' }}>
          Your Age
        </Typography>
        <Slider
          value={age}
          min={10}
          max={80}
          step={1}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
          aria-labelledby="age-slider"
        />
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="workout-plan-label" style={{ color: '#ffffff' }}>Workout Plan</InputLabel>
          <Select
            labelId="workout-plan-label"
            id="workout-plan-select"
            value={workoutPlan}
            label="Workout Plan"
            onChange={handleWorkoutPlanChange}
            style={{ color: '#ffffff' }}
          >
            <MenuItem value="powerful-chest">General Muscle building</MenuItem>
            <MenuItem value="large-arm">Large Arm</MenuItem>
            <MenuItem value="powerful-chest">Powerful Chest</MenuItem>
            <MenuItem value="powerful-chest">Wide Back</MenuItem>
            <MenuItem value="powerful-chest">Big Shoulderst</MenuItem>
            <MenuItem value="powerful-chest">Strong Legs</MenuItem>
            <MenuItem value="powerful-chest">Weight Loss</MenuItem>
            <MenuItem value="powerful-chest">Sculpted Body</MenuItem>
            <MenuItem value="powerful-chest">6 Pack Abs</MenuItem>
            <MenuItem value="powerful-chest">Powerlifting</MenuItem>
            <MenuItem value="powerful-chest">Crossfit</MenuItem>
            <MenuItem value="powerful-chest">Full Body in 45 Minutes</MenuItem>
            
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Container>
    </div>
  );
}

export default Select;
