import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import NewWorkout from "./pages/NewWorkout";
import WorkoutDetail from "./pages/WorkoutDetail";
import Calendar from "./pages/Calendar";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Exercises from "./pages/Exercises";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              {user ? (
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/workouts" element={<Workouts />} />
                  <Route path="/workouts/:id" element={<WorkoutDetail />} />
                  <Route path="/workouts/new" element={<NewWorkout />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/exercises" element={<Exercises />} />
                  <Route path="/settings" element={<Settings />} />
                </>
              ) : (
                <Route path="*" element={<Auth />} />
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
