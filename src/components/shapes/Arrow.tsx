import { Shape } from "@/types/shapes"
import { calculateArrowProperties } from "@/utils/shapeUtils"
import type React from "react"

interface ArrowProps {
  shape: Shape
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onHandleMouseDown: (e: React.MouseEvent, handle: string) => void
}

const Arrow: React.FC<ArrowProps> = ({ shape, isSelected, onMouseDown, onHandleMouseDown }) => {
  if (!shape.startPoint || !shape.endPoint) return null

  const { angle, length } = calculateArrowProperties(shape.startPoint, shape.endPoint)

  return (
    <>
      <div
        className={`absolute bg-white ${isSelected ? "ring-2 ring-blue-500" : ""}`}
        style={{
          left: shape.startPoint.x,
          top: shape.startPoint.y,
          width: length,
          height: 2,
          transformOrigin: "0 50%",
          transform: `rotate(${angle}rad)`,
        }}
        onMouseDown={onMouseDown}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[6px] border-r-[6px] border-b-[6px] border-transparent border-l-[10px] border-l-white right-[-9px]" />
      </div>
      {isSelected && (
        <>
          <div
            className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
            style={{
              left: shape.startPoint.x - 6,
              top: shape.startPoint.y - 6,
            }}
            onMouseDown={(e) => onHandleMouseDown(e, "start-point")}
          />
          <div
            className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
            style={{
              left: shape.endPoint.x - 6,
              top: shape.endPoint.y - 6,
            }}
            onMouseDown={(e) => onHandleMouseDown(e, "end-point")}
          />
        </>
      )}
    </>
  )
}

export default Arrow

