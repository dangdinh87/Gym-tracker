import { useWorkouts } from "@/hooks/useWorkouts";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Dumbbell, Calendar, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";

const Index = () => {
  const { workouts } = useWorkouts();
  
  const recentWorkouts = workouts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const totalWorkouts = workouts.length;
  const completedWorkouts = workouts.filter(w => w.completed).length;
  const thisWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return workoutDate >= weekAgo && workoutDate <= now;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <div className="flex justify-between items-start">
            <div>
              <PageHeaderHeading>Dashboard</PageHeaderHeading>
              <PageHeaderDescription>
                Track your fitness journey and monitor your progress
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Workouts</CardTitle>
              <Dumbbell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalWorkouts}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{thisWeekWorkouts}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-foreground">Recent Workouts</CardTitle>
              <Link to="/workouts">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentWorkouts.length > 0 ? (
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-foreground">{workout.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(workout.date).toLocaleDateString()} • {workout.exercises.length} exercises
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {workout.completed && (
                        <span className="text-success text-sm font-medium">Completed</span>
                      )}
                      <Link to={`/workouts/${workout.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No workouts yet. Start your fitness journey!</p>
                <Link to="/workouts/new">
                  <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    Create Your First Workout
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
