import type { LucideIcon } from "lucide-react"

export type NodeType = "start" | "process" | "decision" | "end"

export interface WorkflowSpace {
  id: string
  type: NodeType
  icon: LucideIcon
  color: string
}

export interface Node {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: {
    label?: string
    color: string
    icon: LucideIcon
  }
}

export interface Connection {
  id: string
  from: string
  to: string
  label?: string
}

export interface WorkflowData {
  nodes: Node[]
  connections: Connection[]
}