
import { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/types"
import { useNavigate } from "react-router-dom"

// Mouse tracking bar effect for project card
function useBarMouseEffect(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handle(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      el.style.setProperty("--bar-x", `${x}px`);
    }
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [ref]);
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { id, title, description, tasks } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  useBarMouseEffect(cardRef);

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card 
      ref={cardRef}
      className={`
        w-full transition-all duration-200 ease-out cursor-pointer group relative z-10
        bg-[rgba(246,247,250,0.97)]
        border border-dotted border-zinc-300
        before:pointer-events-none before:absolute before:inset-0
        before:rounded-2xl before:z-10
        hover:before:opacity-100
        hover:scale-[1.025]
        hover:z-30
        shadow-md
        `}
      style={{
        background: "rgba(246,247,250,0.99)",
        boxShadow: "0 4px 24px 0 rgba(190,194,210,0.11)",
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      {/* Light streak/bar as a pseudo-element */}
      <div
        className="pointer-events-none absolute left-0 top-0 w-full h-full z-20"
        style={{
          mixBlendMode: "screen",
          background: "linear-gradient(90deg, transparent 0%, white 12%, rgba(230,230,255,0.65) 36%, white 70%, transparent 100%)",
          opacity: 0.16,
          transform: "translateX(calc(var(--bar-x, 90px) - 90px))",
          transition: "transform 0.15s cubic-bezier(0.64,0.01,0.4,1)"
        }}
      />
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-base font-mono text-zinc-800">
            {title}
          </CardTitle>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] text-zinc-600 font-mono lowercase">{tasks.length} tasks</span>
          </div>
        </div>
      </CardHeader>
      {description && (
        <CardContent className="pt-1">
          <p className="text-xs text-zinc-600 font-mono line-clamp-2">
            {description}
          </p>
        </CardContent>
      )}
      {/* Subtle white border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white transition-all duration-200 opacity-0 group-hover:opacity-45 z-30"></div>
    </Card>
  )
}

