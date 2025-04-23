
import { useState } from "react"
import { TodoItem } from "@/components/TodoItem"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid'
import { Todo } from "@/types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Demo todos
const DEMO_TODOS: Todo[] = [
  {
    id: "1",
    title: "Finish report",
    completed: false,
    date: "Today",
    category: "daily",
  },
  {
    id: "2",
    title: "Call Alex",
    completed: false,
    date: "Tues, May 7 • 2:00 PM",
    category: "weekly",
  },
  {
    id: "3",
    title: "Review design mockups",
    completed: true,
    date: "Yesterday",
    category: "monthly",
  },
  {
    id: "4",
    title: "Workout at gym",
    completed: false,
    date: "Today",
    category: "general",
  },
]

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "general", label: "General" },
];

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>(DEMO_TODOS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "", category: "daily" });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const todo: Todo = {
      id: uuidv4(),
      title: newTodo.title,
      completed: false,
      category: newTodo.category as "daily" | "weekly" | "monthly" | "general",
    };
    setTodos([...todos, todo]);
    setNewTodo({ title: "", category: "daily" });
    setIsFormOpen(false);
  };

  const handleToggle = (id: string, completed: boolean) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  // Filter todos by selected category
  const filteredTodos = selectedCategory === "all"
    ? todos
    : todos.filter(todo => todo.category === selectedCategory);

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
              To-dos
            </h1>
            <p className="text-lg text-zinc-400 font-mono">
              Track your to-do items
            </p>
          </div>
        </div>
        
        {/* Tabs for category selection */}
        <div className="max-w-2xl mx-auto mb-6">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full flex justify-between gap-2 bg-zinc-800/60 border border-zinc-700">
              {CATEGORIES.map(category => (
                <TabsTrigger
                  key={category.key}
                  value={category.key}
                  className="flex-1 text-xs font-mono data-[state=active]:bg-zinc-900 data-[state=active]:text-red-500 rounded px-2 py-1 transition-colors"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="max-w-2xl mx-auto">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
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
                new to-do
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTodo} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  placeholder="to-do title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white font-mono placeholder:text-zinc-500 text-sm tracking-wider"
                />
                <select
                  value={newTodo.category}
                  onChange={e => setNewTodo({...newTodo, category: e.target.value})}
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white font-mono text-xs rounded px-3 py-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="general">General</option>
                </select>
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
                  create to-do
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
