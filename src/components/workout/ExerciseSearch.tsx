import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SupabaseExercise } from "@/hooks/useExercises";
import { ExerciseLibrary } from "@/components/exercise/ExerciseLibrary";

interface ExerciseSearchProps {
  onSelect: (exercise: SupabaseExercise) => void;
  trigger?: React.ReactNode;
}

export function ExerciseSearch({ onSelect, trigger }: ExerciseSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (exercise: SupabaseExercise) => {
    onSelect(exercise);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Exercise
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Choose Exercise from Library</DialogTitle>
        </DialogHeader>
        
        <ExerciseLibrary onSelectExercise={handleSelect} showAddButton={true} />
      </DialogContent>
    </Dialog>
  );
}