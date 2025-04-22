
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  eta?: string;
  projectId?: string;
  date?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
}
