import { useState, useEffect } from 'react';
import { Workout } from '@/types/workout';

const STORAGE_KEY = 'gym-tracker-workouts';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setWorkouts(JSON.parse(stored));
    }
  }, []);

  const saveWorkouts = (updatedWorkouts: Workout[]) => {
    setWorkouts(updatedWorkouts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts));
  };

  const addWorkout = (workout: Workout) => {
    const updated = [...workouts, workout];
    saveWorkouts(updated);
  };

  const updateWorkout = (id: string, updates: Partial<Workout>) => {
    const updated = workouts.map(w => 
      w.id === id ? { ...w, ...updates } : w
    );
    saveWorkouts(updated);
  };

  const deleteWorkout = (id: string) => {
    const updated = workouts.filter(w => w.id !== id);
    saveWorkouts(updated);
  };

  const getWorkout = (id: string) => {
    return workouts.find(w => w.id === id);
  };

  return {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
  };
};