import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface RestTimerProps {
  onComplete?: () => void;
}

export function RestTimer({ onComplete }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(90); // Default 90 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(90);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (duration: number) => {
    setTimeLeft(duration);
    setInitialTime(duration);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Rest Timer</span>
          </div>
          {timeLeft === 0 && (
            <Badge variant="default" className="bg-primary">
              Complete!
            </Badge>
          )}
        </div>

        {/* Timer Display */}
        <div className="text-center mb-4">
          <div className="text-3xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Time Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[60, 90, 120, 180].map((duration) => (
            <Button
              key={duration}
              variant="outline"
              size="sm"
              onClick={() => startTimer(duration)}
              className="text-xs"
            >
              {duration >= 60 ? `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}` : `${duration}s`}
            </Button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <Button
            variant={isRunning ? "secondary" : "default"}
            onClick={toggleTimer}
            className="flex-1"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={resetTimer}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}