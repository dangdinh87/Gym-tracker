import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2, Check, X, Award } from "lucide-react";
import { Set } from "@/types/workout";

interface SetRowProps {
  set: Set;
  setIndex: number;
  onUpdate: (setIndex: number, updates: Partial<Set>) => void;
  onDelete: (setIndex: number) => void;
  isEditing?: boolean;
}

export function SetRow({ set, setIndex, onUpdate, onDelete, isEditing = false }: SetRowProps) {
  const [editMode, setEditMode] = useState(isEditing);
  const [editValues, setEditValues] = useState({
    weight: set.weight.toString(),
    reps: set.reps.toString(),
    rpe: set.rpe?.toString() || "",
  });

  const handleSave = () => {
    onUpdate(setIndex, {
      weight: parseFloat(editValues.weight) || 0,
      reps: parseInt(editValues.reps) || 0,
      rpe: editValues.rpe ? parseInt(editValues.rpe) : undefined,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditValues({
      weight: set.weight.toString(),
      reps: set.reps.toString(),
      rpe: set.rpe?.toString() || "",
    });
    setEditMode(false);
  };

  const togglePR = () => {
    onUpdate(setIndex, { isPersonalRecord: !set.isPersonalRecord });
  };

  if (editMode) {
    return (
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
        <span className="w-8 text-sm font-medium text-center">{setIndex + 1}</span>
        
        <Input
          type="number"
          value={editValues.weight}
          onChange={(e) => setEditValues({ ...editValues, weight: e.target.value })}
          className="w-20"
          placeholder="Weight"
        />
        
        <Input
          type="number"
          value={editValues.reps}
          onChange={(e) => setEditValues({ ...editValues, reps: e.target.value })}
          className="w-16"
          placeholder="Reps"
        />
        
        <Input
          type="number"
          value={editValues.rpe}
          onChange={(e) => setEditValues({ ...editValues, rpe: e.target.value })}
          className="w-16"
          placeholder="RPE"
          min="1"
          max="10"
        />
        
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <Check className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
      <span className="w-8 text-sm font-medium text-center">{setIndex + 1}</span>
      
      <div className="flex items-center gap-4 flex-1">
        <span className="font-medium">{set.weight}kg</span>
        <span className="text-muted-foreground">×</span>
        <span className="font-medium">{set.reps} reps</span>
        
        {set.rpe && (
          <>
            <span className="text-muted-foreground">•</span>
            <Badge variant="outline">RPE {set.rpe}</Badge>
          </>
        )}
        
        {set.isPersonalRecord && (
          <Badge variant="default" className="bg-primary">
            <Award className="w-3 h-3 mr-1" />
            PR
          </Badge>
        )}
      </div>
      
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={togglePR}
          className={set.isPersonalRecord ? "text-primary" : ""}
        >
          <Award className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setEditMode(true)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onDelete(setIndex)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}