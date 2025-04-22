
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { TaskList } from "@/components/TaskList"
import { TaskForm } from "@/components/TaskForm"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { Task, Project } from "@/types"
import { v4 as uuidv4 } from 'uuid'

// Demo tasks
const DEMO_TASKS: Task[] = [
  {
    id: "1",
    title: "Design System Implementation",
    description: "Create a consistent design system for the application",
    status: "in-progress",
    eta: "3d",
    projectId: "1"
  },
  {
    id: "2",
    title: "AI Integration Research",
    description: "Research Gemini API integration possibilities",
    status: "pending",
    eta: "2d",
    projectId: "2"
  },
  {
    id: "3",
    title: "Project Setup",
    description: "Initial project setup and configuration",
    status: "completed",
    eta: "4h",
    projectId: "3"
  },
  {
    id: "4",
    title: "Component Library",
    description: "Build reusable component library",
    status: "pending",
    eta: "5d",
    projectId: "1"
  }
]

// Demo projects
const DEMO_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Design System",
    description: "Create a consistent design system for the application",
    tasks: DEMO_TASKS.filter(task => task.projectId === "1")
  },
  {
    id: "2",
    title: "AI Integration",
    description: "Research Gemini API integration possibilities",
    tasks: DEMO_TASKS.filter(task => task.projectId === "2")
  },
  {
    id: "3",
    title: "Mobile App",
    description: "Develop mobile application version",
    tasks: DEMO_TASKS.filter(task => task.projectId === "3")
  },
]

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch the project from an API
    const foundProject = DEMO_PROJECTS.find(p => p.id === id);
    setProject(foundProject);
  }, [id]);

  const handleAddTask = (taskData: { title: string; description: string; eta: string; projectId?: string }) => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      status: "pending",
      eta: taskData.eta,
      projectId: id
    };
    
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-white text-xl font-mono">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/projects" className="inline-flex items-center text-zinc-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-mono">Back to Projects</span>
          </Link>
          
          <h1 className="text-4xl font-mono font-bold tracking-tight text-white">{project.title}</h1>
          {project.description && (
            <p className="text-lg text-zinc-400 font-mono mt-2">
              {project.description}
            </p>
          )}
        </div>
        
        <TaskList tasks={tasks} projectId={id} />

        <div className="fixed bottom-8 right-8 animate-fade-in">
          <Button 
            size="lg" 
            className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </div>

        <TaskForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleAddTask}
          projectId={id}
        />
      </div>
    </div>
  )
}
