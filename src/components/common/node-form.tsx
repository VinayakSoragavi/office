import { useDrag } from "react-dnd"
import type { Task } from "../../types/workflow"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const priorityColor = {
    low: "bg-blue-500/10 text-blue-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-red-500/10 text-red-500",
  }

  return (
    <Card ref={drag} className={`cursor-move ${isDragging ? "opacity-50" : ""}`}>
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {task?.title}
          <Badge className={priorityColor[task?.priority]}>{task?.priority}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-gray-400">{task?.description}</CardContent>
    </Card>
  )
}

