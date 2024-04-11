import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function Test4() {
  const [date, setDate] = useState(new Date());
  const [selectedDayExercises, setSelectedDayExercises] = useState([]);
  const data = [
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "Barbell Deadlift"
    },
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "1.5 Rep Bodyweight Squats"
    },
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "Barbell Declined Bench Press"
    },
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "Barbell Front Raise"
    },
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "Barbell Hip Thrust"
    },
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "Barbell Pullover"
    },
    {
        "Day_Name": "2024-04-08T17:00:00.000Z",
        "Exercise_Name": "Alternate Dumbbell Front Raise Neutral Grip"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Barbell Push Press"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Alternating Dumbbell Curl"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Dumbbell Pullover"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Barbell Row"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Burpees"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Band Seated Hip Abduction"
    },
    {
        "Day_Name": "2024-04-09T17:00:00.000Z",
        "Exercise_Name": "Banded Clams"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Banded Glute Bridge"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Barbell Bench Press"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Dumbbell Push Press"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Dumbbell Shoulder Press"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Dumbbell Shrugs"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Dumbbell Step Up"
    },
    {
        "Day_Name": "2024-04-10T17:00:00.000Z",
        "Exercise_Name": "Dumbbell Stiff-Leg Deadlift"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "Cable Crossover"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "EZ Barbell Curl"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "Barbell Shrug"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "EZ Barbell Preacher Curl"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "Barbell Stiff-Leg Deadlift"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "Cable One-Arm Lateral Raise"
    },
    {
        "Day_Name": "2024-04-11T17:00:00.000Z",
        "Exercise_Name": "Barbell Sumo Deadlift"
    }
];

  useEffect(() => {
    setSelectedDayExercises(getExercisesForDay(date));
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const getExercisesForDay = (selectedDate) => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return data.filter((exercise) => exercise.Day_Name.startsWith(selectedDateString));
  };

  return (
    <Container style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
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
        <List>
          {selectedDayExercises.length === 0 ? (
            <ListItem>
              <ListItemText primary="DAY_OFF" />
            </ListItem>
          ) : (
            selectedDayExercises.map((exercise, index) => (
              <ListItem key={index} component={Link} to={`/exercises/${exercise.Exercise_Name}`}>
                <ListItemText primary={exercise.Exercise_Name} />
              </ListItem>
            ))
          )}
        </List>
      </div>
    </Container>
  );
}

export default Test4;
