import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Download, Upload, Trash2, Sun, Moon, Settings as SettingsIcon, FileText } from "lucide-react";
import { useExportImport } from "@/hooks/useExportImport";
import { useWorkouts } from "@/hooks/useWorkouts";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [weightUnit, setWeightUnit] = useState("kg");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [restTimerSound, setRestTimerSound] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { exportWorkouts, exportToCSV, importWorkouts } = useExportImport();
  const { workouts } = useWorkouts();
  const { toast } = useToast();

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importWorkouts(file);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
          {/* Preferences */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weight Unit</Label>
                  <p className="text-sm text-muted-foreground">Choose between kg and lbs</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">lbs</span>
                  <Switch
                    checked={weightUnit === "kg"}
                    onCheckedChange={(checked) => setWeightUnit(checked ? "kg" : "lbs")}
                  />
                  <span className="text-sm">kg</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4" />
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                  <Moon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications</Label>
                  <p className="text-sm text-muted-foreground">Workout reminders and alerts</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Rest Timer Sound</Label>
                  <p className="text-sm text-muted-foreground">Play sound when rest timer completes</p>
                </div>
                <Switch
                  checked={restTimerSound}
                  onCheckedChange={setRestTimerSound}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Data (JSON)</Label>
                  <p className="text-sm text-muted-foreground">Download your workout data as JSON backup</p>
                </div>
                <Button variant="outline" size="sm" onClick={exportWorkouts}>
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Data (CSV)</Label>
                  <p className="text-sm text-muted-foreground">Export as spreadsheet for analysis</p>
                </div>
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Import Data</Label>
                  <p className="text-sm text-muted-foreground">Import workout data from JSON backup</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleImport}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Clear All Data</Label>
                  <p className="text-sm text-muted-foreground">Delete all workout data permanently</p>
                </div>
                <Button variant="destructive" size="sm" onClick={clearAllData}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Total Workouts: <span className="font-medium">{workouts.length}</span></p>
                  <p>Total Exercises: <span className="font-medium">{workouts.reduce((total, w) => total + w.exercises.length, 0)}</span></p>
                  <p>Storage Used: <span className="font-medium">{(JSON.stringify(workouts).length / 1024).toFixed(1)} KB</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

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