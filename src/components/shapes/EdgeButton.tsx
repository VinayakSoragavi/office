"use client"

import { Plus } from "lucide-react"
import { useState } from "react"
import type React from "react" // Added import for React

interface EdgeButtonProps {
  position: "top" | "right" | "bottom" | "left"
  onConnect: (position: string) => void
}

const EdgeButton: React.FC<EdgeButtonProps> = ({ position, onConnect }) => {
  const [isVisible, setIsVisible] = useState(false)

  const getPositionStyles = () => {
    switch (position) {
      case "top":
        return { top: "-12px", left: "50%", transform: "translateX(-50%)" }
      case "right":
        return { right: "-12px", top: "50%", transform: "translateY(-50%)" }
      case "bottom":
        return { bottom: "-12px", left: "50%", transform: "translateX(-50%)" }
      case "left":
        return { left: "-12px", top: "50%", transform: "translateY(-50%)" }
    }
  }

  return (
    <div
      className="absolute w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
      style={getPositionStyles()}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        className={`absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => onConnect(position)}
      >
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
  )
}

export default EdgeButton

