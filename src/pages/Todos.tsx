
import { useState } from "react"
import { TodoItem } from "@/components/TodoItem"
import { Todo } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid'

// Demo todos
const DEMO_TODOS: Todo[] = [
  {
    id: "1",
    title: "Finish report",
    completed: false,
    date: "Today"
  },
  {
    id: "2",
    title: "Call Alex",
    completed: false,
    date: "Tues, May 7 • 2:00 PM"
  },
  {
    id: "3",
    title: "Review design mockups",
    completed: true,
    date: "Yesterday"
  },
]

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>(DEMO_TODOS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "" });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const todo: Todo = {
      id: uuidv4(),
      title: newTodo.title,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo({ title: "" });
    setIsFormOpen(false);
  };

  const handleToggle = (id: string, completed: boolean) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-mono font-bold tracking-tight text-white">To-dos</h1>
          <p className="text-lg text-zinc-400 font-mono">
            Track your to-do items
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {todos.map((todo) => (
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
