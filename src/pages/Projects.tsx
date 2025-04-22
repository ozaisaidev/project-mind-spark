import { useState } from "react"
import { ProjectCard } from "@/components/ProjectCard"
import { Project } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuidv4 } from 'uuid'

// Demo projects
const DEMO_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Design System",
    description: "Create a consistent design system for the application",
    tasks: []
  },
  {
    id: "2",
    title: "AI Integration",
    description: "Research Gemini API integration possibilities",
    tasks: []
  },
  {
    id: "3",
    title: "Mobile App",
    description: "Develop mobile application version",
    tasks: []
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: uuidv4(),
      title: newProject.title,
      description: newProject.description,
      tasks: []
    };
    setProjects([...projects, project]);
    setNewProject({ title: "", description: "" });
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-mono">Back</span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-mono font-bold tracking-tight text-white">
              Projects
            </h1>
            <p className="text-lg text-zinc-400 font-mono">
              Manage your project portfolios
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="fixed bottom-8 right-8 animate-fade-in">
          <Button 
            size="lg" 
            className="rounded-full shadow-lg bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="bg-zinc-900/95 border-zinc-800 font-mono max-w-lg mx-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl tracking-tight">
                new project
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProject} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  placeholder="project title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white font-mono placeholder:text-zinc-500 text-sm tracking-wider"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="project description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white font-mono placeholder:text-zinc-500 min-h-[100px] text-sm tracking-wider resize-none"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  variant="outline"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 font-mono text-xs tracking-wider"
                >
                  cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs tracking-wider"
                >
                  create project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
