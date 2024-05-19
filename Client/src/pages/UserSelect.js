import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Typography, TextField, MenuItem, Slider, Button, FormControl, InputLabel, Select } from '@mui/material';
import background from '../assets/backgroundguy.jpg';
import Alert from '@mui/material/Alert';

function UserSelect() {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(150);
  const [age, setAge] = useState(30);
  const [workoutPlan, setWorkoutPlan] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      return (
        <p style={styles.errorMessage}>This facility is not currently available in our system</p>
      );
    }
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2000/checklogin', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        console.log(data)
        if (data.length) {
          // Navigate to "/" if response is not empty
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, navigate]);

  function handleSubmit() {
    const data = {
      gender: gender,
      weight: weight,
      height: height,
      age: age,
      pushups: workoutPlan
    };

    fetch('http://localhost:2000/health', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // Chuyển object data thành JSON string
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        // Xử lý khi request thành công ở đây
        //alert('New record inserted successfully.');
      })
      .catch(error => {
        console.error('Lỗi:', error.message);
      setError(error.message); // Hiển thị cửa sổ tin nhắn lỗi
      });

    fetch('http://localhost:2000/create-month-exercises', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        // Handle success response here
        //alert('New record inserted successfully.');
        navigate('/calendar')

      })
      .catch(error => {
        console.error('Lỗi:', error.message);
      setError(error.message); // Hiển thị cửa sổ tin nhắn lỗi
      });
  }

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
      {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
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
          <InputLabel id="workout-plan-label" style={{ color: '#ffffff' }}>How many pushups can you do in a row</InputLabel>
          <Select
            labelId="workout-plan-label"
            id="workout-plan-select"
            value={workoutPlan}
            label="Workout Plan"
            onChange={handleWorkoutPlanChange}
            style={{ color: '#ffffff' }}
          >
            <MenuItem value="weak">Less than 10</MenuItem>
            <MenuItem value="normal">10 to 20</MenuItem>
            <MenuItem value="strong">More than 20</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Container>
    </div>
  );
}

const styles = {
  errorMessage: {
    textAlign: 'center',
    fontSize: '24px',
    marginTop: '30vh',
    marginBottom: '15vh',
    //transform: 'translateY(-50%)', 
  }
};

export default UserSelect;
