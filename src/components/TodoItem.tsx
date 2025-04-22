
import { useState } from "react"
import { Todo } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 bg-zinc-900 rounded-lg mb-3 border border-zinc-800 transition-all duration-500",
      todo.completed && "animate-glow border-red-500/50"
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
