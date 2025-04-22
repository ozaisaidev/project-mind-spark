
import { TaskList } from "@/components/TaskList"
import { AIOverlay } from "@/components/AIOverlay"
import { TopNavigation } from "@/components/TopNavigation"

// Demo tasks
const DEMO_TASKS = [
  {
    id: "1",
    title: "Design System Implementation",
    description: "Create a consistent design system for the application",
    status: "in-progress" as const,
    eta: "3d"
  },
  {
    id: "2",
    title: "AI Integration Research",
    description: "Research Gemini API integration possibilities",
    status: "pending" as const,
    eta: "2d"
  },
  {
    id: "3",
    title: "Project Setup",
    description: "Initial project setup and configuration",
    status: "completed" as const,
    eta: "4h"
  },
]

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <TopNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-mono font-bold tracking-tight text-white">Notes</h1>
          <p className="text-lg text-zinc-400 font-mono">
            Track your notes and learning journey
          </p>
        </div>
        <TaskList tasks={DEMO_TASKS} />
        <AIOverlay />
      </div>
    </div>
  )
}

export default Index
