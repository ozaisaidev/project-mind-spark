
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { TaskDetailDialog } from "./TaskDetailDialog"

interface TaskCardProps {
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  eta?: string
}

export function TaskCard({ title, description, status, eta }: TaskCardProps) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <Card 
        className="w-full transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px] bg-zinc-900 border-zinc-800 cursor-pointer group"
        onClick={() => setShowDetail(true)}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-base font-mono text-white">
              {title}
            </CardTitle>
            {eta && (
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3 h-3 text-zinc-400" />
                <span className="text-[10px] text-zinc-400 font-mono lowercase">{eta}</span>
              </div>
            )}
          </div>
          <div className={`h-2.5 w-2.5 rounded-full ${
            status === 'completed' ? 'bg-red-500' :
            status === 'in-progress' ? 'bg-red-500/50' :
            'bg-zinc-700'
          }`} />
        </CardHeader>
        {description && (
          <CardContent className="pt-1">
            <p className="text-xs text-zinc-400 font-mono line-clamp-2">
              {description}
            </p>
          </CardContent>
        )}
      </Card>
      
      <TaskDetailDialog
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        task={{ title, description, status, eta }}
      />
    </>
  )
}
