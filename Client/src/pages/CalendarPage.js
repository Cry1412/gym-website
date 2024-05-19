import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import background from '../assets/backgroundguy.jpg';
import { Container, Typography, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';

function Calendar1() {
  const [date, setDate] = useState(new Date());
  const [allExercises, setAllExercises] = useState([]);
  const [selectedDayExercises, setSelectedDayExercises] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [physical, setPhysical] = useState('8 reps x 3 sets'); // Add loading state
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAllExercises();
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setSelectedDayExercises(getExercisesForDay(date));
    }
  }, [date, loading]); // Include loading in dependencies

  const fetchAllExercises = async () => {
    try {
      const response = await fetch('http://localhost:2000/test2', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setAllExercises(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(error);
    }
  };

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
      if (data[0].Pushups == 'weak') setPhysical('8 reps x 3 sets')
      else if (data[0].Pushups == 'normal') setPhysical('10 reps x 3 sets')
      else if (data[0].Pushups == 'strong') setPhysical('12 reps x 3 sets')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (!loading) {
      setSelectedDayExercises(getExercisesForDay(newDate));
    }
  };

  const getExercisesForDay = (selectedDate) => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return allExercises.filter((exercise) => exercise.Day_Name.startsWith(selectedDateString));
  };

  return (
    
    <Container>
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Here is the workout plan we setup for you
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom marginLeft={'40px'}>
            Exercise Calendar
          </Typography>
          <div style={{ marginBottom: '20px' }}>
            <Calendar onChange={handleDateChange} value={date} />
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Exercises on {date.toDateString()}
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : selectedDayExercises.length === 0 ? (
            <Typography>No Available Exercises</Typography>
          ) : (
            selectedDayExercises.map((exercise, index) => (
              <Link key={index} to={`/exercises/${exercise.Exercise_Name}`}>
                <Card style={{
    marginBottom: '10px', 
    border: '1px solid #ccc', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    }}>
    <CardContent>
        <Typography variant="body1">
            {exercise.Exercise_Name}
        </Typography>
    </CardContent>
    <CardContent>
        <Typography variant="body1">
            {physical}
        </Typography>
    </CardContent>
</Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default Calendar1;
