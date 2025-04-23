
import { useState, useEffect } from "react"
import { Todo } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  animateRedGlow?: boolean;
  animateGreenGlowAndSlide?: boolean;
}

export function TodoItem({ todo, onToggle, animateRedGlow, animateGreenGlowAndSlide }: TodoItemProps) {
  // --- Temporary local glow/slide state to cooperate w/ parent animation logic ---
  const [isSliding, setIsSliding] = useState(false);

  // Green Glow and Slide: when triggered, do both in proper order
  useEffect(() => {
    if (animateGreenGlowAndSlide) {
      setIsSliding(false); // reset slide
      // Start: show green glow border, then after a bit, slide out
      // Glow: 0-850ms (~0.9s), Slide: trigger at glow=done
      const glowTimeout = setTimeout(() => {
        setIsSliding(true);
      }, 900);
      // Slide lasts 0.5s (must match removal in parent)
      return () => clearTimeout(glowTimeout);
    } else {
      setIsSliding(false);
    }
  }, [animateGreenGlowAndSlide]);

  // Animation classes
  const glowClass = animateGreenGlowAndSlide
    ? "animate-glow-green border-[#63f240]/90"
    : animateRedGlow
      ? "animate-glow border-red-500/90"
      : todo.completed
        ? "border-red-500/50"
        : "";

  const slideClass = animateGreenGlowAndSlide && isSliding ? "animate-slide-right" : "";

  const handleToggle = () => {
    if (!todo.completed) {
      onToggle(todo.id, true); // triggers green animation flow on parent
    } else {
      // Uncomplete, use red glow/slide for distinction (legacy effect)
      onToggle(todo.id, false);
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 bg-zinc-900/80 rounded-xl mb-3 border border-zinc-800 transition-all duration-500 animate-card-entrance shadow-lg backdrop-blur-md",
      glowClass,
      slideClass
    )}>
      <div className="flex items-center space-x-3 flex-1">
        <Checkbox 
          checked={todo.completed} 
          onCheckedChange={handleToggle}
          className="border-white data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <span className={`text-base font-mono ${todo.completed ? "text-zinc-500 line-through" : "text-white"}`}>
              {todo.title}
            </span>
            <div className="w-24 flex items-center justify-between">
              {[0, 1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    todo.completed 
                      ? "bg-red-500"
                      : dot * 25 <= (todo.progress || 0) 
                        ? "bg-zinc-400" 
                        : "bg-zinc-800"
                  )}
                />
              ))}
            </div>
          </div>
          {todo.date && (
            <span className="text-xs text-zinc-500 font-mono">{todo.date}</span>
          )}
        </div>
      </div>
    </div>
  )
}
