
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { TaskDetailDialog } from "./TaskDetailDialog"

// New Mouse-bar animation helper (metallic light streak)
function useBarMouseEffect(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handle(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      // Update CSS var for a horizontal translucent band following mouse
      el.style.setProperty("--bar-x", `${x}px`);
    }
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [ref]);
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
  const cardRef = useRef<HTMLDivElement>(null);
  useBarMouseEffect(cardRef);

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
        ref={cardRef}
        className={`
          w-full transition-all duration-200 ease-out cursor-pointer group relative z-10
          bg-[rgba(246,247,250,0.95)]
          border border-dotted border-zinc-300
          before:pointer-events-none before:absolute before:inset-0
          before:rounded-2xl before:z-10
          hover:before:opacity-100
          hover:scale-[1.03]
          hover:z-30
          shadow-md
          `}
        style={{
          background: "rgba(246,247,250,0.99)", // subtle off-white
          // Glass style & bar light (on hover with CSS var)
          boxShadow: "0 4px 24px 0 rgba(190,194,210,0.10)",
          overflow: "hidden",
        }}
        onClick={() => setShowDetail(true)}
      >
        {/* Light streak/bar as a pseudo-element */}
        <div
          className="pointer-events-none absolute left-0 top-0 w-full h-full z-20"
          style={{
            mixBlendMode: "screen",
            // Bar effect: follows mouse X
            background: "linear-gradient(90deg, transparent 0%, white 12%, rgba(230,230,255,0.65) 36%, white 70%, transparent 100%)",
            opacity: 0.20,
            transform: "translateX(calc(var(--bar-x, 90px) - 90px))",
            transition: "transform 0.13s cubic-bezier(0.64,0.01,0.4,1)"
          }}
        />
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
        {/* Subtle white border on hover (animation) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white transition-all duration-200 opacity-0 group-hover:opacity-50 z-30"></div>
      </Card>
      <TaskDetailDialog
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        task={{ title, description, status, eta }}
      />
    </>
  )
}

