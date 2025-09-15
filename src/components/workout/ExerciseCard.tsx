import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { Exercise, Set } from "@/types/workout";
import { SetRow } from "./SetRow";

interface ExerciseCardProps {
  exercise: Exercise;
  exerciseIndex: number;
  onUpdate: (exerciseIndex: number, updates: Partial<Exercise>) => void;
  onDelete: (exerciseIndex: number) => void;
  isEditable?: boolean;
}

export function ExerciseCard({ exercise, exerciseIndex, onUpdate, onDelete, isEditable = true }: ExerciseCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(exercise.name);

  const handleNameSave = () => {
    onUpdate(exerciseIndex, { name: editName });
    setEditMode(false);
  };

  const handleNameCancel = () => {
    setEditName(exercise.name);
    setEditMode(false);
  };

  const addSet = () => {
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet: Set = {
      id: Date.now().toString(),
      weight: lastSet?.weight || 0,
      reps: lastSet?.reps || 0,
      isPersonalRecord: false,
    };
    
    onUpdate(exerciseIndex, {
      sets: [...exercise.sets, newSet]
    });
  };

  const updateSet = (setIndex: number, updates: Partial<Set>) => {
    const updatedSets = exercise.sets.map((set, index) =>
      index === setIndex ? { ...set, ...updates } : set
    );
    onUpdate(exerciseIndex, { sets: updatedSets });
  };

  const deleteSet = (setIndex: number) => {
    const updatedSets = exercise.sets.filter((_, index) => index !== setIndex);
    onUpdate(exerciseIndex, { sets: updatedSets });
  };

  const totalVolume = exercise.sets.reduce((total, set) => total + (set.weight * set.reps), 0);
  const maxWeight = Math.max(...exercise.sets.map(set => set.weight), 0);

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {editMode ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" variant="ghost" onClick={handleNameSave}>
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleNameCancel}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{exercise.name}</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">{exercise.sets.length} sets</Badge>
                  <Badge variant="outline">{totalVolume}kg total</Badge>
                  {maxWeight > 0 && <Badge variant="outline">{maxWeight}kg max</Badge>}
                </div>
              </div>
              
              {isEditable && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setEditMode(true)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(exerciseIndex)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {exercise.sets.map((set, setIndex) => (
          <SetRow
            key={set.id}
            set={set}
            setIndex={setIndex}
            onUpdate={updateSet}
            onDelete={deleteSet}
          />
        ))}

        {isEditable && (
          <Button
            variant="outline"
            onClick={addSet}
            className="w-full flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Set
          </Button>
        )}

        {exercise.notes && (
          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">{exercise.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}