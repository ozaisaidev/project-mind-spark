
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [columnAnim, setColumnAnim] = useState<{[key:string]: "none" | "green" | "red"}>({
    pending: "none",
    "in-progress": "none",
    completed: "none",
  });

  const colOrder = ["pending", "in-progress", "completed"];

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
    const movedTask = tasks.find(task => task.id === draggedTaskId);
    if (!movedTask) return;
    const fromIdx = colOrder.indexOf(movedTask.status);
    const toIdx = colOrder.indexOf(newStatus);
    let animType: "green" | "red" | "none" = "none";
    if (toIdx > fromIdx) animType = "green";
    else if (toIdx < fromIdx) animType = "red";

    setColumnAnim((prev) => ({
      ...prev,
      [newStatus]: animType,
    }));

    setTimeout(() => {
      setColumnAnim((prev) => ({
        ...prev,
        [newStatus]: "none",
      }));
    }, 700);

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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 min-h-[400px]">
          {statusColumns.map((col, idx) => (
            <div
              key={col.key}
              className={`
                relative flex flex-col min-h-[350px] animate-card-entrance px-4 pt-4 pb-4
                bg-zinc-800/40 backdrop-blur-sm rounded-2xl
                border-2 
                ${columnAnim[col.key] === "green" ? "border-green-400/60 animate-glow-green" : ""}
                ${columnAnim[col.key] === "red" ? "border-red-400/60 animate-glow-red" : ""}
                ${columnAnim[col.key] === "none" ? "border-zinc-400/30" : ""}
                transition-all duration-300
                `}
              style={{
                marginLeft: 0,
                marginRight: 0,
                zIndex: 1,
                boxShadow: (columnAnim[col.key] === "green") 
                  ? "0 0 8px 2px rgba(40,255,80,0.15)" 
                  : (columnAnim[col.key] === "red")
                  ? "0 0 8px 2px rgba(255,40,80,0.15)"
                  : "0 4px 20px rgba(0,0,0,0.2)",
                borderStyle: 'dashed',
                borderRadius: "1.25rem",
                position: 'relative',
              }}
              onDragOver={onDragOver}
              onDrop={e => onDrop(e, col.key)}
            >
              {/* Column separator */}
              {(idx < 2) && (
                <div 
                  className="absolute top-1/2 right-[-32px] h-[80%] transform -translate-y-1/2 flex items-center justify-center pointer-events-none"
                  style={{
                    zIndex: 3,
                    width: "50px"
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "85%",
                      background: `repeating-linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0.4) 0px,
                        rgba(255, 255, 255, 0.4) 5px,
                        transparent 5px,
                        transparent 14px
                      )`,
                      borderRadius: "4px"
                    }}
                  />
                </div>
              )}
              
              {/* Column header */}
              <div className="flex justify-center mb-6 mt-1">
                <h2 className="text-lg text-white font-bold font-mono tracking-tight select-none text-center">
                  {col.label}
                </h2>
              </div>
              
              {/* Column content */}
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
      <div className="fixed bottom-8 left-8 z-40">
        <TimerButton />
      </div>
      <style>
        {`
          @keyframes glowGreen {
            0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.15); border-color: rgba(74, 222, 128, 0.4); }
            40% { box-shadow: 0 0 12px 4px rgba(74, 222, 128, 0.3); border-color: rgba(74, 222, 128, 0.7); }
            100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.15); border-color: rgba(212, 212, 216, 0.3); }
          }
          @keyframes glowRed {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.4); }
            40% { box-shadow: 0 0 12px 4px rgba(239, 68, 68, 0.3); border-color: rgba(239, 68, 68, 0.7); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.15); border-color: rgba(212, 212, 216, 0.3); }
          }
          .animate-glow-green {
            animation: glowGreen 0.7s;
          }
          .animate-glow-red {
            animation: glowRed 0.7s;
          }
        `}
      </style>
    </div>
  )
}
