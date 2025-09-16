import { useWorkouts } from "./useWorkouts";
import { Workout } from "@/types/workout";
import { useToast } from "./use-toast";

export const useExportImport = () => {
  const { workouts, addWorkout } = useWorkouts();
  const { toast } = useToast();

  const exportWorkouts = () => {
    try {
      const dataToExport = {
        workouts,
        exportDate: new Date().toISOString(),
        version: "1.0"
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: "application/json"
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gym-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: "Your workouts have been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export workouts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    try {
      const csvHeaders = [
        "Date",
        "Workout Name", 
        "Exercise",
        "Set Number",
        "Weight (kg)",
        "Reps",
        "RPE",
        "Personal Record",
        "Notes"
      ];

      const csvData = [csvHeaders.join(",")];

      workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          exercise.sets.forEach((set, setIndex) => {
            const row = [
              workout.date,
              `"${workout.name}"`,
              `"${exercise.name}"`,
              setIndex + 1,
              set.weight,
              set.reps,
              set.rpe || "",
              set.isPersonalRecord ? "Yes" : "No",
              `"${exercise.notes || ""}"`
            ];
            csvData.push(row.join(","));
          });
        });
      });

      const blob = new Blob([csvData.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gym-tracker-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "CSV export successful",
        description: "Your workout data has been exported to CSV.",
      });
    } catch (error) {
      toast({
        title: "CSV export failed",
        description: "Failed to export CSV. Please try again.",
        variant: "destructive",
      });
    }
  };

  const importWorkouts = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const importedData = JSON.parse(content);
        
        if (!importedData.workouts || !Array.isArray(importedData.workouts)) {
          throw new Error("Invalid file format");
        }

        const validWorkouts = importedData.workouts.filter((workout: any) => {
          return workout.id && workout.name && workout.date && Array.isArray(workout.exercises);
        });

        if (validWorkouts.length === 0) {
          throw new Error("No valid workouts found in file");
        }

        // Add each workout
        validWorkouts.forEach((workout: Workout) => {
          // Generate new ID to avoid conflicts
          const newWorkout = {
            ...workout,
            id: Date.now().toString() + Math.random()
          };
          addWorkout(newWorkout);
        });

        toast({
          title: "Import successful",
          description: `Imported ${validWorkouts.length} workouts successfully.`,
        });

      } catch (error) {
        toast({
          title: "Import failed",
          description: "Failed to import workouts. Please check the file format.",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  return {
    exportWorkouts,
    exportToCSV,
    importWorkouts
  };
};