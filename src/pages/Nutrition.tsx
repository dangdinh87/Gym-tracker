import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Trash2, Calendar, Target } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNutrition } from '@/hooks/useNutrition';
import { FoodSearch } from '@/components/nutrition/FoodSearch';
import { MacroDisplay } from '@/components/nutrition/MacroDisplay';
import { Food, FoodEntry } from '@/types/nutrition';

const Nutrition = () => {
  const { entries, goals, addEntry, deleteEntry, getDailyNutrition, updateGoals } = useNutrition();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [servings, setServings] = useState('1');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [goalInputs, setGoalInputs] = useState(goals);

  const dailyNutrition = getDailyNutrition(selectedDate);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
  };

  const handleAddFood = () => {
    if (!selectedFood) return;

    const servingMultiplier = parseFloat(servings) || 1;
    const entry: FoodEntry = {
      id: Date.now().toString(),
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      servings: servingMultiplier,
      calories: selectedFood.calories * servingMultiplier,
      protein: selectedFood.protein * servingMultiplier,
      carbs: selectedFood.carbs * servingMultiplier,
      fat: selectedFood.fat * servingMultiplier,
      date: selectedDate,
      meal: selectedMeal
    };

    addEntry(entry);
    setSelectedFood(null);
    setServings('1');
    setIsAddingFood(false);
  };

  const handleUpdateGoals = () => {
    updateGoals(goalInputs);
    setIsEditingGoals(false);
  };

  const mealSections = [
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'snack', name: 'Snacks' }
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <PageHeader>
            <PageHeaderHeading>Nutrition Tracking</PageHeaderHeading>
            <PageHeaderDescription>Track your daily macros and calories</PageHeaderDescription>
          </PageHeader>
          <div className="flex gap-2">
            <Dialog open={isEditingGoals} onOpenChange={setIsEditingGoals}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Goals
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nutrition Goals</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={goalInputs.calories}
                        onChange={(e) => setGoalInputs({...goalInputs, calories: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={goalInputs.protein}
                        onChange={(e) => setGoalInputs({...goalInputs, protein: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={goalInputs.carbs}
                        onChange={(e) => setGoalInputs({...goalInputs, carbs: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={goalInputs.fat}
                        onChange={(e) => setGoalInputs({...goalInputs, fat: parseInt(e.target.value) || 0})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleUpdateGoals} className="w-full">
                    Update Goals
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddingFood} onOpenChange={setIsAddingFood}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Food
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Food</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {!selectedFood ? (
                    <FoodSearch onSelectFood={handleSelectFood} />
                  ) : (
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{selectedFood.name}</h4>
                          <p className="text-sm text-muted-foreground">Per {selectedFood.serving}</p>
                          <div className="text-sm mt-2">
                            {selectedFood.calories} cal • P: {selectedFood.protein}g • C: {selectedFood.carbs}g • F: {selectedFood.fat}g
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="servings">Servings</Label>
                          <Input
                            id="servings"
                            type="number"
                            step="0.1"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="meal">Meal</Label>
                          <Select value={selectedMeal} onValueChange={(value: any) => setSelectedMeal(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="breakfast">Breakfast</SelectItem>
                              <SelectItem value="lunch">Lunch</SelectItem>
                              <SelectItem value="dinner">Dinner</SelectItem>
                              <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleAddFood} className="flex-1">Add</Button>
                        <Button variant="outline" onClick={() => setSelectedFood(null)}>Back</Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>

          <MacroDisplay dailyNutrition={dailyNutrition} goals={goals} />

          <div className="space-y-4">
            {mealSections.map(meal => {
              const mealEntries = dailyNutrition.entries.filter(entry => entry.meal === meal.id);
              const mealCalories = mealEntries.reduce((sum, entry) => sum + entry.calories, 0);

              return (
                <Card key={meal.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{meal.name}</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {Math.round(mealCalories)} calories
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mealEntries.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No foods logged</p>
                    ) : (
                      <div className="space-y-2">
                        {mealEntries.map(entry => (
                          <div key={entry.id} className="flex justify-between items-center p-2 rounded-lg bg-accent">
                            <div>
                              <div className="font-medium">{entry.foodName}</div>
                              <div className="text-sm text-muted-foreground">
                                {entry.servings} serving{entry.servings !== 1 ? 's' : ''} • {Math.round(entry.calories)} cal
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEntry(entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Nutrition;