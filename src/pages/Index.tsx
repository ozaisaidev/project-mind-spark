
import { TaskList } from "@/components/TaskList"
import { AIOverlay } from "@/components/AIOverlay"

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">TaskUI</h1>
        <p className="text-lg text-muted-foreground">
          Track your projects, learnings, and to-dos
        </p>
      </div>
      <TaskList />
      <AIOverlay />
    </div>
  );
};

export default Index;
