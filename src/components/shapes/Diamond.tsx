import { Shape } from "@/types/shapes"
import type React from "react"

interface DiamondProps {
  shape: Shape
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

const Diamond: React.FC<DiamondProps> = ({ shape, isSelected, onMouseDown }) => {
  return (
    <div
      className={`absolute border-2 border-white bg-transparent ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.width,
        height: shape.height,
        cursor: "grab",
        transform: "rotate(45deg)",
        transformOrigin: "center",
      }}
      onMouseDown={onMouseDown}
    />
  )
}

export default Diamond

