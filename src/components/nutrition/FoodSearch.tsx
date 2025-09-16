import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { foodDatabase } from '@/data/foodDatabase';
import { Food } from '@/types/nutrition';

interface FoodSearchProps {
  onSelectFood: (food: Food) => void;
}

export const FoodSearch = ({ onSelectFood }: FoodSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 1) {
      const filtered = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredFoods.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredFoods.map(food => (
            <Card key={food.id} className="cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-3" onClick={() => onSelectFood(food)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{food.name}</h4>
                    <p className="text-sm text-muted-foreground">Per {food.serving}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{food.calories} cal</div>
                    <div className="text-muted-foreground">
                      P: {food.protein}g C: {food.carbs}g F: {food.fat}g
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};