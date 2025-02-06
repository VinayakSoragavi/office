export type ShapeType = "square" | "circle" | "arrow" | "text" | "diamond"

export type Point = {
  x: number
  y: number
}

export type Shape = {
  id: string
  type: ShapeType
  x: number
  y: number
  width: number
  height: number
  text?: string
  startPoint?: Point
  endPoint?: Point
}

