import { Food } from '@/types/nutrition';

export const foodDatabase: Food[] = [
  // Proteins
  {
    id: '1',
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    serving: '100g'
  },
  {
    id: '2',
    name: 'Salmon',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 12,
    serving: '100g'
  },
  {
    id: '3',
    name: 'Eggs',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    serving: '100g (2 large)'
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    serving: '100g'
  },
  
  // Carbs
  {
    id: '5',
    name: 'Brown Rice',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    serving: '100g cooked'
  },
  {
    id: '6',
    name: 'Oats',
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    serving: '100g dry'
  },
  {
    id: '7',
    name: 'Sweet Potato',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    serving: '100g'
  },
  {
    id: '8',
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    serving: '100g (1 medium)'
  },
  
  // Fats
  {
    id: '9',
    name: 'Avocado',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    serving: '100g'
  },
  {
    id: '10',
    name: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    serving: '100g'
  },
  {
    id: '11',
    name: 'Olive Oil',
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    serving: '100g (7 tbsp)'
  },
  
  // Vegetables
  {
    id: '12',
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    serving: '100g'
  },
  {
    id: '13',
    name: 'Spinach',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    serving: '100g'
  }
];