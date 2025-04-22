
import { useState } from "react"
import { TaskCard } from "./TaskCard"

interface Task {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
}

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
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS)

  const addTask = (newTask: { title: string; description: string }) => {
    setTasks([...tasks, { ...newTask, status: "pending" }])
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </div>
  )
}
