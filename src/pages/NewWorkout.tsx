import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Workout, Exercise, Set } from "@/types/workout";
import { PageHeader, PageHeaderHeading } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, ArrowLeft, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NewWorkout = () => {
  const navigate = useNavigate();
  const { addWorkout } = useWorkouts();
  const { toast } = useToast();
  
  const [workout, setWorkout] = useState<Partial<Workout>>({
    name: "",
    date: new Date().toISOString().split('T')[0],
    exercises: [],
    notes: "",
    completed: false,
  });

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      muscleGroups: [],
      sets: [createNewSet()],
      notes: "",
    };
    
    setWorkout(prev => ({
      ...prev,
      exercises: [...(prev.exercises || []), newExercise]
    }));
  };

  const createNewSet = (): Set => ({
    id: Date.now().toString() + Math.random(),
    reps: 0,
    weight: 0,
  });

  const updateExercise = (index: number, updates: Partial<Exercise>) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises?.map((ex, i) => 
        i === index ? { ...ex, ...updates } : ex
      ) || []
    }));
  };

  const removeExercise = (index: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises?.filter((_, i) => i !== index) || []
    }));
  };

  const addSet = (exerciseIndex: number) => {
    const newSet = createNewSet();
    updateExercise(exerciseIndex, {
      sets: [...(workout.exercises?.[exerciseIndex]?.sets || []), newSet]
    });
  };

  const updateSet = (exerciseIndex: number, setIndex: number, updates: Partial<Set>) => {
    const exercise = workout.exercises?.[exerciseIndex];
    if (!exercise) return;
    
    const updatedSets = exercise.sets.map((set, i) => 
      i === setIndex ? { ...set, ...updates } : set
    );
    
    updateExercise(exerciseIndex, { sets: updatedSets });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const exercise = workout.exercises?.[exerciseIndex];
    if (!exercise) return;
    
    const updatedSets = exercise.sets.filter((_, i) => i !== setIndex);
    updateExercise(exerciseIndex, { sets: updatedSets });
  };

  const saveWorkout = () => {
    if (!workout.name) {
      toast({
        title: "Error",
        description: "Please enter a workout name",
        variant: "destructive",
      });
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workout.name,
      date: workout.date || new Date().toISOString().split('T')[0],
      exercises: workout.exercises || [],
      notes: workout.notes,
      completed: false,
    };

    addWorkout(newWorkout);
    toast({
      title: "Success",
      description: "Workout created successfully!",
    });
    navigate("/workouts");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <div className="flex items-center space-x-4">
            <Link to="/workouts">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <PageHeaderHeading>New Workout</PageHeaderHeading>
          </div>
        </PageHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Workout Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Workout Name</Label>
                  <Input
                    id="name"
                    value={workout.name}
                    onChange={(e) => setWorkout(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Push Day, Leg Day"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={workout.date}
                    onChange={(e) => setWorkout(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={workout.notes}
                  onChange={(e) => setWorkout(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any notes about this workout..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Exercises */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Exercises</CardTitle>
                <Button onClick={addExercise} size="sm" className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Exercise
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {workout.exercises && workout.exercises.length > 0 ? (
                <div className="space-y-6">
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <div key={exercise.id} className="p-4 border border-border rounded-lg bg-muted/50">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <Input
                            value={exercise.name}
                            onChange={(e) => updateExercise(exerciseIndex, { name: e.target.value })}
                            placeholder="Exercise name (e.g., Bench Press)"
                            className="text-lg font-medium"
                          />
                        </div>
                        <Button 
                          onClick={() => removeExercise(exerciseIndex)}
                          variant="destructive" 
                          size="sm"
                          className="ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground">
                          <span>Set</span>
                          <span>Reps</span>
                          <span>Weight (kg)</span>
                          <span>Actions</span>
                        </div>
                        
                        {exercise.sets.map((set, setIndex) => (
                          <div key={set.id} className="grid grid-cols-4 gap-2 items-center">
                            <span className="text-sm font-medium">{setIndex + 1}</span>
                            <Input
                              type="number"
                              value={set.reps || ""}
                              onChange={(e) => updateSet(exerciseIndex, setIndex, { reps: parseInt(e.target.value) || 0 })}
                              placeholder="0"
                              min="0"
                            />
                            <Input
                              type="number"
                              value={set.weight || ""}
                              onChange={(e) => updateSet(exerciseIndex, setIndex, { weight: parseFloat(e.target.value) || 0 })}
                              placeholder="0"
                              min="0"
                              step="0.5"
                            />
                            <Button
                              onClick={() => removeSet(exerciseIndex, setIndex)}
                              variant="outline"
                              size="sm"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        
                        <Button
                          onClick={() => addSet(exerciseIndex)}
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Set
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No exercises added yet</p>
                  <Button onClick={addExercise} className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Exercise
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Link to="/workouts">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={saveWorkout} className="bg-gradient-primary hover:shadow-glow">
              <Save className="w-4 h-4 mr-2" />
              Save Workout
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewWorkout;