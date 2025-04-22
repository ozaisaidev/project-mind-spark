
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskForm } from "./TaskForm"

export function AIOverlay() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-8 right-8 animate-fade-in">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg bg-zinc-800 hover:bg-zinc-700 transition-all duration-300 hover:scale-105"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <TaskForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(task) => {
          console.log('New task:', task)
          // Here we would handle the new task with ETA
        }}
      />
    </>
  )
}
