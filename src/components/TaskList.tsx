
import { useState } from "react"
import { TaskCard } from "./TaskCard"
import { Task } from "@/types"

interface TaskListProps {
  tasks: Task[];
  projectId?: string;
}

export function TaskList({ tasks, projectId }: TaskListProps) {
  const filteredTasks = projectId 
    ? tasks.filter(task => task.projectId === projectId)
    : tasks;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredTasks.map((task, index) => (
        <TaskCard key={index} {...task} />
      ))}
    </div>
  )
}
