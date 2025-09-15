import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon, Sliders } from "lucide-react";

const Settings = () => {
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

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Sliders className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">App Settings</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Customization options coming soon! Configure units, themes, notifications, and more.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;