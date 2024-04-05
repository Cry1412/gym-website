import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div>
      <style>
        {`
          .calendar-container {
            text-align: center;
            font-family: Arial, sans-serif;
          }

          .calendar-header {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          }

          .calendar-header button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            margin: 0 10px;
          }

          .calendar {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-gap: 5px;
            max-width: 400px;
            margin: 0 auto;
          }

          .calendar-day {
            padding: 10px;
            border: 1px solid #ccc;
            cursor: pointer;
            border-radius: 10px;
          }

          .empty {
            visibility: hidden;
          }

          .calendar-day:hover {
            background-color: #f0f0f0;
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
    </div>
  );
};

export default Calendar;
