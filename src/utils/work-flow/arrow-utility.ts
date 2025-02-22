import { Shape, ShapeType } from "@/types/shapes";
import { Dispatch, RefObject, SetStateAction } from "react";
import { createNewShape } from "./utility";
import { Connection, ConnectionPoint } from "@/types/work-flow/work-flow";

export const handleArrowCreation = (
  x: number,
  y: number,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  setSelectedTool: Dispatch<SetStateAction<ShapeType | "select">>
): void => {
  if (!drawingArrow) {
    console.log("");
    // First click - create new arrow with start point
    const newArrow: Shape = {
      id: Date.now().toString(),
      type: "arrow",
      x,
      y,
      form: [
        { label: "Title", value: "", title: "title" },
        { label: "Source State", value: "", title: "sourceState" },
        { label: "Target State", value: "", title: "targetState" },
        { label: "Event", value: "", title: "event" },
        { label: "Action Bean", value: "", title: "actionBean" },
        { label: "Guard Bean", value: "", title: "guardBean" },
      ],
      width: 0,
      height: 0,
      stateId: "",
      startPoint: { x, y },
      endPoint: { x, y },
      endState: false,
      initialState: false,
    };
    setDrawingArrow(newArrow);
  } else {
    // Second click - finalize arrow with end point
    const finalArrow: Shape = {
      ...drawingArrow,
      width: Math.abs(x - (drawingArrow.startPoint?.x ?? x)),
      height: Math.abs(y - (drawingArrow.startPoint?.y ?? y)),
      endPoint: { x, y },
    };
    setShapes([...shapes, finalArrow]);
    setDrawingArrow(null);
    setSelectedTool("select");
  }
};

export const handleCanvasClick = (
  e: React.MouseEvent,
  canvasRef: RefObject<HTMLDivElement>,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  setSelectedTool: Dispatch<SetStateAction<ShapeType | "select">>,
  selectedTool: ShapeType | "select",
  setSelectedShape: Dispatch<SetStateAction<string | null>>
): void => {
  if (!canvasRef.current) return;

  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (selectedTool === "arrow") {
    handleArrowCreation(
      x,
      y,
      drawingArrow,
      setDrawingArrow,
      shapes,
      setShapes,
      setSelectedTool
    );
  } else if (selectedTool !== "select") {
    createNewShape(
      x,
      y,
      shapes,
      setShapes,
      setSelectedTool,
      selectedTool,
      setSelectedShape
    );
  }
};

export const handleArrowDrag = (
  e: React.MouseEvent,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>,
  canvasRef: RefObject<HTMLDivElement | null>
): void => {
  if (!drawingArrow || !canvasRef.current) return;

  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Update the end point as the user drags
  setDrawingArrow({
    ...drawingArrow,
    width: Math.abs(x - (drawingArrow.startPoint?.x ?? x)),
    height: Math.abs(y - (drawingArrow.startPoint?.y ?? y)),
    endPoint: { x, y },
  });
};

export const handleArrowResize = (
  shape: Shape,
  e: React.MouseEvent,
  canvasRef: RefObject<HTMLDivElement | null>,
  resizeHandle: string | null
) => {
  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect) return shape;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return {
    ...shape,
    [resizeHandle?.includes("start") ? "startPoint" : "endPoint"]: { x, y },
  };
};

export const HandleConnectionClick = (
  e: React.MouseEvent,
  connectionId: string,
  setSelectedBox: Dispatch<SetStateAction<string | null>>,
  setSelectedConnection: Dispatch<SetStateAction<string | null>>
) => {
  e.stopPropagation();
  setSelectedConnection(connectionId);
  setSelectedBox(null);
};

export const HandleConnectionPoint = (
  point: ConnectionPoint,
  connectionStart: ConnectionPoint | null,
  setConnectionStart: Dispatch<SetStateAction<ConnectionPoint | null>>,
  connections: Connection[],
  setConnections: Dispatch<SetStateAction<Connection[]>>
): void => {
  if (!connectionStart) {
    setConnectionStart(point);
  } else {
    if (connectionStart.box !== point.box) {
      const connectionExists = connections.some(
        (conn) =>
          (conn.start === connectionStart.box && conn.end === point.box) ||
          (conn.start === point.box && conn.end === connectionStart.box)
      );

      if (!connectionExists) {
        const newConnection: Connection = {
          id: `conn-${Date.now()}`,
          start: connectionStart.box,
          end: point.box,
        };
        setConnections((prev) => [...prev, newConnection]);
      }
    }
    setConnectionStart(null);
  }
};

export const DeleteConnection = (
  id: string,
  setConnections: Dispatch<SetStateAction<Connection[]>>,
  setSelectedConnection: Dispatch<SetStateAction<string | null>>,
  connections: Connection[]
) => {
  setConnections(connections.filter((conn) => conn.id !== id));
  setSelectedConnection(null);
};



