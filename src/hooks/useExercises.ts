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
  const [allExercises, setAllExercises] = useState<SupabaseExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  const ITEMS_PER_PAGE = 12;

  // Load all exercises for filtering options
  useEffect(() => {
    const loadAllExercises = async () => {
      try {
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .order('name');

        if (error) throw error;

        setAllExercises((data as unknown as SupabaseExercise[]) || []);
        console.log('Loaded all exercises from Supabase:', data?.length || 0);
      } catch (error) {
        toast({
          title: "Error loading exercises",
          description: "Failed to load exercises from database",
          variant: "destructive"
        });
      }
    };

    loadAllExercises();
  }, [toast]);

  // Load paginated exercises with filters
  useEffect(() => {
    const loadExercises = async () => {
      try {
        setIsLoading(true);
        
        let query = supabase
          .from('exercises')
          .select('*', { count: 'exact' });

        // Apply filters
        if (selectedCategory !== 'All') {
          query = query.eq('category', selectedCategory as any);
        }
        if (selectedLevel !== 'All') {
          query = query.eq('level', selectedLevel as any);
        }
        if (selectedEquipment !== 'All') {
          query = query.eq('equipment', selectedEquipment as any);
        }
        if (searchTerm) {
          query = query.or(`name.ilike.%${searchTerm}%,primary_muscles.cs.{${searchTerm}},secondary_muscles.cs.{${searchTerm}}`);
        }

        // Apply pagination
        const from = (currentPage - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;
        
        query = query.range(from, to).order('name');

        const { data, error, count } = await query;

        if (error) throw error;

        setExercises((data as unknown as SupabaseExercise[]) || []);
        setTotalCount(count || 0);
        
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
  }, [toast, searchTerm, selectedCategory, selectedLevel, selectedEquipment, currentPage]);

  // Get unique categories from all exercises
  const categories = ['All', ...Array.from(new Set(allExercises.map(ex => ex.category)))];
  
  // Get unique equipment types from all exercises
  const equipmentTypes = ['All', ...Array.from(new Set(allExercises.map(ex => ex.equipment).filter(Boolean)))];
  
  // Get unique levels
  const levels = ['All', 'beginner', 'intermediate', 'advanced'];

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Get exercises by muscle group
  const getExercisesByMuscle = (muscleGroup: string) => {
    return allExercises.filter(exercise => 
      exercise.primary_muscles.includes(muscleGroup) ||
      exercise.secondary_muscles.includes(muscleGroup)
    );
  };

  // Get exercise by ID
  const getExerciseById = (id: string) => {
    return allExercises.find(exercise => exercise.id === id);
  };

  // Get muscle groups
  const getAllMuscleGroups = () => {
    const muscles = new Set<string>();
    allExercises.forEach(exercise => {
      exercise.primary_muscles.forEach(muscle => muscles.add(muscle));
      exercise.secondary_muscles.forEach(muscle => muscles.add(muscle));
    });
    return Array.from(muscles).sort();
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (type: 'category' | 'level' | 'equipment' | 'search', value: string) => {
    setCurrentPage(1);
    switch (type) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'level':
        setSelectedLevel(value);
        break;
      case 'equipment':
        setSelectedEquipment(value);
        break;
      case 'search':
        setSearchTerm(value);
        break;
    }
  };

  return {
    exercises,
    allExercises,
    isLoading,
    searchTerm,
    setSearchTerm: (value: string) => handleFilterChange('search', value),
    selectedCategory,
    setSelectedCategory: (value: string) => handleFilterChange('category', value),
    selectedLevel,
    setSelectedLevel: (value: string) => handleFilterChange('level', value),
    selectedEquipment,
    setSelectedEquipment: (value: string) => handleFilterChange('equipment', value),
    categories,
    equipmentTypes,
    levels,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
    getExercisesByMuscle,
    getExerciseById,
    getAllMuscleGroups,
  };
};