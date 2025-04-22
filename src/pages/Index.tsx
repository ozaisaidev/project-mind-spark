
import { TaskList } from "@/components/TaskList"
import { AIOverlay } from "@/components/AIOverlay"

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-mono font-bold tracking-tight text-white">TaskUI</h1>
          <p className="text-lg text-zinc-400 font-mono">
            Track your projects, learnings, and to-dos
          </p>
        </div>
        <TaskList />
        <AIOverlay />
      </div>
    </div>
  )
}

export default Index
