import React from 'react';
import CalendarDay from './CalendarDay';
import { generateCalendarDays, getDayName } from '../utils/dateUtils';
import { useCalendar } from '../context/CalendarContext';

const CalendarGrid: React.FC = () => {
  const { state } = useCalendar();
  const currentMonth = state.currentDate.getMonth();
  const currentYear = state.currentDate.getFullYear();
  
  // Generate days for the current month
  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  
  // Generate weekday headers
  const weekdays = Array.from({ length: 7 }, (_, i) => getDayName(i));

  return (
    <div className="grid">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map((day, index) => (
          <div 
            key={index} 
            className="text-center py-2 font-semibold text-emerald-700 transform -rotate-5 font-handwritten"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) => (
          <CalendarDay 
            key={index}
            date={date}
            isCurrentMonth={date !== null && date.getMonth() === currentMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;