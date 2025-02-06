"use client"

import type React from "react"
import EdgeButton from "./EdgeButton"
import { Shape } from "@/types/shapes"

interface SquareProps {
  shape: Shape
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onConnect: (shapeId: string, position: string) => void
}

const Square: React.FC<SquareProps> = ({ shape, isSelected, onMouseDown, onConnect }) => {
  return (
    <div
      className={`absolute border-2 border-white rounded-xl bg-transparent group ${
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
    >
      <EdgeButton position="top" onConnect={(position) => onConnect(shape.id, position)} />
      <EdgeButton position="right" onConnect={(position) => onConnect(shape.id, position)} />
      <EdgeButton position="bottom" onConnect={(position) => onConnect(shape.id, position)} />
      <EdgeButton position="left" onConnect={(position) => onConnect(shape.id, position)} />
    </div>
  )
}

export default Square

