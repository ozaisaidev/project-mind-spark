
import { useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, File as FileIcon } from "lucide-react"

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
  const getProgressDots = (status: string) => {
    const dots = [];
    const total = 10;
    const filled = status === 'completed' ? total : 
                  status === 'in-progress' ? Math.floor(total / 2) : 0;

    for (let i = 0; i < total; i++) {
      dots.push(
        <div 
          key={i}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            i < filled ? 'bg-red-500' : 'bg-zinc-700'
          }`}
        />
      );
    }
    return dots;
  };

  // NEW: Document upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900/95 border-zinc-800 font-mono max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl tracking-tight">
            {task.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-6">
          {task.description && (
            <p className="text-zinc-300 font-mono text-sm leading-relaxed">
              {task.description}
            </p>
          )}
          
          {task.eta && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-mono">{task.eta}</span>
              </div>
              <div className="flex gap-1.5 items-center">
                {getProgressDots(task.status)}
              </div>
              <p className="text-[10px] text-zinc-500 font-mono">
                {task.status === "completed" 
                  ? "completed" 
                  : task.status === "in-progress" 
                  ? "in progress" 
                  : "not started"}
              </p>
            </div>
          )}

          {/* File upload section */}
          <div className="pt-2">
            <label className="block text-zinc-400 text-xs mb-1 font-mono">Attach a document (optional):</label>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 hover:bg-zinc-700 text-sm text-white font-mono transition-colors"
                onClick={handleUploadClick}
              >
                <FileIcon className="w-4 h-4" />
                {file ? "Change file" : "Upload file"}
              </button>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              {file && (
                <span className="text-xs text-zinc-300 font-mono truncate max-w-[150px]">{file.name}</span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              You can upload any file type. (This is a demo—file is not saved.)
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

