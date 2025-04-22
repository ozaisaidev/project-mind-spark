
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TaskCardProps {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
}

export function TaskCard({ title, description, status }: TaskCardProps) {
  const statusColors = {
    pending: "bg-muted",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge variant="outline" className={`${statusColors[status]}`}>
          {status}
        </Badge>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      )}
    </Card>
  )
}
