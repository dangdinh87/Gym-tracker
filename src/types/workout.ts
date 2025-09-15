export interface Set {
  id: string;
  reps: number;
  weight: number;
  rpe?: number;
  restTime?: number;
  isPersonalRecord?: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  sets: Set[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration?: number;
  exercises: Exercise[];
  notes?: string;
  completed: boolean;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: Omit<Exercise, 'sets'>[];
  category: string;
}