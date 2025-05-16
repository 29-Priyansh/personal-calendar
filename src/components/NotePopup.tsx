import React, { useState, useEffect, useRef } from 'react';
import { useCalendar } from '../context/CalendarContext';
import { formatDateKey } from '../utils/dateUtils';

interface NotePopupProps {
  date: Date;
  onClose: () => void;
}

const NotePopup: React.FC<NotePopupProps> = ({ date, onClose }) => {
  const { state, dispatch } = useCalendar();
  const dateKey = formatDateKey(date);
  const existingNote = state.notes[dateKey]?.content || '';
  const [noteContent, setNoteContent] = useState(existingNote);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Format date for display
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        saveAndClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [noteContent]);
  
  // Save note and close popup
  const saveAndClose = () => {
    dispatch({ type: 'SET_NOTE', date: dateKey, content: noteContent });
    onClose();
  };
  
  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      saveAndClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
      <div 
        ref={popupRef}
        className="bg-yellow-50 p-6 rounded-lg shadow-xl max-w-md w-full transform -rotate-1 border-2 border-yellow-200"
        onKeyDown={handleKeyDown}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-emerald-800 font-handwritten">
            Notes for {formattedDate}
          </h3>
          <button 
            onClick={saveAndClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>
        
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full h-40 p-3 border border-yellow-300 rounded bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 font-handwritten resize-none"
          placeholder="Write your notes here..."
          autoFocus
        />
        
        <div className="flex justify-end mt-4">
          <button
            onClick={saveAndClose}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePopup;