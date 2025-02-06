import { Shape } from "@/types/shapes"
import type React from "react"

interface TextShapeProps {
  shape: Shape
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onDoubleClick: (e: React.MouseEvent) => void
}

const TextShape: React.FC<TextShapeProps> = ({ shape, isSelected, onMouseDown, onDoubleClick }) => {
  return (
    <div
      className={`absolute text-white p-2 ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.width,
        height: shape.height,
        cursor: "grab",
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {shape.text}
    </div>
  )
}

export default TextShape

