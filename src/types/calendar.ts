export interface CalendarNote {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  content: string;
  marked: boolean;
}

export interface CalendarState {
  notes: Record<string, CalendarNote>;
  currentDate: Date;
}

export type CalendarAction = 
  | { type: 'TOGGLE_MARK'; date: string }
  | { type: 'SET_NOTE'; date: string; content: string }
  | { type: 'NEXT_MONTH' }
  | { type: 'PREV_MONTH' };