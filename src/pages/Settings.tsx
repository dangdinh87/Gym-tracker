import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Download, Upload, Trash2, Scale, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const Settings = () => {
  const { workouts } = useWorkouts();
  const [useKg, setUseKg] = useState(true);

  const exportData = () => {
    const dataStr = JSON.stringify(workouts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gym-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Your workout data has been downloaded successfully.",
    });
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        localStorage.setItem('gym-tracker-workouts', JSON.stringify(importedData));
        window.location.reload();
        
        toast({
          title: "Data imported",
          description: "Your workout data has been imported successfully.",
        });
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid file format. Please select a valid backup file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all workout data? This cannot be undone.')) {
      localStorage.removeItem('gym-tracker-workouts');
      window.location.reload();
      
      toast({
        title: "Data cleared",
        description: "All workout data has been deleted.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader>
          <PageHeaderHeading>Settings</PageHeaderHeading>
          <PageHeaderDescription>
            Customize your app experience and manage your preferences
          </PageHeaderDescription>
        </PageHeader>

        <div className="space-y-6">
          {/* Units */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Units
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="units" className="text-base font-medium">Weight Units</Label>
                  <p className="text-sm text-muted-foreground">Choose between kilograms and pounds</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="units" className="text-sm">lb</Label>
                  <Switch
                    id="units"
                    checked={useKg}
                    onCheckedChange={setUseKg}
                  />
                  <Label htmlFor="units" className="text-sm">kg</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                
                <div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                    id="import-file"
                  />
                  <Label htmlFor="import-file">
                    <Button variant="outline" className="flex items-center gap-2 w-full" asChild>
                      <span>
                        <Upload className="h-4 w-4" />
                        Import Data
                      </span>
                    </Button>
                  </Label>
                </div>
                
                <Button 
                  onClick={clearAllData}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Data
                </Button>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Data Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Workouts:</span>
                    <span className="ml-2 font-medium">{workouts.length}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Exercises:</span>
                    <span className="ml-2 font-medium">
                      {workouts.reduce((total, w) => total + w.exercises.length, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>GymTracker</strong> - Your personal fitness companion
                </p>
                <p className="text-sm text-muted-foreground">
                  Track workouts, monitor progress, and achieve your fitness goals.
                </p>
                <p className="text-sm text-muted-foreground">
                  Data is stored locally on your device for privacy and offline access.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;