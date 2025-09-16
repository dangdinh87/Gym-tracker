export interface ExerciseLibraryItem {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment?: string;
  instructions?: string;
}

export const exerciseLibrary: ExerciseLibraryItem[] = [
  // Chest
  {
    id: "bench-press",
    name: "Bench Press",
    category: "Chest",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    equipment: "Barbell",
    instructions: "Lie on bench, grip bar wider than shoulders, lower to chest, press up"
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "Chest",
    muscleGroups: ["Upper Chest", "Triceps", "Shoulders"],
    equipment: "Barbell"
  },
  {
    id: "dumbbell-press",
    name: "Dumbbell Bench Press",
    category: "Chest",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    equipment: "Dumbbells"
  },
  {
    id: "dips",
    name: "Dips",
    category: "Chest",
    muscleGroups: ["Chest", "Triceps"],
    equipment: "Bodyweight"
  },
  {
    id: "push-ups",
    name: "Push-ups",
    category: "Chest",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    equipment: "Bodyweight"
  },

  // Back
  {
    id: "deadlift",
    name: "Deadlift",
    category: "Back",
    muscleGroups: ["Back", "Glutes", "Hamstrings", "Traps"],
    equipment: "Barbell"
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    category: "Back",
    muscleGroups: ["Lats", "Biceps", "Rhomboids"],
    equipment: "Bodyweight"
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Back",
    muscleGroups: ["Lats", "Biceps", "Rhomboids"],
    equipment: "Cable Machine"
  },
  {
    id: "barbell-rows",
    name: "Barbell Rows",
    category: "Back",
    muscleGroups: ["Lats", "Rhomboids", "Rear Delts"],
    equipment: "Barbell"
  },
  {
    id: "t-bar-rows",
    name: "T-Bar Rows",
    category: "Back",
    muscleGroups: ["Lats", "Rhomboids", "Middle Traps"],
    equipment: "T-Bar"
  },

  // Legs
  {
    id: "squat",
    name: "Squat",
    category: "Legs",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: "Barbell"
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Legs",
    muscleGroups: ["Quadriceps", "Glutes"],
    equipment: "Machine"
  },
  {
    id: "lunges",
    name: "Lunges",
    category: "Legs",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    equipment: "Dumbbells"
  },
  {
    id: "leg-curls",
    name: "Leg Curls",
    category: "Legs",
    muscleGroups: ["Hamstrings"],
    equipment: "Machine"
  },
  {
    id: "calf-raises",
    name: "Calf Raises",
    category: "Legs",
    muscleGroups: ["Calves"],
    equipment: "Machine"
  },

  // Shoulders
  {
    id: "overhead-press",
    name: "Overhead Press",
    category: "Shoulders",
    muscleGroups: ["Shoulders", "Triceps"],
    equipment: "Barbell"
  },
  {
    id: "lateral-raises",
    name: "Lateral Raises",
    category: "Shoulders",
    muscleGroups: ["Side Delts"],
    equipment: "Dumbbells"
  },
  {
    id: "rear-delt-flyes",
    name: "Rear Delt Flyes",
    category: "Shoulders",
    muscleGroups: ["Rear Delts"],
    equipment: "Dumbbells"
  },

  // Arms
  {
    id: "bicep-curls",
    name: "Bicep Curls",
    category: "Arms",
    muscleGroups: ["Biceps"],
    equipment: "Dumbbells"
  },
  {
    id: "tricep-extensions",
    name: "Tricep Extensions",
    category: "Arms",
    muscleGroups: ["Triceps"],
    equipment: "Dumbbells"
  },
  {
    id: "hammer-curls",
    name: "Hammer Curls",
    category: "Arms",
    muscleGroups: ["Biceps", "Forearms"],
    equipment: "Dumbbells"
  },
  {
    id: "close-grip-bench",
    name: "Close Grip Bench Press",
    category: "Arms",
    muscleGroups: ["Triceps", "Chest"],
    equipment: "Barbell"
  }
];

export const exerciseCategories = [
  "All",
  "Chest",
  "Back", 
  "Legs",
  "Shoulders",
  "Arms"
];