import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { CalendarProvider } from '../context/CalendarContext';

const Calendar: React.FC = () => {
  return (
    <CalendarProvider>
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </CalendarProvider>
  );
};

export default Calendar;