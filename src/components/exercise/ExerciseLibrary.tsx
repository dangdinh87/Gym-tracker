import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Dumbbell, Target, Zap, Settings, Plus, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useExercises, SupabaseExercise } from '@/hooks/useExercises';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
    allExercises,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCount,
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
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
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
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-48" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-gradient-card border-border">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  console.log('Exercises loaded:', exercises.length, 'Total in DB:', allExercises.length);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="w-5 h-5 text-primary" />
              </div>
              Exercise Library
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{totalCount}</span>
              <span>total exercises</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search exercises, muscles, or aliases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-border/50 focus:border-primary/50 transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-border/50 focus:border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Level
              </label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="border-border/50 focus:border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level} className="capitalize">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                Equipment
              </label>
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger className="border-border/50 focus:border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {equipmentTypes.map(equipment => (
                    <SelectItem key={equipment} value={equipment} className="capitalize">
                      {equipment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{exercises.length}</span> of <span className="font-medium text-foreground">{totalCount}</span> exercises
              </span>
              <span className="text-muted-foreground">
                Page <span className="font-medium text-foreground">{currentPage}</span> of <span className="font-medium text-foreground">{totalPages}</span>
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSelectedEquipment('All');
              }}
              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-slide-up">
        {exercises.map((exercise, index) => (
          <Card 
            key={exercise.id} 
            className="bg-gradient-card border-border hover:shadow-glow hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden"
            onClick={() => handleExerciseSelect(exercise)}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-200 truncate">
                    {exercise.name}
                  </CardTitle>
                  <CardDescription className="mt-1 capitalize font-medium text-sm">
                    {exercise.category}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2 ml-3">
                  <Badge 
                    variant="outline" 
                    className={`${getLevelColor(exercise.level)} font-semibold text-xs px-2 py-1`}
                  >
                    {exercise.level}
                  </Badge>
                  {exercise.force && (
                    <div className="flex items-center gap-1">
                      <span className="text-lg" title={`Force: ${exercise.force}`}>
                        {getForceIcon(exercise.force)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {/* Primary Muscles */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-primary/10 rounded">
                    <Target className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-semibold">Primary Targets</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {exercise.primary_muscles.slice(0, 3).map((muscle) => (
                    <Badge key={muscle} variant="secondary" className="text-xs font-medium">
                      {muscle}
                    </Badge>
                  ))}
                  {exercise.primary_muscles.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{exercise.primary_muscles.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Secondary Muscles */}
              {exercise.secondary_muscles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-muted rounded">
                      <Zap className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Secondary</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exercise.secondary_muscles.slice(0, 2).map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                    {exercise.secondary_muscles.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{exercise.secondary_muscles.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {/* Equipment */}
              {exercise.equipment && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-md px-2 py-1">
                  <Settings className="w-3 h-3" />
                  <span className="capitalize font-medium">{exercise.equipment}</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-border/50">
                {showAddButton && onSelectExercise && (
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-200"
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
                      className={`${showAddButton ? "flex-1" : "w-full"} hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all duration-200`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] bg-gradient-card">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Dumbbell className="w-5 h-5 text-primary" />
                        </div>
                        {exercise.name}
                        <Badge variant="outline" className={getLevelColor(exercise.level)}>
                          {exercise.level}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription className="capitalize text-base">
                        {exercise.category} • {exercise.equipment || 'No equipment needed'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <ScrollArea className="max-h-[60vh]">
                      <div className="space-y-6 pr-4">
                        {/* Description */}
                        {exercise.description && (
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary" />
                              Description
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">{exercise.description}</p>
                          </div>
                        )}
                        
                        {/* Muscle Groups */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-success">
                              <Target className="w-4 h-4" />
                              Primary Muscles
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exercise.primary_muscles.map((muscle) => (
                                <Badge key={muscle} className="bg-success/10 text-success border-success/20">
                                  {muscle}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {exercise.secondary_muscles.length > 0 && (
                            <div className="p-4 bg-muted/30 border border-border rounded-lg">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
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
                          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <h4 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                              <Settings className="w-4 h-4" />
                              Step-by-Step Instructions
                            </h4>
                            <ol className="space-y-3">
                              {exercise.instructions.map((instruction, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="flex-shrink-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                  </span>
                                  <span className="text-muted-foreground leading-relaxed pt-1">{instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {/* Tips */}
                        {exercise.tips && exercise.tips.length > 0 && (
                          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-600 dark:text-amber-400">
                              <Zap className="w-4 h-4" />
                              Pro Tips
                            </h4>
                            <ul className="space-y-2">
                              {exercise.tips.map((tip, index) => (
                                <li key={index} className="flex gap-3">
                                  <span className="text-amber-500 mt-1">●</span>
                                  <span className="text-muted-foreground leading-relaxed">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Aliases */}
                        {exercise.aliases && exercise.aliases.length > 0 && (
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-semibold mb-3">Also Known As</h4>
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
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                />
              </PaginationItem>
              
              {/* Page numbers */}
              {(() => {
                const pages = [];
                const showPages = 5;
                let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
                let endPage = Math.min(totalPages, startPage + showPages - 1);
                
                if (endPage - startPage + 1 < showPages) {
                  startPage = Math.max(1, endPage - showPages + 1);
                }
                
                if (startPage > 1) {
                  pages.push(
                    <PaginationItem key={1}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(1)}
                        isActive={currentPage === 1}
                        className="cursor-pointer"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                  );
                  if (startPage > 2) {
                    pages.push(
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                }
                
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(i)}
                        isActive={currentPage === i}
                        className="cursor-pointer"
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  pages.push(
                    <PaginationItem key={totalPages}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(totalPages)}
                        isActive={currentPage === totalPages}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                return pages;
              })()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-primary/10"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {exercises.length === 0 && !isLoading && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted/30 rounded-full flex items-center justify-center">
              <Dumbbell className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">No exercises found</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              We couldn't find any exercises matching your current filters. Try adjusting your search terms or clearing some filters.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Total exercises: <span className="font-medium text-foreground">{allExercises.length}</span></span>
              <span>•</span>
              <span>Current filters: <span className="font-medium text-foreground">{
                [
                  searchTerm && `"${searchTerm}"`,
                  selectedCategory !== 'All' && selectedCategory,
                  selectedLevel !== 'All' && selectedLevel,
                  selectedEquipment !== 'All' && selectedEquipment
                ].filter(Boolean).join(', ') || 'None'
              }</span></span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}