import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Dumbbell, Target, Zap, Settings, Plus, Info } from 'lucide-react';
import { useExercises, SupabaseExercise } from '@/hooks/useExercises';
import { Skeleton } from '@/components/ui/skeleton';

interface ExerciseLibraryProps {
  onSelectExercise?: (exercise: SupabaseExercise) => void;
  showAddButton?: boolean;
}

export function ExerciseLibrary({ onSelectExercise, showAddButton = false }: ExerciseLibraryProps) {
  const {
    exercises,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    selectedEquipment,
    setSelectedEquipment,
    categories,
    equipmentTypes,
    levels,
  } = useExercises();

  const [selectedExercise, setSelectedExercise] = useState<SupabaseExercise | null>(null);

  const handleExerciseSelect = (exercise: SupabaseExercise) => {
    if (onSelectExercise) {
      onSelectExercise(exercise);
    } else {
      setSelectedExercise(exercise);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getForceIcon = (force: string | null) => {
    switch (force) {
      case 'push': return '⬆️';
      case 'pull': return '⬇️';
      case 'static': return '⏸️';
      default: return '🔄';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Exercise Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search exercises, muscles, or aliases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Equipment</label>
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map(equipment => (
                    <SelectItem key={equipment} value={equipment}>
                      {equipment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Found {exercises.length} exercises</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSelectedEquipment('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <Card 
            key={exercise.id} 
            className="bg-gradient-card border-border hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
            onClick={() => handleExerciseSelect(exercise)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {exercise.name}
                  </CardTitle>
                  <CardDescription className="mt-1 capitalize">
                    {exercise.category}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className={getLevelColor(exercise.level)}>
                    {exercise.level}
                  </Badge>
                  {exercise.force && (
                    <span className="text-lg" title={`Force: ${exercise.force}`}>
                      {getForceIcon(exercise.force)}
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Primary Muscles */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Primary</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {exercise.primary_muscles.map((muscle) => (
                    <Badge key={muscle} variant="secondary" className="text-xs">
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Secondary Muscles */}
              {exercise.secondary_muscles.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Secondary</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exercise.secondary_muscles.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Equipment */}
              {exercise.equipment && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Settings className="w-4 h-4" />
                  <span className="capitalize">{exercise.equipment}</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {showAddButton && onSelectExercise && (
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectExercise(exercise);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={showAddButton ? "flex-1" : "w-full"}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <Dumbbell className="w-5 h-5" />
                        {exercise.name}
                        <Badge className={getLevelColor(exercise.level)}>
                          {exercise.level}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription className="capitalize">
                        {exercise.category} • {exercise.equipment || 'No equipment'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <ScrollArea className="max-h-[60vh]">
                      <div className="space-y-6">
                        {/* Description */}
                        {exercise.description && (
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{exercise.description}</p>
                          </div>
                        )}
                        
                        {/* Muscle Groups */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Primary Muscles
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exercise.primary_muscles.map((muscle) => (
                                <Badge key={muscle} variant="secondary">
                                  {muscle}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {exercise.secondary_muscles.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Secondary Muscles
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exercise.secondary_muscles.map((muscle) => (
                                  <Badge key={muscle} variant="outline">
                                    {muscle}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Instructions */}
                        {exercise.instructions.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Instructions</h4>
                            <ol className="space-y-2">
                              {exercise.instructions.map((instruction, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                                    {index + 1}
                                  </span>
                                  <span className="text-muted-foreground">{instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {/* Tips */}
                        {exercise.tips && exercise.tips.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Tips</h4>
                            <ul className="space-y-2">
                              {exercise.tips.map((tip, index) => (
                                <li key={index} className="flex gap-2">
                                  <span className="text-primary">•</span>
                                  <span className="text-muted-foreground">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Aliases */}
                        {exercise.aliases && exercise.aliases.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Also Known As</h4>
                            <div className="flex flex-wrap gap-2">
                              {exercise.aliases.map((alias) => (
                                <Badge key={alias} variant="outline" className="text-xs">
                                  {alias}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {exercises.length === 0 && (
        <Card className="bg-gradient-card border-border">
          <CardContent className="py-12 text-center">
            <Dumbbell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No exercises found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find exercises.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}