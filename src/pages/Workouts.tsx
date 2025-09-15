import { useWorkouts } from "@/hooks/useWorkouts";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Clock, CheckCircle, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";

const Workouts = () => {
  const { workouts, deleteWorkout } = useWorkouts();
  
  const sortedWorkouts = workouts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
            {sortedWorkouts.map((workout) => (
              <Card key={workout.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      {workout.completed ? (
                        <CheckCircle className="h-6 w-6 text-success" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                      <div>
                        <CardTitle className="text-foreground text-xl">{workout.name}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(workout.date).toLocaleDateString()}
                          </div>
                          {workout.duration && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {Math.round(workout.duration / 60)} min
                            </div>
                          )}
                          <span>{workout.exercises.length} exercises</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/workouts/${workout.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Link to={`/workouts/${workout.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteWorkout(workout.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {workout.notes && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm">{workout.notes}</p>
                  </CardContent>
                )}
              </Card>
            ))}
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