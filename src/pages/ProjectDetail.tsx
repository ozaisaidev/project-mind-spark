import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Task, Project } from "@/types"
import { TaskCard } from "@/components/TaskCard"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { TaskForm } from "@/components/TaskForm"
import { TimerButton } from "@/components/TimerButton"

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

const statusColumns = [
  { key: "pending", label: "To Do" },
  { key: "in-progress", label: "In Development" },
  { key: "completed", label: "Done" },
] as const;

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // For drag state
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const foundProject = DEMO_PROJECTS.find(p => p.id === id);
    setProject(foundProject);
    if (id) {
      const projectTasks = DEMO_TASKS.filter(task => task.projectId === id);
      setTasks(projectTasks);
    }
  }, [id]);

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent, newStatus: "pending" | "in-progress" | "completed") => {
    e.preventDefault();
    if (!draggedTaskId) return;
    setTasks(prev =>
      prev.map(task =>
        task.id === draggedTaskId
          ? { ...task, status: newStatus }
          : task
      )
    );
    setDraggedTaskId(null);
  };

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
    <div className="min-h-screen bg-zinc-900 relative">
      <div className="container mx-auto px-4 py-8">
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

        {/* STATUS COLUMNS with DOTTED SEPARATORS and CENTERED TITLES */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-0 min-h-[400px]">
          {statusColumns.map((col, idx) => (
            <div
              key={col.key}
              className={`
                bg-zinc-800 rounded-3xl p-4 flex flex-col min-h-[350px] animate-card-entrance
                ${idx !== 2 ? "md:border-r-2 border-dotted border-zinc-400" : ""}
                `}
              onDragOver={onDragOver}
              onDrop={e => onDrop(e, col.key)}
            >
              <h2 className="mb-4 text-lg text-white font-bold font-mono tracking-tight select-none text-center">
                {col.label}
              </h2>
              <div className="space-y-4 flex-1 min-h-[50px]">
                {tasks.filter(task => task.status === col.key).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={e => onDragStart(e, task.id)}
                    onDragEnd={() => setDraggedTaskId(null)}
                    className={`transition-transform duration-200 ${
                      draggedTaskId === task.id ? "opacity-60 scale-95" : ""
                    }`}
                  >
                    <TaskCard
                      title={task.title}
                      description={task.description}
                      status={task.status}
                      eta={task.eta}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-8 right-8 animate-fade-in z-30">
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
      {/* Timer Button and Modal */}
      <div className="fixed bottom-8 left-8 z-40">
        <TimerButton />
      </div>
    </div>
  )
}
