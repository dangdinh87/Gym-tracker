import { Navbar } from "@/components/layout/navbar";
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

const Calendar = () => {
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
          <CardContent className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <CalendarIcon className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Calendar View</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Calendar functionality coming soon! Track your workout schedule and plan future sessions.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Calendar;