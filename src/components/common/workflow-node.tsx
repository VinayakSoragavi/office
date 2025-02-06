"use client"
import { useDrag } from "react-dnd"
import type { Node } from "../../types/workflow"

interface NodeProps {
  node: Node
  onPositionChange: (id: string, position: { x: number; y: number }) => void
  onClick: (node: Node) => void
}

export default function WorkflowNode({ node, onPositionChange, onClick }: NodeProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id: node.id, type: node.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const getNodeStyle = (type: string) => {
    switch (type) {
      case "start":
      case "end":
        return "rounded-full p-3"
      case "process":
        return "rounded-lg p-3"
      case "decision":
        return "rotate-45 p-3"
      default:
        return "p-3"
    }
  }

  const Icon = node.data.icon

  return (
    <div
      ref={drag}
      onClick={() => onClick(node)}
      className={`absolute cursor-pointer ${isDragging ? "opacity-50" : ""}`}
      style={{
        transform: `translate(${node.position.x}px, ${node.position.y}px)`,
      }}
    >
      <div className={`${node.data.color} ${getNodeStyle(node.type)} text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      {node.data.label && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white bg-gray-800 px-2 py-1 rounded whitespace-nowrap">
          {node.data.label}
        </div>
      )}
    </div>
  )
}

