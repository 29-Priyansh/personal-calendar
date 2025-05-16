import { openDB } from 'idb';
import type { CalendarNote } from '../types/calendar';

const DB_NAME = 'calendar-db';
const STORE_NAME = 'notes';
const VERSION = 1;

export async function initDB() {
  const db = await openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'date' });
      }
    },
  });
  return db;
}

export async function getAllNotes(): Promise<Record<string, CalendarNote>> {
  const db = await initDB();
  const notes = await db.getAll(STORE_NAME);
  return notes.reduce((acc, note) => {
    acc[note.date] = note;
    return acc;
  }, {} as Record<string, CalendarNote>);
}

export async function saveNote(note: CalendarNote) {
  const db = await initDB();
  await db.put(STORE_NAME, note);
}