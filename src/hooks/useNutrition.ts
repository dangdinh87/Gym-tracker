import { useState, useEffect } from 'react';
import { FoodEntry, DailyNutrition, NutritionGoals } from '@/types/nutrition';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useNutrition = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load data from Supabase when user is authenticated
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // Load today's nutrition entries
        const today = new Date().toISOString().split('T')[0];
        const { data: entriesData, error: entriesError } = await supabase
          .from('nutrition_entries')
          .select('*')
          .eq('date', today)
          .order('created_at', { ascending: false });

        if (entriesError) throw entriesError;

        // Load nutrition goals
        const { data: goalsData, error: goalsError } = await supabase
          .from('nutrition_goals')
          .select('*')
          .single();

        if (goalsError && goalsError.code !== 'PGRST116') throw goalsError;

        if (entriesData) {
          const formattedEntries: FoodEntry[] = entriesData.map(entry => ({
            id: entry.id,
            foodId: entry.id,
            foodName: entry.food_name,
            servings: Number(entry.quantity || 1),
            calories: Number(entry.calories),
            protein: Number(entry.protein),
            carbs: Number(entry.carbs),
            fat: Number(entry.fat),
            date: entry.date,
            meal: 'breakfast' as const
          }));
          setEntries(formattedEntries);
        }

        if (goalsData) {
          setGoals({
            calories: goalsData.daily_calories,
            protein: goalsData.daily_protein,
            carbs: goalsData.daily_carbs,
            fat: goalsData.daily_fat
          });
        }
      } catch (error) {
        console.error('Error loading nutrition data:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load nutrition data from server",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, toast]);

  const addEntry = async (entry: FoodEntry) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to track nutrition",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('nutrition_entries')
        .insert({
          user_id: user.id,
          date: entry.date,
          food_name: entry.foodName,
          calories: entry.calories,
          protein: entry.protein,
          carbs: entry.carbs,
          fat: entry.fat,
          quantity: entry.servings || 1
        })
        .select()
        .single();

      if (error) throw error;

      const newEntry: FoodEntry = {
        id: data.id,
        foodId: data.id,
        foodName: data.food_name,
        servings: Number(data.quantity),
        calories: Number(data.calories),
        protein: Number(data.protein),
        carbs: Number(data.carbs),
        fat: Number(data.fat),
        date: data.date,
        meal: 'breakfast' as const
      };

      setEntries(prev => [newEntry, ...prev]);
      
      toast({
        title: "Food added",
        description: `${entry.foodName} added to your nutrition log`
      });
    } catch (error) {
      console.error('Error adding entry:', error);
      toast({
        title: "Error adding food",
        description: "Failed to add food to your nutrition log",
        variant: "destructive"
      });
    }
  };

  const deleteEntry = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('nutrition_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntries(prev => prev.filter(entry => entry.id !== id));
      
      toast({
        title: "Food removed",
        description: "Item removed from your nutrition log"
      });
    } catch (error) {
      console.error('Error removing entry:', error);
      toast({
        title: "Error removing food",
        description: "Failed to remove food from your nutrition log",
        variant: "destructive"
      });
    }
  };

  const updateGoals = async (newGoals: NutritionGoals) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('nutrition_goals')
        .upsert({
          user_id: user.id,
          daily_calories: newGoals.calories,
          daily_protein: newGoals.protein,
          daily_carbs: newGoals.carbs,
          daily_fat: newGoals.fat
        });

      if (error) throw error;

      setGoals(newGoals);
      
      toast({
        title: "Goals updated",
        description: "Your nutrition goals have been saved"
      });
    } catch (error) {
      console.error('Error updating goals:', error);
      toast({
        title: "Error updating goals",
        description: "Failed to save your nutrition goals",
        variant: "destructive"
      });
    }
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
    isLoading,
    addEntry,
    deleteEntry,
    getDailyNutrition,
    updateGoals,
  };
};