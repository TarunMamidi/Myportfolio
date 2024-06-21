import React from 'react';
import './Calendar.css';

const Calendar = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const dates = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(i);
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                {monthsOfYear[currentMonth]} {currentYear}
            </div>
            <div className="calendar-grid">
                {daysOfWeek.map(day => (
                    <div key={day} className="calendar-day">
                        {day}
                    </div>
                ))}
                {dates.map((date, index) => (
                    <div key={index} className={`calendar-date ${date === currentDate.getDate() ? 'current-date' : ''}`}>
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
