
import { useState } from "react"
import { TaskCard } from "./TaskCard"

interface Task {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  eta?: string
}

const DEMO_TASKS: Task[] = [
  {
    title: "Design System Implementation",
    description: "Create a consistent design system for the application",
    status: "in-progress",
    eta: "3d"
  },
  {
    title: "AI Integration Research",
    description: "Research Gemini API integration possibilities",
    status: "pending",
    eta: "2d"
  },
  {
    title: "Project Setup",
    description: "Initial project setup and configuration",
    status: "completed",
    eta: "4h"
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
