"use client"

import type React from "react"
import { ArrowRight } from "lucide-react"

interface ConnectionProps {
  startX: number
  startY: number
  endX: number
  endY: number
}

const Connection: React.FC<ConnectionProps> = ({ startX, startY, endX, endY }) => {
  const angle = Math.atan2(endY - startY, endX - startX)
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))

  return (
    <div
      className="absolute bg-gray-600"
      style={{
        left: startX,
        top: startY,
        width: length,
        height: 2,
        transformOrigin: "0 50%",
        transform: `rotate(${angle}rad)`,
      }}
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <ArrowRight className="w-4 h-4 text-gray-600" />
      </div>
    </div>
  )
}

export default Connection

