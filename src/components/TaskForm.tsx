
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: { title: string; description: string }) => void
}

export function TaskForm({ isOpen, onClose, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description })
    setTitle("")
    setDescription("")
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-900/95 border-zinc-800">
        <SheetHeader>
          <SheetTitle className="font-mono text-white">New Task</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white font-mono"
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white font-mono"
          />
          <Button 
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-mono"
          >
            Create Task
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
