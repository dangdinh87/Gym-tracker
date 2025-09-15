import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Dumbbell, Plus } from "lucide-react";
import { useWorkouts } from "@/hooks/useWorkouts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const { workouts } = useWorkouts();
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getWorkoutsForDate = (date: Date) => {
    return workouts.filter(workout => 
      isSameDay(new Date(workout.date), date)
    );
  };

  const navigateToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const navigateToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <PageHeaderHeading>Calendar</PageHeaderHeading>
          <PageHeaderDescription>
            View your workout schedule and plan future sessions
          </PageHeaderDescription>
        </PageHeader>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                {format(currentDate, 'MMMM yyyy')}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={navigateToPreviousMonth}>
                  ←
                </Button>
                <Button variant="outline" size="sm" onClick={navigateToNextMonth}>
                  →
                </Button>
                <Button size="sm" onClick={() => navigate('/workouts/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Workout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map(day => {
                const dayWorkouts = getWorkoutsForDate(day);
                const hasWorkouts = dayWorkouts.length > 0;
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`
                      min-h-[100px] p-2 border border-border rounded-lg
                      ${isToday(day) ? 'bg-primary/10 border-primary' : 'bg-card'}
                      ${hasWorkouts ? 'border-accent' : ''}
                    `}
                  >
                    <div className="text-sm font-medium mb-1">
                      {format(day, 'd')}
                    </div>
                    
                    {dayWorkouts.map(workout => (
                      <div
                        key={workout.id}
                        className="text-xs bg-primary/20 text-primary rounded px-2 py-1 mb-1 flex items-center"
                      >
                        <Dumbbell className="w-3 h-3 mr-1" />
                        <span className="truncate">{workout.name}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Calendar;