"use client"

import { useDrag } from "react-dnd"
import type { WorkflowSpace } from "../../types/workflow"
import { Card } from "@/components/ui/card"
import { Plus, CheckCircle, Users, HelpCircle, MessageSquare, Layout, Flag, Send } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const workflowSpaces: (WorkflowSpace & { shortcut?: string })[] = [
  {
    id: "insert",
    type: "action",
    color: "text-gray-400",
    icon: Plus,
    shortcut: "/",
  },
  {
    id: "start",
    type: "start",
    color: "text-gray-400",
    icon: CheckCircle,
    shortcut: "S",
  },
  {
    id: "team",
    type: "process",
    color: "text-gray-400",
    icon: Users,
    shortcut: "T",
  },
  {
    id: "decision",
    type: "decision",
    color: "text-gray-400",
    icon: HelpCircle,
    shortcut: "D",
  },
  {
    id: "content",
    type: "process",
    color: "text-gray-400",
    icon: MessageSquare,
    shortcut: "C",
  },
  {
    id: "design",
    type: "process",
    color: "text-gray-400",
    icon: Layout,
    shortcut: "L",
  },
  {
    id: "final",
    type: "process",
    color: "text-gray-400",
    icon: Flag,
    shortcut: "F",
  },
  {
    id: "end",
    type: "end",
    color: "text-gray-400",
    icon: Send,
    shortcut: "E",
  },
]

function WorkflowSpaceItem({ space }: { space: WorkflowSpace & { shortcut?: string } }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node-template",
    item: { ...space, isTemplate: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const Icon = space.icon

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            ref={drag}
            className={`
              cursor-move w-10 h-10 flex items-center justify-center
              bg-neutral-900 border-neutral-800 hover:bg-neutral-800
              transition-colors relative
              ${isDragging ? "opacity-50" : ""}
            `}
          >
            <Icon className={`w-5 h-5 ${space.color}`} />
            {space.shortcut && (
              <span className="absolute bottom-0.5 right-0.5 text-[10px] text-neutral-600 font-mono">
                {space.shortcut}
              </span>
            )}
          </Card>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-neutral-900 border-neutral-800">
          {space.id === "insert" ? <p>Press / to open insert menu</p> : <p>Add {space.id} node</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function WorkflowSpaces() {
  return (
    <div className="flex flex-col gap-2 p-2 bg-neutral-900 border-r border-neutral-800">
      <WorkflowSpaceItem space={workflowSpaces[0]} />
      <div className="h-px bg-neutral-800 mx-1" />
      <div className="flex flex-col gap-2">
        {workflowSpaces.slice(1).map((space) => (
          <WorkflowSpaceItem key={space.id} space={space} />
        ))}
      </div>
    </div>
  )
}

