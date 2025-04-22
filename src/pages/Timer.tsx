
import { useLocation, useNavigate } from "react-router-dom";
import { HourglassTimer } from "@/components/HourglassTimer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TopNavigation } from "@/components/TopNavigation";

export default function Timer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the hours and minutes from location state or use default values
  const { hours = 0, minutes = 0 } = location.state || {};
  
  const handleTimerComplete = () => {
    toast({
      title: "Timer completed!",
      description: "Your timer has finished.",
      variant: "default",
    });
  };
  
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <TopNavigation />
      
      <div className="container mx-auto flex flex-col items-center justify-center flex-1 px-4 py-12">
        <Button 
          variant="ghost" 
          className="text-zinc-400 hover:text-white mb-8 self-start"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
        
        <div className="max-w-md w-full">
          <HourglassTimer 
            hours={hours} 
            minutes={minutes} 
            onComplete={handleTimerComplete} 
          />
        </div>
      </div>
    </div>
  );
}
