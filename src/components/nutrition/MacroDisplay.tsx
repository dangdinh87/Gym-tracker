import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyNutrition, NutritionGoals } from '@/types/nutrition';

interface MacroDisplayProps {
  dailyNutrition: DailyNutrition;
  goals: NutritionGoals;
}

export const MacroDisplay = ({ dailyNutrition, goals }: MacroDisplayProps) => {
  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const macros = [
    {
      name: 'Calories',
      current: Math.round(dailyNutrition.totalCalories),
      goal: goals.calories,
      color: 'bg-primary',
      unit: 'kcal'
    },
    {
      name: 'Protein',
      current: Math.round(dailyNutrition.totalProtein),
      goal: goals.protein,
      color: 'bg-blue-500',
      unit: 'g'
    },
    {
      name: 'Carbs',
      current: Math.round(dailyNutrition.totalCarbs),
      goal: goals.carbs,
      color: 'bg-green-500',
      unit: 'g'
    },
    {
      name: 'Fat',
      current: Math.round(dailyNutrition.totalFat),
      goal: goals.fat,
      color: 'bg-yellow-500',
      unit: 'g'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {macros.map(macro => (
        <Card key={macro.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{macro.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{macro.current}</span>
                <span className="text-muted-foreground">/ {macro.goal} {macro.unit}</span>
              </div>
              <Progress 
                value={getProgressPercentage(macro.current, macro.goal)} 
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {Math.round(getProgressPercentage(macro.current, macro.goal))}%
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};