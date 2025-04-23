
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { TaskDetailDialog } from "./TaskDetailDialog"

// Mouse-glow animation helper
function useFollowMouse(selector: string) {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);
    function handleMouse(e: MouseEvent) {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [selector]);
}

interface TaskCardProps {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  eta?: string
  startedAt?: string
}

export function TaskCard({ title, description, status, eta, startedAt }: TaskCardProps) {
  const [showDetail, setShowDetail] = useState(false)
  useFollowMouse('.mouse-glow-card');

  // If startedAt exists, show elapsed time line
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!startedAt) return;
    const interval = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(interval);
  }, [startedAt]);
  let timelineText = "";
  if (startedAt) {
    const started = new Date(startedAt).getTime();
    const diff = Math.floor((now - started) / 1000);
    if (diff >= 86400) timelineText = `${Math.floor(diff/86400)}d ago`;
    else if (diff >= 3600) timelineText = `${Math.floor(diff/3600)}h ago`;
    else if (diff >= 60) timelineText = `${Math.floor(diff/60)}m ago`;
    else timelineText = `just now`;
  }

  return (
    <>
      <Card 
        className="w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px] bg-[#F1F0FB] border-zinc-200 cursor-pointer group mouse-glow-card"
        style={{
          background: "radial-gradient(500px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(241,240,251,0.9) 0%,rgba(200,200,210,0.7) 80%,rgba(241,240,251,0.7) 100%)",
          // Slight soft shadow
          boxShadow: "0 2px 12px 0 rgba(32,32,64,0.09)"
        }}
        onClick={() => setShowDetail(true)}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-base font-mono text-zinc-800">
              {title}
            </CardTitle>
            {eta && (
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3 h-3 text-zinc-600" />
                <span className="text-[10px] text-zinc-600 font-mono lowercase">{eta}</span>
              </div>
            )}
            {timelineText && (
              <div className="text-[10px] text-zinc-500 font-mono mt-1 animate-fade-in">
                {timelineText}
              </div>
            )}
          </div>
          <div className={`h-2.5 w-2.5 rounded-full ${
            status === 'completed' ? 'bg-red-500' :
            status === 'in-progress' ? 'bg-red-500/50' :
            'bg-zinc-300'
          }`} />
        </CardHeader>
        {description && (
          <CardContent className="pt-1">
            <p className="text-xs text-zinc-600 font-mono line-clamp-2">
              {description}
            </p>
          </CardContent>
        )}
      </Card>
      
      <TaskDetailDialog
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        task={{ title, description, status, eta }}
      />
    </>
  )
}
