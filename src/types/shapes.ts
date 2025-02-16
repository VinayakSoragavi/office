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


import { anchorType } from 'react-xarrows';
import { DraggableEventHandler } from 'react-draggable';

export interface BoxData {
  id: string;
  title: string;
  color: string;
  position: { x: number; y: number };
}

export interface Connection {
  id: string;
  start: string;
  end: string;
}

export interface ArrowConfig {
  path: 'smooth' | 'straight' | 'grid';
  startAnchor: anchorType;
  endAnchor: anchorType;
  color: string;
  strokeWidth: number;
  curveness: number;
  dashness: boolean;
  headSize: number;
}

export type Mode = 'connect' | 'select';
