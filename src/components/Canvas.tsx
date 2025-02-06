"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import Square from "./shapes/Square"
import Circle from "./shapes/Circle"
import Arrow from "./shapes/Arrow"
import TextShape from "./shapes/TextShape"
import Diamond from "./shapes/Diamond"
import Connection from "./shapes/Connection"
import { Shape } from "@/types/shapes"

interface CanvasProps {
  shapes: Shape[]
  selectedShape: string | null
  drawingArrow: Shape | null
  onCanvasClick: (e: React.MouseEvent) => void
  onMouseMove: (e: React.MouseEvent) => void
  onMouseDown: (e: React.MouseEvent, shapeId: string, handle?: string) => void
  onDoubleClick: (e: React.MouseEvent, shape: Shape) => void
  onConnect: (sourceId: string, position: string, targetX: number, targetY: number) => void
}

const Canvas: React.FC<CanvasProps> = ({
  shapes,
  selectedShape,
  drawingArrow,
  onCanvasClick,
  onMouseMove,
  onMouseDown,
  onDoubleClick,
  onConnect,
}) => {
  const [connectingFrom, setConnectingFrom] = useState<{ id: string; position: string } | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseUp = () => {
      setConnectingFrom(null)
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
    onMouseMove(e)
  }

  const handleConnect = (shapeId: string, position: string) => {
    setConnectingFrom({ id: shapeId, position })
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (connectingFrom) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        onConnect(connectingFrom.id, connectingFrom.position, x, y)
        setConnectingFrom(null)
      }
    } else {
      onCanvasClick(e)
    }
  }

  const renderShape = (shape: Shape) => {
    const isSelected = selectedShape === shape.id
    const commonProps = {
      shape,
      isSelected,
      onMouseDown: (e: React.MouseEvent) => onMouseDown(e, shape.id),
      onConnect: handleConnect,
    }

    switch (shape.type) {
      case "square":
        return <Square {...commonProps} />
      case "circle":
        return <Circle {...commonProps} />
      case "arrow":
        return <Arrow {...commonProps} onHandleMouseDown={(e, handle) => onMouseDown(e, shape.id, handle)} />
      case "text":
        return <TextShape {...commonProps} onDoubleClick={(e) => onDoubleClick(e, shape)} />
      case "diamond":
        return <Diamond {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div
      ref={canvasRef}
      className="flex-1 relative overflow-hidden cursor-crosshair"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
    >
      {shapes.map((shape) => (
        <div key={shape.id}>
          {renderShape(shape)}
          {selectedShape === shape.id && shape.type !== "arrow" && (
            <>
              {/* Render resize handles */}
              {/* ... */}
            </>
          )}
        </div>
      ))}
      {connectingFrom && (
        <Connection
          startX={shapes.find((s) => s.id === connectingFrom.id)?.x || 0}
          startY={shapes.find((s) => s.id === connectingFrom.id)?.y || 0}
          endX={mousePosition.x}
          endY={mousePosition.y}
        />
      )}
      {drawingArrow && drawingArrow.startPoint && drawingArrow.endPoint && (
        <Arrow shape={drawingArrow} isSelected={false} onMouseDown={() => {}} onHandleMouseDown={() => {}} />
      )}
      {shapes.length === 0 && !drawingArrow && !connectingFrom && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">Draw, Diagram</div>
      )}
    </div>
  )
}

export default Canvas

