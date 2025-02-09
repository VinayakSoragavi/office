export type ShapeType = "square" | "circle" | "arrow" | "text" | "diamond"

export type Point = {
  x: number
  y: number
}

export interface BasicInfoForm {
  label: string;
  value: string;
  title: string;
}


export interface Shape {
  id: string
  type: ShapeType
  form:BasicInfoForm[]
  x: number
  y: number
  width: number
  height: number
  text?: string
  stateId:string
  startPoint?: Point
  endPoint?: Point
  endState:boolean
  initialState:boolean
}

