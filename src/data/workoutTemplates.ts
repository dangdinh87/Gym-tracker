import { WorkoutTemplate } from "@/types/workout";

export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: "push-day",
    name: "Push Day",
    category: "Upper Body",
    exercises: [
      {
        id: "1",
        name: "Bench Press",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        notes: "3-4 sets of 6-8 reps"
      },
      {
        id: "2", 
        name: "Incline Dumbbell Press",
        muscleGroups: ["Upper Chest", "Shoulders"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "3",
        name: "Overhead Press", 
        muscleGroups: ["Shoulders", "Triceps"],
        notes: "3 sets of 6-8 reps"
      },
      {
        id: "4",
        name: "Lateral Raises",
        muscleGroups: ["Side Delts"],
        notes: "3 sets of 12-15 reps"
      },
      {
        id: "5",
        name: "Tricep Extensions",
        muscleGroups: ["Triceps"],
        notes: "3 sets of 10-12 reps"
      },
      {
        id: "6",
        name: "Dips",
        muscleGroups: ["Chest", "Triceps"],
        notes: "3 sets to failure"
      }
    ]
  },
  {
    id: "pull-day",
    name: "Pull Day", 
    category: "Upper Body",
    exercises: [
      {
        id: "1",
        name: "Deadlift",
        muscleGroups: ["Back", "Hamstrings", "Glutes"],
        notes: "3-4 sets of 5-6 reps"
      },
      {
        id: "2",
        name: "Pull-ups",
        muscleGroups: ["Lats", "Biceps"],
        notes: "3-4 sets to failure"
      },
      {
        id: "3", 
        name: "Barbell Rows",
        muscleGroups: ["Lats", "Rhomboids"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "4",
        name: "Lat Pulldown",
        muscleGroups: ["Lats", "Biceps"],
        notes: "3 sets of 10-12 reps"
      },
      {
        id: "5",
        name: "Bicep Curls",
        muscleGroups: ["Biceps"],
        notes: "3 sets of 10-12 reps"
      },
      {
        id: "6",
        name: "Hammer Curls",
        muscleGroups: ["Biceps", "Forearms"],
        notes: "3 sets of 10-12 reps"
      }
    ]
  },
  {
    id: "leg-day",
    name: "Leg Day",
    category: "Lower Body", 
    exercises: [
      {
        id: "1",
        name: "Squat",
        muscleGroups: ["Quadriceps", "Glutes"],
        notes: "4 sets of 6-8 reps"
      },
      {
        id: "2",
        name: "Romanian Deadlift",
        muscleGroups: ["Hamstrings", "Glutes"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "3",
        name: "Leg Press",
        muscleGroups: ["Quadriceps", "Glutes"],
        notes: "3 sets of 12-15 reps"
      },
      {
        id: "4",
        name: "Leg Curls",
        muscleGroups: ["Hamstrings"],
        notes: "3 sets of 10-12 reps"
      },
      {
        id: "5",
        name: "Calf Raises",
        muscleGroups: ["Calves"],
        notes: "4 sets of 15-20 reps"
      },
      {
        id: "6",
        name: "Lunges",
        muscleGroups: ["Quadriceps", "Glutes"],
        notes: "3 sets of 10 reps each leg"
      }
    ]
  },
  {
    id: "full-body",
    name: "Full Body Workout",
    category: "Full Body",
    exercises: [
      {
        id: "1",
        name: "Squat",
        muscleGroups: ["Quadriceps", "Glutes"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "2", 
        name: "Bench Press",
        muscleGroups: ["Chest", "Triceps"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "3",
        name: "Barbell Rows",
        muscleGroups: ["Lats", "Rhomboids"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "4",
        name: "Overhead Press",
        muscleGroups: ["Shoulders", "Triceps"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "5",
        name: "Deadlift",
        muscleGroups: ["Back", "Hamstrings"],
        notes: "2 sets of 5-6 reps"
      }
    ]
  },
  {
    id: "upper-body",
    name: "Upper Body",
    category: "Upper Body",
    exercises: [
      {
        id: "1",
        name: "Bench Press",
        muscleGroups: ["Chest", "Triceps"],
        notes: "4 sets of 6-8 reps"
      },
      {
        id: "2",
        name: "Pull-ups",
        muscleGroups: ["Lats", "Biceps"],
        notes: "3 sets to failure"
      },
      {
        id: "3",
        name: "Overhead Press",
        muscleGroups: ["Shoulders"],
        notes: "3 sets of 8-10 reps"
      },
      {
        id: "4",
        name: "Dips",
        muscleGroups: ["Chest", "Triceps"],
        notes: "3 sets to failure"
      },
      {
        id: "5",
        name: "Bicep Curls",
        muscleGroups: ["Biceps"],
        notes: "3 sets of 10-12 reps"
      }
    ]
  }
];