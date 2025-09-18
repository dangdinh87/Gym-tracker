import { useWorkouts } from "@/hooks/useWorkouts";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { format } from "date-fns";

const Workouts = () => {
  const { workouts, deleteWorkout, isLoading } = useWorkouts();
  
  const sortedWorkouts = workouts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader>
            <div className="flex justify-between items-start">
              <div>
                <PageHeaderHeading>Workouts</PageHeaderHeading>
                <PageHeaderDescription>
                  Manage your workout sessions and track your progress
                </PageHeaderDescription>
              </div>
            </div>
          </PageHeader>
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <div className="flex justify-between items-start">
            <div>
              <PageHeaderHeading>Workouts</PageHeaderHeading>
              <PageHeaderDescription>
                Manage your workout sessions and track your progress
              </PageHeaderDescription>
            </div>
            <Link to="/workouts/new">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                New Workout
              </Button>
            </Link>
          </div>
        </PageHeader>

        {sortedWorkouts.length > 0 ? (
          <div className="grid gap-4">
            {sortedWorkouts.map((workout) => {
              const totalSets = workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
              const totalVolume = workout.exercises.reduce((total, exercise) => {
                return total + exercise.sets.reduce((exerciseTotal, set) => {
                  return exerciseTotal + (set.weight * set.reps);
                }, 0);
              }, 0);

              return (
                <Card key={workout.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(workout.date), 'MMM dd, yyyy')}
                          </span>
                          {workout.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {workout.duration} min
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Badge variant="outline">{workout.exercises.length} exercises</Badge>
                          <Badge variant="outline">{totalSets} sets</Badge>
                          <Badge variant="outline">{totalVolume}kg volume</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/workouts/${workout.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Plus className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No workouts yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Start your fitness journey by creating your first workout session.
              </p>
              <Link to="/workouts/new">
                <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Create Your First Workout
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Workouts;