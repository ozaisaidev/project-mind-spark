
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TaskCardProps {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
}

export function TaskCard({ title, description, status }: TaskCardProps) {
  const statusColors = {
    pending: "bg-zinc-500 text-white",
    "in-progress": "bg-red-600 text-white",
    completed: "bg-zinc-400 text-white",
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg bg-zinc-50 border-zinc-200 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-mono text-zinc-800">{title}</CardTitle>
        <Badge 
          variant="outline" 
          className={`${statusColors[status]} font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-full`}
        >
          {status.replace('-', ' ')}
        </Badge>
      </CardHeader>
      {description && (
        <CardContent className="pt-2">
          <p className="text-sm text-zinc-600 font-mono">{description}</p>
        </CardContent>
      )}
    </Card>
  )
}
