export type MoodType = 'Blue' | 'Red' | 'Yellow' | 'Green' | 'Silver';

export interface MoodConfig {
  label: MoodType;
  color: string;
  description: string;
}

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  title: string;
  text: string;
  mood: MoodType;
  color_code: string;
}

export enum Tab {
  HOME = 'HOME',
  MONTHLY = 'MONTHLY',
  ALL = 'ALL'
}