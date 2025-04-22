
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface TaskDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  task: {
    title: string
    description?: string
    status: "pending" | "in-progress" | "completed"
    eta?: string
  }
}

export function TaskDetailDialog({ isOpen, onClose, task }: TaskDetailDialogProps) {
  // Calculate progress based on status
  const getProgress = (status: string) => {
    switch (status) {
      case "completed":
        return 100
      case "in-progress":
        return 50
      default:
        return 0
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900/95 border-zinc-800 font-mono max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
        <DialogHeader>
          <DialogTitle className="text-white text-xl tracking-tight animate-in fade-in duration-200">
            {task.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-6 animate-in fade-in duration-300 delay-100">
          {task.description && (
            <p className="text-zinc-300 font-mono text-sm leading-relaxed">
              {task.description}
            </p>
          )}
          
          {task.eta && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{task.eta}</span>
              </div>
              <div className="space-y-1.5">
                <Progress value={getProgress(task.status)} className="h-2 bg-zinc-800" />
                <p className="text-[10px] text-zinc-500 font-mono">
                  {task.status === "completed" 
                    ? "completed" 
                    : task.status === "in-progress" 
                    ? "in progress" 
                    : "not started"}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
