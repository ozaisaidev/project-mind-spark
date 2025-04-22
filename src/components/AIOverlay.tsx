
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AIOverlay() {
  return (
    <div className="fixed bottom-8 right-8">
      <Button size="lg" className="rounded-full shadow-lg">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
