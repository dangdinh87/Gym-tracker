import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Award, Calendar, Dumbbell } from "lucide-react";
import { useWorkouts } from "@/hooks/useWorkouts";
import { format, subDays, isAfter } from "date-fns";

const Progress = () => {
  const { workouts } = useWorkouts();

  // Calculate statistics
  const totalWorkouts = workouts.length;
  const last30Days = workouts.filter(w => 
    isAfter(new Date(w.date), subDays(new Date(), 30))
  ).length;
  
  const totalVolume = workouts.reduce((total, workout) => {
    return total + workout.exercises.reduce((workoutTotal, exercise) => {
      return workoutTotal + exercise.sets.reduce((setTotal, set) => {
        return setTotal + (set.weight * set.reps);
      }, 0);
    }, 0);
  }, 0);

  const personalRecords = workouts.reduce((prs, workout) => {
    workout.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (set.isPersonalRecord) {
          prs.push({
            exercise: exercise.name,
            weight: set.weight,
            reps: set.reps,
            date: workout.date,
          });
        }
      });
    });
    return prs;
  }, [] as Array<{ exercise: string; weight: number; reps: number; date: string }>);

  const recentWorkouts = workouts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <PageHeaderHeading>Progress</PageHeaderHeading>
          <PageHeaderDescription>
            Visualize your fitness journey with detailed charts and statistics
          </PageHeaderDescription>
        </PageHeader>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Workouts</p>
                  <p className="text-3xl font-bold text-primary">{totalWorkouts}</p>
                </div>
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                  <p className="text-3xl font-bold text-accent">{last30Days}</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume (kg)</p>
                  <p className="text-3xl font-bold text-emerald-500">{totalVolume.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Records */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Personal Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              {personalRecords.length > 0 ? (
                <div className="space-y-3">
                  {personalRecords.slice(0, 5).map((pr, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">{pr.exercise}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(pr.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{pr.weight}kg</p>
                        <p className="text-sm text-muted-foreground">{pr.reps} reps</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No personal records yet</p>
                  <p className="text-sm text-muted-foreground">Mark your PRs during workouts!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Workouts */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Recent Workouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentWorkouts.length > 0 ? (
                <div className="space-y-3">
                  {recentWorkouts.map((workout, index) => (
                    <div key={workout.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">{workout.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(workout.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{workout.exercises.length}</p>
                        <p className="text-sm text-muted-foreground">exercises</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No workouts yet</p>
                  <p className="text-sm text-muted-foreground">Start your first workout!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Progress;