export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyNutrition {
  date: string;
  entries: FoodEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}