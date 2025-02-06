"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowRightIcon as ArrowsPointingOut } from "lucide-react"

interface ResizableInputProps {
  placeholder: string
  type?: string
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: (e: React.DragEvent) => void
  onResize: (widthInBoxes: number, heightInBoxes: number) => void
  gridSize: { columns: number; rows: number }
  boxDimensions: { width: number; height: number; gap: number }
  initialSize: { width: number; height: number }
  maxWidth: number
}

const ResizableInput: React.FC<ResizableInputProps> = ({
  placeholder,
  type = "text",
  onDragStart,
  onDragEnd,
  onResize,
  gridSize,
  boxDimensions,
  initialSize,
  maxWidth,
}) => {
  const [size, setSize] = useState(initialSize)
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSize(initialSize)
  }, [initialSize])

  const calculateBoxCount = (pixels: number, dimension: "width" | "height") => {
    const boxSize = dimension === "width" ? boxDimensions.width : boxDimensions.height
    const totalSize = boxSize + boxDimensions.gap
    return Math.max(1, Math.round((pixels + boxDimensions.gap) / totalSize))
  }

  const calculatePixels = (boxes: number, dimension: "width" | "height") => {
    const boxSize = dimension === "width" ? boxDimensions.width : boxDimensions.height
    return Math.min(
      boxes * boxSize + (boxes - 1) * boxDimensions.gap,
      dimension === "width" ? maxWidth : Number.POSITIVE_INFINITY,
    )
  }

  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.width
    const startHeight = size.height

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const deltaX = mouseMoveEvent.clientX - startX
      const deltaY = mouseMoveEvent.clientY - startY

      let newWidth = startWidth
      let newHeight = startHeight

      if (direction.includes("right")) {
        const widthInBoxes = calculateBoxCount(startWidth + deltaX, "width")
        newWidth = calculatePixels(widthInBoxes, "width")
      }
      if (direction.includes("bottom")) {
        const heightInBoxes = calculateBoxCount(startHeight + deltaY, "height")
        newHeight = calculatePixels(heightInBoxes, "height")
      }

      setSize({ width: newWidth, height: newHeight })
      onResize(calculateBoxCount(newWidth, "width"), calculateBoxCount(newHeight, "height"))
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select className="w-full h-full px-2 py-1 border-none outline-none bg-transparent" placeholder={placeholder}>
            <option value="">{placeholder}</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        )
      case "date":
        return (
          <input type="date" className="w-full h-full px-2 py-1 border-none outline-none" placeholder={placeholder} />
        )
      default:
        return (
          <input type="text" className="w-full h-full px-2 py-1 border-none outline-none" placeholder={placeholder} />
        )
    }
  }

  return (
    <div
      ref={inputRef}
      className="relative bg-white"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {renderInput()}
      <div
        className="absolute right-0 bottom-0 w-4 h-4 cursor-se-resize"
        onMouseDown={(e) => handleResize(e, "right-bottom")}
      >
        <ArrowsPointingOut className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  )
}

export default ResizableInput

