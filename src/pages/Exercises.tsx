import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/ui/page-header';
import { Navbar } from '@/components/layout/navbar';
import { ExerciseLibrary } from '@/components/exercise/ExerciseLibrary';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, Target, Zap, TrendingUp } from 'lucide-react';
import { useExercises } from '@/hooks/useExercises';

const Exercises = () => {
  const { allExercises, getAllMuscleGroups } = useExercises();
  
  const muscleGroups = getAllMuscleGroups();
  const totalExercises = allExercises.length;
  const categories = Array.from(new Set(allExercises.map(ex => ex.category))).length;
  const equipmentTypes = Array.from(new Set(allExercises.map(ex => ex.equipment).filter(Boolean))).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <PageHeaderHeading>Exercise Library</PageHeaderHeading>
          <PageHeaderDescription>
            Comprehensive database of exercises with detailed instructions, muscle targeting, and difficulty levels.
            Find the perfect exercises for your workout routine.
          </PageHeaderDescription>
        </PageHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                <Dumbbell className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">{totalExercises}</div>
              <div className="text-sm text-muted-foreground">Total Exercises</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mx-auto mb-3">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold">{muscleGroups.length}</div>
              <div className="text-sm text-muted-foreground">Muscle Groups</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{categories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/10 rounded-lg mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-2xl font-bold">{equipmentTypes}</div>
              <div className="text-sm text-muted-foreground">Equipment Types</div>
            </CardContent>
          </Card>
        </div>

        {/* Exercise Library */}
        <ExerciseLibrary />
      </main>
    </div>
  );
};

export default Exercises;