import { useState, useEffect } from 'react';
import { FoodEntry, DailyNutrition, NutritionGoals } from '@/types/nutrition';

const NUTRITION_KEY = 'gym-tracker-nutrition';
const GOALS_KEY = 'gym-tracker-nutrition-goals';

export const useNutrition = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  });

  useEffect(() => {
    const storedEntries = localStorage.getItem(NUTRITION_KEY);
    const storedGoals = localStorage.getItem(GOALS_KEY);
    
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const saveEntries = (updatedEntries: FoodEntry[]) => {
    setEntries(updatedEntries);
    localStorage.setItem(NUTRITION_KEY, JSON.stringify(updatedEntries));
  };

  const saveGoals = (updatedGoals: NutritionGoals) => {
    setGoals(updatedGoals);
    localStorage.setItem(GOALS_KEY, JSON.stringify(updatedGoals));
  };

  const addEntry = (entry: FoodEntry) => {
    const updated = [...entries, entry];
    saveEntries(updated);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    saveEntries(updated);
  };

  const getDailyNutrition = (date: string): DailyNutrition => {
    const dayEntries = entries.filter(e => e.date === date);
    
    return {
      date,
      entries: dayEntries,
      totalCalories: dayEntries.reduce((sum, e) => sum + e.calories, 0),
      totalProtein: dayEntries.reduce((sum, e) => sum + e.protein, 0),
      totalCarbs: dayEntries.reduce((sum, e) => sum + e.carbs, 0),
      totalFat: dayEntries.reduce((sum, e) => sum + e.fat, 0),
    };
  };

  return {
    entries,
    goals,
    addEntry,
    deleteEntry,
    getDailyNutrition,
    updateGoals: saveGoals,
  };
};