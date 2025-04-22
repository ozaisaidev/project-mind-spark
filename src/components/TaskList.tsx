
import { TaskCard } from "./TaskCard"

const DEMO_TASKS = [
  {
    title: "Design System Implementation",
    description: "Create a consistent design system for the application",
    status: "in-progress" as const,
  },
  {
    title: "AI Integration Research",
    description: "Research Gemini API integration possibilities",
    status: "pending" as const,
  },
  {
    title: "Project Setup",
    description: "Initial project setup and configuration",
    status: "completed" as const,
  },
]

export function TaskList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {DEMO_TASKS.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </div>
  )
}
