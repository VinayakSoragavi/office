"use client"

import { useState, useRef, useEffect } from "react"
import ResizableInput from "./resizable-input"

export default function GridOfBoxes({ formElements = [], onPositionChange, onElementResize }) {
  const [columns, setColumns] = useState(12)
  const [containerWidth, setContainerWidth] = useState(800)
  const rows = 10
  const totalBoxes = rows * columns
  const gridRef = useRef(null)

  useEffect(() => {
    const updateContainerWidth = () => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.offsetWidth
        setContainerWidth(gridWidth)
      }
    }

    updateContainerWidth()
    window.addEventListener("resize", updateContainerWidth)

    return () => window.removeEventListener("resize", updateContainerWidth)
  }, [])

  // Calculate the width of a single column including the gap
  const totalGapWidth = (columns - 1) * 12 // 12px gap
  const actualBoxWidth = (containerWidth - totalGapWidth) / columns
  const boxHeight = 32 // matches h-8 (32px)
  const gap = 12 // 3rem = 12px gap

  const getGridPosition = (clientX, clientY) => {
    if (!gridRef.current) return null
    const rect = gridRef.current.getBoundingClientRect()
    const totalBoxWidth = actualBoxWidth + gap
    const totalBoxHeight = boxHeight + gap
    const x = Math.floor((clientX - rect.left) / totalBoxWidth)
    const y = Math.floor((clientY - rect.top) / totalBoxHeight)
    return { x: Math.min(x, columns - 1), y }
  }

  return (
    <div className="flex gap-4 p-1 w-full">
      <div ref={gridRef} className="transition-all duration-300 ease-in-out w-full relative">
        <div
          className="grid gap-3 w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: totalBoxes }).map((_, index) => (
            <div key={index} className="relative border border-gray-300 dark:border-gray-700 h-8" aria-hidden="true" />
          ))}
        </div>
        {Array.isArray(formElements) &&
          formElements.map((element, index) => {
            // Calculate the exact width including gaps
            const width = Math.min(
              element.size.width * actualBoxWidth + (element.size.width - 1) * gap,
              containerWidth - element.position.x * (actualBoxWidth + gap),
            )
            const height = element.size.height * boxHeight + (element.size.height - 1) * gap
            const left = element.position.x * (actualBoxWidth + gap)
            const top = element.position.y * (boxHeight + gap)

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                }}
              >
                <ResizableInput
                  placeholder={element.name}
                  type={element.type || "text"}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", index.toString())
                  }}
                  onDragEnd={(e) => {
                    const position = getGridPosition(e.clientX, e.clientY)
                    if (position) {
                      onPositionChange(index, position)
                    }
                  }}
                  onResize={(widthInBoxes, heightInBoxes) => {
                    const maxWidth = columns - element.position.x
                    onElementResize(index, Math.min(widthInBoxes, maxWidth), heightInBoxes)
                  }}
                  gridSize={{ columns, rows }}
                  boxDimensions={{ width: actualBoxWidth, height: boxHeight, gap }}
                  initialSize={{ width, height }}
                  maxWidth={containerWidth - left}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

