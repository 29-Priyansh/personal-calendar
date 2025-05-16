import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import { getMonthName } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader: React.FC = () => {
  const { state, dispatch } = useCalendar();
  const currentMonth = state.currentDate.getMonth();
  const currentYear = state.currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between mb-8 transform -rotate-1">
      <h1 className="text-3xl font-bold text-emerald-900 font-handwritten">
        My Calendar
      </h1>
      
      <div className="flex items-center">
        <button 
          onClick={() => dispatch({ type: 'PREV_MONTH' })}
          className="p-2 text-emerald-700 hover:text-emerald-900 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={24} />
        </button>
        
        <h2 className="text-xl font-semibold mx-4 min-w-32 text-center text-emerald-800 font-handwritten">
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        
        <button 
          onClick={() => dispatch({ type: 'NEXT_MONTH' })}
          className="p-2 text-emerald-700 hover:text-emerald-900 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;