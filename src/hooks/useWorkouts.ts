import { useState, useEffect } from 'react';
import { Workout } from '@/types/workout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load workouts from Supabase when user is authenticated
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const loadWorkouts = async () => {
      try {
        const { data: workoutsData, error: workoutsError } = await supabase
          .from('workouts')
          .select(`
            *,
            workout_exercises (*)
          `)
          .order('date', { ascending: false });

        if (workoutsError) throw workoutsError;

        const formattedWorkouts: Workout[] = workoutsData?.map(workout => ({
          id: workout.id,
          name: workout.name,
          date: workout.date,
          duration: workout.duration || 0,
          exercises: workout.workout_exercises?.map((exercise: any) => ({
            id: exercise.id,
            name: exercise.name,
            muscleGroups: [],
            sets: typeof exercise.sets === 'string' ? JSON.parse(exercise.sets) : exercise.sets || [],
            notes: exercise.notes || ''
          })) || [],
          notes: workout.notes || '',
          completed: false
        })) || [];

        setWorkouts(formattedWorkouts);
      } catch (error) {
        console.error('Error loading workouts:', error);
        toast({
          title: "Error loading workouts",
          description: "Failed to load workouts from server",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, [user, toast]);

  const addWorkout = async (workout: Workout) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save workouts",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: workoutData, error: workoutError } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          name: workout.name,
          date: workout.date,
          duration: workout.duration,
          notes: workout.notes
        })
        .select()
        .single();

      if (workoutError) throw workoutError;

      // Add exercises
      if (workout.exercises.length > 0) {
        const exercisesData = workout.exercises.map((exercise, index) => ({
          workout_id: workoutData.id,
          name: exercise.name,
          sets: JSON.stringify(exercise.sets),
          notes: exercise.notes || '',
          order_index: index
        }));

        const { data: exercisesInserted, error: exercisesError } = await supabase
          .from('workout_exercises')
          .insert(exercisesData)
          .select();

        if (exercisesError) throw exercisesError;

        const newWorkout: Workout = {
          id: workoutData.id,
          name: workoutData.name,
          date: workoutData.date,
          duration: workoutData.duration || 0,
          exercises: exercisesInserted?.map(exercise => ({
            id: exercise.id,
            name: exercise.name,
            muscleGroups: [],
            sets: typeof exercise.sets === 'string' ? JSON.parse(exercise.sets) : exercise.sets || [],
            notes: exercise.notes || ''
          })) || [],
          notes: workoutData.notes || '',
          completed: false
        };

        setWorkouts(prev => [newWorkout, ...prev]);
      } else {
        const newWorkout: Workout = {
          id: workoutData.id,
          name: workoutData.name,
          date: workoutData.date,
          duration: workoutData.duration || 0,
          exercises: [],
          notes: workoutData.notes || '',
          completed: false
        };

        setWorkouts(prev => [newWorkout, ...prev]);
      }

      toast({
        title: "Workout saved",
        description: `${workout.name} has been saved successfully`
      });
    } catch (error) {
      console.error('Error adding workout:', error);
      toast({
        title: "Error saving workout",
        description: "Failed to save your workout",
        variant: "destructive"
      });
    }
  };

  const updateWorkout = async (id: string, updates: Partial<Workout>) => {
    if (!user) return;

    try {
      const { error: workoutError } = await supabase
        .from('workouts')
        .update({
          name: updates.name,
          date: updates.date,
          duration: updates.duration,
          notes: updates.notes
        })
        .eq('id', id);

      if (workoutError) throw workoutError;

      // Update exercises if provided
      if (updates.exercises) {
        // Delete existing exercises
        await supabase.from('workout_exercises').delete().eq('workout_id', id);

        // Insert new exercises
        if (updates.exercises.length > 0) {
          const exercisesData = updates.exercises.map((exercise, index) => ({
            workout_id: id,
            name: exercise.name,
            sets: JSON.stringify(exercise.sets),
            notes: exercise.notes || '',
            order_index: index
          }));

          await supabase.from('workout_exercises').insert(exercisesData);
        }
      }

      setWorkouts(prev => prev.map(workout => 
        workout.id === id ? { ...workout, ...updates } : workout
      ));

      toast({
        title: "Workout updated",
        description: "Your workout has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating workout:', error);
      toast({
        title: "Error updating workout",
        description: "Failed to update your workout",
        variant: "destructive"
      });
    }
  };

  const deleteWorkout = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWorkouts(prev => prev.filter(workout => workout.id !== id));
      
      toast({
        title: "Workout deleted",
        description: "Your workout has been deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast({
        title: "Error deleting workout",
        description: "Failed to delete your workout",
        variant: "destructive"
      });
    }
  };

  const getWorkout = (id: string) => {
    return workouts.find(w => w.id === id);
  };

  return {
    workouts,
    isLoading,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
  };
};