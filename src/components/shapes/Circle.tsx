import { Shape } from "@/types/shapes"
import type React from "react"

interface CircleProps {
  shape: Shape
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

const Circle: React.FC<CircleProps> = ({ shape, isSelected, onMouseDown }) => {
  return (
    <div
      className={`absolute border-2 border-white rounded-full bg-transparent ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.width,
        height: shape.height,
        cursor: "grab",
      }}
      onMouseDown={onMouseDown}
    />
  )
}

export default Circle

