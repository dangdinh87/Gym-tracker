import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Plus, Save, Edit2, Trash2 } from "lucide-react";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Exercise, Set } from "@/types/workout";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWorkout, updateWorkout, deleteWorkout } = useWorkouts();
  
  const workout = getWorkout(id!);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState({
    name: workout?.name || "",
    notes: workout?.notes || "",
    date: workout?.date || new Date().toISOString().split('T')[0],
  });

  if (!workout) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
            <Button onClick={() => navigate('/workouts')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workouts
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleSave = () => {
    updateWorkout(workout.id, editValues);
    setEditMode(false);
    toast({
      title: "Workout updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this workout? This cannot be undone.')) {
      deleteWorkout(workout.id);
      navigate('/workouts');
      toast({
        title: "Workout deleted",
        description: "The workout has been deleted successfully.",
        variant: "destructive",
      });
    }
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "New Exercise",
      sets: [],
      notes: "",
      muscleGroups: [],
    };
    
    updateWorkout(workout.id, {
      exercises: [...workout.exercises, newExercise]
    });
  };

  const updateExercise = (exerciseIndex: number, updates: Partial<Exercise>) => {
    const updatedExercises = workout.exercises.map((exercise, index) =>
      index === exerciseIndex ? { ...exercise, ...updates } : exercise
    );
    updateWorkout(workout.id, { exercises: updatedExercises });
  };

  const deleteExercise = (exerciseIndex: number) => {
    const updatedExercises = workout.exercises.filter((_, index) => index !== exerciseIndex);
    updateWorkout(workout.id, { exercises: updatedExercises });
  };

  const totalVolume = workout.exercises.reduce((total, exercise) => {
    return total + exercise.sets.reduce((exerciseTotal, set) => {
      return exerciseTotal + (set.weight * set.reps);
    }, 0);
  }, 0);

  const totalSets = workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
  const personalRecords = workout.exercises.reduce((total, exercise) => {
    return total + exercise.sets.filter(set => set.isPersonalRecord).length;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/workouts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <PageHeader>
          {editMode ? (
            <div className="space-y-4">
              <Input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="text-4xl font-bold h-auto py-2 border-0 bg-transparent text-transparent bg-gradient-primary bg-clip-text"
                placeholder="Workout Name"
              />
              <div className="flex gap-4">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <PageHeaderHeading>{workout.name}</PageHeaderHeading>
              <div className="flex items-center gap-4">
                <PageHeaderDescription>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(workout.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workout.duration ? `${workout.duration} min` : 'No duration'}
                    </span>
                  </div>
                </PageHeaderDescription>
                <div className="flex gap-2">
                  <Button onClick={() => setEditMode(true)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </PageHeader>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{workout.exercises.length}</div>
              <div className="text-sm text-muted-foreground">Exercises</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{totalSets}</div>
              <div className="text-sm text-muted-foreground">Total Sets</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-500">{totalVolume}</div>
              <div className="text-sm text-muted-foreground">Volume (kg)</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{personalRecords}</div>
              <div className="text-sm text-muted-foreground">PRs</div>
            </CardContent>
          </Card>
        </div>

        {/* Workout Notes */}
        {(workout.notes || editMode) && (
          <Card className="bg-gradient-card border-border shadow-card mb-6">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={editValues.notes}
                  onChange={(e) => setEditValues({ ...editValues, notes: e.target.value })}
                  placeholder="Add workout notes..."
                  rows={3}
                />
              ) : (
                <p className="text-muted-foreground">
                  {workout.notes || "No notes for this workout."}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Exercises */}
        <div className="space-y-6">
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              exerciseIndex={index}
              onUpdate={updateExercise}
              onDelete={deleteExercise}
            />
          ))}

          <Card className="bg-gradient-card border-border shadow-card border-dashed">
            <CardContent className="p-8 text-center">
              <Button onClick={addExercise} variant="ghost" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Exercise
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WorkoutDetail;