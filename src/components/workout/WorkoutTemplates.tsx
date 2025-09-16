import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Zap } from "lucide-react";
import { workoutTemplates } from "@/data/workoutTemplates";
import { WorkoutTemplate } from "@/types/workout";

interface WorkoutTemplatesProps {
  onSelect: (template: WorkoutTemplate) => void;
  trigger?: React.ReactNode;
}

export function WorkoutTemplates({ onSelect, trigger }: WorkoutTemplatesProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (template: WorkoutTemplate) => {
    onSelect(template);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <Copy className="w-4 h-4 mr-2" />
            Use Template
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Workout Templates</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1">
          <div className="grid gap-4">
            {workoutTemplates.map((template) => (
              <Card 
                key={template.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSelect(template)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {template.category}
                      </Badge>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground mb-3">
                      {template.exercises.length} exercises
                    </div>
                    {template.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={exercise.id} className="flex items-center justify-between">
                        <span className="font-medium">{exercise.name}</span>
                        <div className="flex gap-1">
                          {exercise.muscleGroups.slice(0, 2).map((muscle) => (
                            <Badge key={muscle} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    {template.exercises.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        +{template.exercises.length - 3} more exercises
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}