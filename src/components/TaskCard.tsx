
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface TaskCardProps {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  eta?: string
}

export function TaskCard({ title, description, status, eta }: TaskCardProps) {
  const statusColors = {
    pending: "bg-zinc-500 text-white",
    "in-progress": "bg-red-600 text-white",
    completed: "bg-zinc-400 text-white",
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg bg-[#eeeeeeff] border-zinc-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-sm font-mono uppercase text-zinc-800">{title}</CardTitle>
          {eta && (
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3 h-3 text-zinc-600" />
              <span className="text-[10px] text-zinc-600 font-mono lowercase">{eta}</span>
            </div>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={`${statusColors[status]} font-mono text-[10px] lowercase tracking-wide px-2.5 py-0.5 rounded-full`}
        >
          {status === "in-progress" ? "in progress" : status}
        </Badge>
      </CardHeader>
      {description && (
        <CardContent className="pt-1">
          <p className="text-sm text-zinc-600 font-mono">{description}</p>
        </CardContent>
      )}
    </Card>
  )
}
