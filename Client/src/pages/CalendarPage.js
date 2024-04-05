
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Function để lấy dữ liệu từ API và cập nhật vào state exercises
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:2000/test');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises(); // Gọi function lấy dữ liệu khi component được render
  }, []); // useEffect sẽ chỉ được gọi một lần sau khi component được render

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
    const url = `/events/${date}`;
    window.location.href = url;
  };

  const renderExercises = () => {
    // Thay thế mảng Exercises bằng dữ liệu từ state exercises
    return exercises.map((exercise, index) => (
      <div key={index} className="exercise" onClick={() => handleDayClick(index)}>
        {exercise.Name}
      </div>
    ));
  };

  const handleDayClick = (dayIndex) => {
    // You can handle day click here, if needed
    console.log(`yay`);
  };

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

export default Calendar;
