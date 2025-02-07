import type { LucideIcon } from "lucide-react"
import { Shape, ShapeType } from "./shapes"
import { Dispatch, SetStateAction } from "react"

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

export interface Point {
  x: number;
  y: number;
}

export interface DragOffset {
  x: number;
  y: number;
}

export interface RenderShapeProps {
  shape: Shape;
  selectedShape: string | null;
  isDragging: boolean;
  setSelectedShape: Dispatch<SetStateAction<string | null>>;
  shapes: Shape[];
  setShapes: Dispatch<SetStateAction<Shape[]>>;
  setIsResizing: Dispatch<SetStateAction<boolean>>;
  setResizeHandle: Dispatch<SetStateAction<string | null>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setDragOffset: Dispatch<SetStateAction<DragOffset>>;
  setStartPos: Dispatch<SetStateAction<Point>>;
}

export interface IconSiderProps{
  selectedTool:string|"select",
  setSelectedTool:Dispatch<SetStateAction<ShapeType | "select">>
}