import { DiaryEntry } from '../types';
import { STORAGE_KEY } from '../constants';

export const getEntries = (): DiaryEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEntry = (entry: DiaryEntry): void => {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntriesByMonth = (year: number, month: number): DiaryEntry[] => {
  const entries = getEntries();
  return entries.filter(entry => {
    const d = new Date(entry.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
};

export const getAvailableYears = (): number[] => {
  const entries = getEntries();
  const years = new Set(entries.map(e => new Date(e.date).getFullYear()));
  const currentYear = new Date().getFullYear();
  years.add(currentYear);
  return Array.from(years).sort((a, b) => b - a); // Descending
};

export const clearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
}