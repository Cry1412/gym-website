import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [exercisesByDate, setExercisesByDate] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchExercisesReal = async () => {
      try {
        const response = await fetch('http://localhost:2000/test2', {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Lỗi');
        }
        const data = await response.json()
        const exercisesGroupedByDate = groupExercisesByDate(data);
          setExercisesByDate(exercisesGroupedByDate);
        console.log(data)
        console.log(exercisesByDate)
        console.log('Đăng ký thành công');
      } catch (error) {
        console.error('Lỗi:', error.message);
      }
    }
  
    const groupExercisesByDate = (exercises) => {
      return exercises.reduce((acc, exercise) => {
        const date = new Date(exercise.Day_Name).toLocaleDateString('en-US');
        acc[date] = acc[date] || [];
        acc[date].push(exercise);
        return acc;
      }, {});
    };
    // const fetchExercisesReal = async () => {
    //   try {
    //     const response = await axios.post('http://localhost:2000/test2', {
    //       headers: {
    //         'Authorization': token,
    //         'Content-Type': 'application/json'
    //       },
    //     });
    //     if (!response.ok) {
    //       throw new Error('Lỗi');
    //     }
    //     const data = response.data;
    //     const exercisesGroupedByDate = groupExercisesByDate(data);
    //     setExercisesByDate(exercisesGroupedByDate);
    //     console.log(data);
    //     console.log('Đăng ký thành công');
    //   } catch (error) {
    //     console.error('Lỗi:', error.message);
    //   }
    // };
    fetchExercisesReal();
  }, [token]);

  

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendar = [];

    // Render empty cells for preceding days
    for (let i = 0; i < startingDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Render days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      calendar.push(
        <div key={i} className="calendar-day" onClick={() => handleDateClick(date)}>
          {i}
        </div>
      );
    }

    return calendar;
  };

  const handleDateClick = (date) => {
    setCurrentDate(date);
    //const formattedDate = formatDate(date);
  const exercisesForCurrentDay = exercisesByDate[date] || [];
  setExercisesByDate(exercisesByDate);
  setExercisesByDate({ ...exercisesByDate, [date]: exercisesForCurrentDay });
    console.log("clicked")
  };

  const renderExercises = () => {
    const formattedDate = currentDate.toLocaleDateString('en-US');
    const exercisesForCurrentDay = exercisesByDate[formattedDate] || [];
    return exercisesForCurrentDay.map((exercise, index) => (
      <div key={index} className="exercise">
        {exercise.Exercise_Name}
      </div>
    ));
  };


  // Render calendar function remains unchanged

  return (
    <div className="container">
      <style>
        {`
        .container {
          display: flex;
          justify-content: space-between;
          margin-top: 50px; /* Thêm khoảng trống ở trên */
        }
          .container {
            display: flex;
            justify-content: space-between;
          }

          .calendar-container {
            flex: 1;
            margin-right: 10px;
          }

          .exercise-container {
            flex: 1;
          }

          .exercise-container {
            display: flex;
            flex-direction: column;
          }

          .calendar-container {
            display: flex;
            flex-direction: column;
            border: 1px solid #ccc;
            border-radius: 10px;
          }

          .calendar-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
          }

          .calendar-header button {
            background-color: transparent;
            border: 1px solid #ccc;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1.2rem;
            margin: 0 10px;
          }

          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-gap: 5px;
            max-width: 400px;
          }

          .exercise {
            padding: 10px;
            border: 1px solid #ccc;
            cursor: pointer;
            border-radius: 10px;
            margin-bottom: 5px;
          }

          .empty {
            visibility: hidden;
          }

          .calendar-day:hover {
            background-color: #f0f0f0;
          }
          .calendar-day {
            border: 1px solid #ccc;
            border-radius: 10px;
            text-align:center;
          }
        `}
      </style>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h1>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h1>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar">
          {renderCalendar()}
        </div>
      </div>
      <div className="exercise-container">
        {renderExercises()}
      </div>
    </div>
  );
};

export default Test;
