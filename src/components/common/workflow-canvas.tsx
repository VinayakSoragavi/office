import { useDrop } from "react-dnd"
import  WorkflowNode  from "./workflow-node"
import type { Node, WorkflowData } from "../../types/workflow"
import { useRef, useState } from "react"
import type React from "react" // Added import for React

interface CanvasProps {
  data: WorkflowData
  onNodeAdd: (node: Node) => void
  onNodeMove: (id: string, position: { x: number; y: number }) => void
  onNodeClick: (node: Node) => void
  onConnection: (fromId: string, toId: string) => void
}

export function WorkflowCanvas({ data, onNodeAdd, onNodeMove, onNodeClick, onConnection }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [drawingArrow, setDrawingArrow] = useState<{ fromId: string; fromPos: { x: number; y: number } } | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const [, drop] = useDrop(() => ({
    accept: ["node-template", "node"],
    drop: (item: any, monitor) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const offset = monitor.getSourceClientOffset()
      if (!offset) return

      const canvasRect = canvas.getBoundingClientRect()
      const x = offset.x - canvasRect.left
      const y = offset.y - canvasRect.top

      if (item.isTemplate) {
        onNodeAdd({
          id: Math.random().toString(36).substr(2, 9),
          type: item.type,
          position: { x, y },
          data: {
            color: item.color,
            icon: item.icon,
          },
        })
      } else {
        onNodeMove(item.id, { x, y })
      }
    },
  }))

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleNodeMouseDown = (node: Node, e: React.MouseEvent) => {
    e.stopPropagation()
    setDrawingArrow({
      fromId: node.id,
      fromPos: node.position,
    })
  }

  const handleNodeMouseUp = (node: Node) => {
    if (drawingArrow && drawingArrow.fromId !== node.id) {
      onConnection(drawingArrow.fromId, node.id)
    }
    setDrawingArrow(null)
  }

  const handleCanvasMouseUp = () => {
    setDrawingArrow(null)
  }

  return (
    <div
      ref={(node) => {
        canvasRef.current = node
        drop(node)
      }}
      className="relative w-full h-[800px] rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleCanvasMouseUp}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px, 8px 8px, 80px 80px, 80px 80px",
        }}
      />
      <svg className="absolute inset-0 pointer-events-none">
        {data.connections.map((connection) => {
          const fromNode = data.nodes.find((n) => n.id === connection.from)
          const toNode = data.nodes.find((n) => n.id === connection.to)
          if (!fromNode || !toNode) return null

          return (
            <g key={connection.id}>
              <line
                x1={fromNode.position.x + 24}
                y1={fromNode.position.y + 24}
                x2={toNode.position.x + 24}
                y2={toNode.position.y + 24}
                stroke="white"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </g>
          )
        })}
        {drawingArrow && (
          <line
            x1={drawingArrow.fromPos.x + 24}
            y1={drawingArrow.fromPos.y + 24}
            x2={mousePos.x}
            y2={mousePos.y}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="4"
          />
        )}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="white" />
          </marker>
        </defs>
      </svg>
      {data.nodes.map((node) => (
        <div key={node.id} onMouseDown={(e) => handleNodeMouseDown(node, e)} onMouseUp={() => handleNodeMouseUp(node)}>
          <WorkflowNode node={node} onPositionChange={onNodeMove} onClick={onNodeClick} />
        </div>
      ))}
    </div>
  )
}

