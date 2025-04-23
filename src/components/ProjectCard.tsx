
import { useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/types"
import { useNavigate } from "react-router-dom"

function useWhiteBorderFocusEffect(ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Handle focus/hover: subtle border transition
    function handle(e: MouseEvent) {
      el.classList.add("border-white");
      el.classList.remove("border-zinc-300/60");
    }
    function handleLeave() {
      el.classList.remove("border-white");
      el.classList.add("border-zinc-300/60");
    }
    el.addEventListener("mouseenter", handle);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handle);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { id, title, description, tasks } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  useWhiteBorderFocusEffect(cardRef);

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card 
      ref={cardRef}
      className={`
        w-full transition-all duration-150 cursor-pointer group relative z-10
        bg-[#f6f7fa]/95
        border-2 border-dotted border-zinc-300/60
        hover:z-30 
        shadow-md
        `}
      style={{
        background: "rgba(244,245,248,0.96)",
        boxShadow: "0 6px 36px 0 rgba(170,173,176,0.15)",
        overflow: "hidden",
        transform: "none",
        transition: "box-shadow 0.08s cubic-bezier(.19,1,.22,1), border-color 0.13s",
      }}
      onClick={handleClick}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 w-full h-full z-20"
        style={{
          mixBlendMode: "screen",
          background: "linear-gradient(90deg, transparent 0%, white 10%, rgba(230,230,255,0.08) 36%, white 70%, transparent 100%)",
          opacity: 0.09,
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
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white transition-all duration-150 opacity-0 group-hover:opacity-30 z-30"></div>
    </Card>
  )
}
