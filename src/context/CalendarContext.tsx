import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { CalendarState, CalendarAction, CalendarNote } from '../types/calendar';
import { getAllNotes, saveNote } from '../utils/db';

const initialState: CalendarState = {
  notes: {},
  currentDate: new Date(),
};

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'TOGGLE_MARK': {
      const existingNote = state.notes[action.date] || {
        id: crypto.randomUUID(),
        date: action.date,
        content: '',
        marked: false,
      };
      
      const updatedNote = {
        ...existingNote,
        marked: !existingNote.marked,
      };
      
      // Save to IndexedDB
      saveNote(updatedNote);
      
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.date]: updatedNote,
        },
      };
    }
    case 'SET_NOTE': {
      const existingNote = state.notes[action.date] || {
        id: crypto.randomUUID(),
        date: action.date,
        content: '',
        marked: false,
      };
      
      const updatedNote = {
        ...existingNote,
        content: action.content,
      };
      
      // Save to IndexedDB
      saveNote(updatedNote);
      
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.date]: updatedNote,
        },
      };
    }
    case 'NEXT_MONTH': {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return {
        ...state,
        currentDate: newDate,
      };
    }
    case 'PREV_MONTH': {
      const newDate = new Date(state.currentDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return {
        ...state,
        currentDate: newDate,
      };
    }
    default:
      return state;
  }
}

const CalendarContext = createContext<{
  state: CalendarState;
  dispatch: React.Dispatch<CalendarAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  // Load initial state from IndexedDB
  useEffect(() => {
    getAllNotes().then(notes => {
      Object.entries(notes).forEach(([date, note]) => {
        dispatch({ type: 'SET_NOTE', date, content: note.content });
        if (note.marked) {
          dispatch({ type: 'TOGGLE_MARK', date });
        }
      });
    });
  }, []);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);