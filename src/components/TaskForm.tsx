
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Clock, File } from "lucide-react"

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: { title: string; description: string; eta: string; projectId?: string }) => void
  projectId?: string
}

export function TaskForm({ isOpen, onClose, onSubmit, projectId }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [eta, setEta] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description, eta, projectId })
    setTitle("")
    setDescription("")
    setEta("")
    setFile(null)
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900/95 border-zinc-800 font-mono max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl tracking-tight">
            new task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              placeholder="task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white font-mono placeholder:text-zinc-500 text-sm tracking-wider"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 text-white font-mono placeholder:text-zinc-500 min-h-[100px] text-sm tracking-wider resize-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              <Input
                placeholder="estimated time (e.g. 2h, 3d)"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white font-mono placeholder:text-zinc-500 text-sm tracking-wider"
              />
            </div>
          </div>
          
          <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 flex flex-col items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <File className="w-12 h-12 text-zinc-400 mb-2" />
              <span className="text-white text-center mb-1">Drop any document here</span>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {file && (
              <p className="text-zinc-400 text-xs mt-2 font-mono">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 font-mono text-xs tracking-wider"
            >
              cancel
            </Button>
            <Button 
              type="submit"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs tracking-wider"
            >
              create task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
