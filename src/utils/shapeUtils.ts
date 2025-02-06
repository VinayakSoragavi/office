import type { Shape, Point } from "../types/shapes"

export const createShape = (type: Shape["type"], x: number, y: number): Shape => {
  return {
    id: Date.now().toString(),
    type,
    x,
    y,
    width: type === "diamond" ? 100 : 200,
    height: type === "diamond" ? 100 : type === "text" ? 50 : 120,
    text: type === "text" ? "Double click to edit" : undefined,
  }
}

export const calculateArrowProperties = (startPoint: Point, endPoint: Point) => {
  const dx = endPoint.x - startPoint.x
  const dy = endPoint.y - startPoint.y
  const angle = Math.atan2(dy, dx)
  const length = Math.sqrt(dx * dx + dy * dy)
  return { angle, length }
}

