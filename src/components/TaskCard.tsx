
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TaskCardProps {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
}

export function TaskCard({ title, description, status }: TaskCardProps) {
  const statusColors = {
    pending: "bg-zinc-700",
    "in-progress": "bg-red-500",
    completed: "bg-zinc-600",
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg bg-zinc-100 border-zinc-200 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-mono">{title}</CardTitle>
        <Badge variant="outline" className={`${statusColors[status]} text-white font-mono`}>
          {status}
        </Badge>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-zinc-600 font-mono">{description}</p>
        </CardContent>
      )}
    </Card>
  )
}
