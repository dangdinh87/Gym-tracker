import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { exerciseLibrary, exerciseCategories, ExerciseLibraryItem } from "@/data/exerciseLibrary";

interface ExerciseSearchProps {
  onSelect: (exercise: ExerciseLibraryItem) => void;
  trigger?: React.ReactNode;
}

export function ExerciseSearch({ onSelect, trigger }: ExerciseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const filteredExercises = exerciseLibrary.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroups.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (exercise: ExerciseLibraryItem) => {
    onSelect(exercise);
    setOpen(false);
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <Search className="w-4 h-4 mr-2" />
            Browse Exercises
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Exercise Library</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {exerciseCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Exercise List */}
          <div className="overflow-y-auto flex-1 space-y-2">
            {filteredExercises.map((exercise) => (
              <Card 
                key={exercise.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSelect(exercise)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exercise.muscleGroups.map((muscle) => (
                          <Badge key={muscle} variant="secondary" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                      {exercise.equipment && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Equipment: {exercise.equipment}
                        </p>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No exercises found matching your search.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}