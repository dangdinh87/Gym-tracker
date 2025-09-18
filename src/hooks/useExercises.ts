import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface SupabaseExercise {
  id: string;
  name: string;
  category: string;
  primary_muscles: string[];
  secondary_muscles: string[];
  equipment: string | null;
  level: 'beginner' | 'intermediate' | 'advanced';
  force: string | null;
  mechanic: string | null;
  instructions: string[];
  description: string | null;
  tips: string[];
  aliases: string[];
}

export const useExercises = () => {
  const [exercises, setExercises] = useState<SupabaseExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const { toast } = useToast();

  // Load exercises from Supabase
  useEffect(() => {
    const loadExercises = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .order('name');

        if (error) throw error;

        setExercises((data as unknown as SupabaseExercise[]) || []);
        console.log('Loaded exercises from Supabase:', data?.length || 0);
        console.log('Sample exercise:', data?.[0]);
      } catch (error) {
        toast({
          title: "Error loading exercises",
          description: "Failed to load exercises from database",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadExercises();
  }, [toast]);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(exercises.map(ex => ex.category)))];
  
  // Get unique equipment types
  const equipmentTypes = ['All', ...Array.from(new Set(exercises.map(ex => ex.equipment).filter(Boolean)))];
  
  // Get unique levels
  const levels = ['All', 'beginner', 'intermediate', 'advanced'];

  // Filter exercises based on search and filters
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primary_muscles.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         ) ||
                         (exercise.aliases && exercise.aliases.some(alias => 
                           alias.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || exercise.level === selectedLevel;
    const matchesEquipment = selectedEquipment === 'All' || exercise.equipment === selectedEquipment;

    return matchesSearch && matchesCategory && matchesLevel && matchesEquipment;
  });

  // Get exercises by muscle group
  const getExercisesByMuscle = (muscleGroup: string) => {
    return exercises.filter(exercise => 
      exercise.primary_muscles.includes(muscleGroup) ||
      exercise.secondary_muscles.includes(muscleGroup)
    );
  };

  // Get exercise by ID
  const getExerciseById = (id: string) => {
    return exercises.find(exercise => exercise.id === id);
  };

  // Get muscle groups
  const getAllMuscleGroups = () => {
    const muscles = new Set<string>();
    exercises.forEach(exercise => {
      exercise.primary_muscles.forEach(muscle => muscles.add(muscle));
      exercise.secondary_muscles.forEach(muscle => muscles.add(muscle));
    });
    return Array.from(muscles).sort();
  };

  return {
    exercises: filteredExercises,
    allExercises: exercises,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    selectedEquipment,
    setSelectedEquipment,
    categories,
    equipmentTypes,
    levels,
    getExercisesByMuscle,
    getExerciseById,
    getAllMuscleGroups,
  };
};