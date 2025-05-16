import React, { useState } from 'react';
import { formatDateKey } from '../utils/dateUtils';
import { useCalendar } from '../context/CalendarContext';
import NotePopup from './NotePopup';

interface CalendarDayProps {
  date: Date | null;
  isCurrentMonth: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, isCurrentMonth }) => {
  const { state, dispatch } = useCalendar();
  const [showPopup, setShowPopup] = useState(false);
  
  // If no date, render empty cell
  if (!date) {
    return <div className="h-24 bg-transparent"></div>;
  }
  
  const dateKey = formatDateKey(date);
  const hasNote = state.notes[dateKey]?.content;
  const isMarked = state.notes[dateKey]?.marked;
  const isToday = new Date().toDateString() === date.toDateString();
  
  const handleClick = () => {
    dispatch({ type: 'TOGGLE_MARK', date: dateKey });
  };
  
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Determine classes based on state
  const baseClasses = "h-24 p-2 relative transform -rotate-5 transition-all duration-200 flex flex-col";
  const backgroundClasses = isCurrentMonth 
    ? "bg-yellow-100" 
    : "bg-yellow-50 opacity-60";
  const borderClasses = isToday 
    ? "border-2 border-emerald-500" 
    : "border border-yellow-200";
  const hoverClasses = "hover:shadow-md hover:-translate-y-1 cursor-pointer";
  const dayClasses = `${baseClasses} ${backgroundClasses} ${borderClasses} ${hoverClasses}`;

  return (
    <>
      <div 
        className={dayClasses}
        onClick={handleClick}
        onContextMenu={handleRightClick}
      >
        <div className="text-right text-sm text-gray-700">
          {date.getDate()}
        </div>
        
        {isMarked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-5xl text-red-500 font-bold opacity-80 transform rotate-12 font-handwritten">
              ✕
            </div>
          </div>
        )}
        
        {hasNote && (
          <div className="mt-auto">
            <div className="w-4 h-4 bg-emerald-200 rounded-full ml-auto" title="Has notes"></div>
          </div>
        )}
      </div>
      
      {showPopup && (
        <NotePopup date={date} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

export default CalendarDay;