import { MoodConfig, MoodType } from './types';

export const MOODS: Record<MoodType, MoodConfig> = {
  Green: { label: 'Green', color: '#B4CEB3', description: 'Calm' },
  Blue: { label: 'Blue', color: '#88A0A8', description: 'Sad' },
  Red: { label: 'Red', color: '#E86252', description: 'Mad' },
  Yellow: { label: 'Yellow', color: '#F3DE8A', description: 'Joy' },
  Silver: { label: 'Silver', color: '#D6D2D2', description: 'Special' },
};

export const STORAGE_KEY = 'emotion_waters_data';

export const AQUARIUM_SHAPES = [
  'clip-circle',
  'clip-polygon',
  'rounded-[3rem]',
  'clip-flower',
  'clip-star' // Used sparingly
];