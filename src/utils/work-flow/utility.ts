import { Shape, ShapeType } from "@/types/shapes";
import { Dispatch, RefObject, SetStateAction } from "react";

export const getShapeDimensions = (type: ShapeType) => {
  switch (type) {
    case "diamond":
      return { width: 100, height: 100 };
    case "text":
      return { width: 200, height: 50 };
    default:
      return { width: 200, height: 120 };
  }
};

export const calculateDiamondBounds = (shape: Shape) => {
  const diagonal = Math.sqrt(
    shape.width * shape.width + shape.width * shape.width
  );
  const offset = (diagonal - shape.width) / 2;
  return {
    x: shape.x - offset,
    y: shape.y - offset,
    width: diagonal,
    height: diagonal,
  };
};

export const handleDoubleClick = (
  e: React.MouseEvent,
  shape: Shape,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>
) => {
  if (shape.type === "text") {
    const newText = prompt("Enter text:", shape.text);
    if (newText !== null) {
      setShapes(
        shapes.map((s) => (s.id === shape.id ? { ...s, text: newText } : s))
      );
    }
  }
};

export const handleResizing = (
  e: React.MouseEvent,
  startPos: {
    x: number;
    y: number;
  },
  setStartPos: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  selectedShape: string | null,
  canvasRef: RefObject<HTMLDivElement | null>,
  resizeHandle: string | null
) => {
  const dx = e.clientX - startPos.x;
  const dy = e.clientY - startPos.y;

  setShapes(
    shapes.map((s) => {
      if (s.id === selectedShape) {
        if (s.type === "arrow") {
          return handleArrowResize(s, e, canvasRef, resizeHandle);
        } else if (s.type === "diamond") {
          return handleDiamondResize(s, dx, dy, resizeHandle);
        }
        return handleDefaultResize(s, dx, dy, resizeHandle);
      }
      return s;
    })
  );

  setStartPos({
    x: e.clientX,
    y: e.clientY,
  });
};

export const handleDefaultResize = (
  shape: Shape,
  dx: number,
  dy: number,
  resizeHandle: string | null
) => {
  let newWidth = shape.width;
  let newHeight = shape.height;
  let newX = shape.x;
  let newY = shape.y;

  switch (resizeHandle) {
    case "top-left":
      newWidth = shape.width - dx;
      newHeight = shape.height - dy;
      newX = shape.x + dx;
      newY = shape.y + dy;
      break;
    case "top-right":
      newWidth = shape.width + dx;
      newHeight = shape.height - dy;
      newY = shape.y + dy;
      break;
    case "bottom-left":
      newWidth = shape.width - dx;
      newHeight = shape.height + dy;
      newX = shape.x + dx;
      break;
    case "bottom-right":
      newWidth = shape.width + dx;
      newHeight = shape.height + dy;
      break;
  }

  return {
    ...shape,
    x: newX,
    y: newY,
    width: Math.max(50, newWidth),
    height: Math.max(50, newHeight),
  };
};

export const handleDiamondResize = (
  shape: Shape,
  dx: number,
  dy: number,
  resizeHandle: string | null
) => {
  let newWidth = shape.width;
  let newHeight = shape.width; // Keep diamond proportional
  let newX = shape.x;
  let newY = shape.y;

  switch (resizeHandle) {
    case "top-left":
      newWidth = shape.width - dx;
      newHeight = newWidth;
      newX = shape.x + dx;
      newY = shape.y + dy;
      break;
    case "top-right":
      newWidth = shape.width + dx;
      newHeight = newWidth;
      newY = shape.y + dy;
      break;
    case "bottom-left":
      newWidth = shape.width - dx;
      newHeight = newWidth;
      newX = shape.x + dx;
      break;
    case "bottom-right":
      newWidth = shape.width + dx;
      newHeight = newWidth;
      break;
  }

  return {
    ...shape,
    x: newX,
    y: newY,
    width: Math.max(50, newWidth),
    height: Math.max(50, newHeight),
  };
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

export const handleArrowDragging = (
  x: number,
  y: number,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>
) => {
  if (!drawingArrow) return;

  setDrawingArrow({
    ...drawingArrow,
    endPoint: { x, y },
  } as Shape);
};

export const handleArrowCreation = (
  x: number,
  y: number,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  setSelectedTool: Dispatch<SetStateAction<ShapeType | "select">>
) => {
  if (!drawingArrow) {
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
      width: 100,
      height: 0,
      startPoint: { x, y },
      endPoint: { x, y },
      stateId: "",
      initialState: false,
      endState: false,
    };
    setDrawingArrow(newArrow);
  } else {
    const finalArrow = {
      ...drawingArrow,
      endPoint: { x, y },
    };
    setShapes([...shapes, finalArrow]);
    setDrawingArrow(null);
    setSelectedTool("select");
  }
};

export const createNewShape = (
  x: number,
  y: number,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  setSelectedTool: Dispatch<SetStateAction<ShapeType | "select">>,
  selectedTool: ShapeType | "select",
  setSelectedShape: Dispatch<SetStateAction<string | null>>
) => {
  if (selectedTool === "select") return;
  const dimensions = getShapeDimensions(selectedTool);
  const newShape: Shape = {
    id: Date.now().toString(),
    type: selectedTool,
    x,
    y,
    ...dimensions,
    text: selectedTool === "text" ? "Double click to edit" : undefined,
    stateId: "",
    initialState: false,
    endState: false,
    form: [
      { label: "Title", value: "", title: "title" },
      { label: "Source State", value: "", title: "sourceState" },
      { label: "Target State", value: "", title: "targetState" },
      { label: "Event", value: "", title: "event" },
      { label: "Action Bean", value: "", title: "actionBean" },
      { label: "Guard Bean", value: "", title: "guardBean" },
    ],
  };

  setShapes([...shapes, newShape]);
  setSelectedTool("select");
  setSelectedShape(newShape.id);
};

export const handleCanvasClick = (
  e: React.MouseEvent,
  canvasRef: RefObject<HTMLDivElement | null>,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  setSelectedTool: Dispatch<SetStateAction<ShapeType | "select">>,
  selectedTool: ShapeType | "select",
  setSelectedShape: Dispatch<SetStateAction<string | null>>
) => {
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

export const handleShapeTransformation = (
  e: React.MouseEvent,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  isDragging: boolean,
  isResizing: boolean,
  dragOffset: {
    x: number;
    y: number;
  },
  startPos: {
    x: number;
    y: number;
  },
  setStartPos: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  selectedShape: string | null,
  canvasRef: RefObject<HTMLDivElement | null>,
  resizeHandle: string | null
) => {
  const shape = shapes.find((s) => s.id === selectedShape);
  if (!shape) return;

  if (isDragging) {
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    setShapes(
      shapes.map((s) => {
        if (s.id === selectedShape) {
          if (s.type === "arrow") {
            const dx = newX - s.x;
            const dy = newY - s.y;
            return {
              ...s,
              x: newX,
              y: newY,
              startPoint: {
                x: (s.startPoint?.x || 0) + dx,
                y: (s.startPoint?.y || 0) + dy,
              },
              endPoint: {
                x: (s.endPoint?.x || 0) + dx,
                y: (s.endPoint?.y || 0) + dy,
              },
            };
          }
          return { ...s, x: newX, y: newY };
        }
        return s;
      })
    );
  } else if (isResizing) {
    handleResizing(
      e,
      startPos,
      setStartPos,
      shapes,
      setShapes,
      selectedShape,
      canvasRef,
      resizeHandle
    );
  }
};

export const handleMouseMove = (
  e: React.MouseEvent,
  drawingArrow: Shape | null,
  setDrawingArrow: Dispatch<SetStateAction<Shape | null>>,
  shapes: Shape[],
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  isDragging: boolean,
  isResizing: boolean,
  dragOffset: {
    x: number;
    y: number;
  },
  startPos: {
    x: number;
    y: number;
  },
  setStartPos: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  selectedShape: string | null,
  canvasRef: RefObject<HTMLDivElement | null>,
  resizeHandle: string | null
) => {
  if (!canvasRef.current) return;

  const rect = canvasRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (drawingArrow) {
    handleArrowDragging(x, y, drawingArrow, setDrawingArrow);
  } else if (isDragging || isResizing) {
    handleShapeTransformation(
      e,
      shapes,
      setShapes,
      isDragging,
      isResizing,
      dragOffset,
      startPos,
      setStartPos,
      selectedShape,
      canvasRef,
      resizeHandle
    );
  }
};

export const handleMouseDown = (
  e: React.MouseEvent,
  setSelectedShape: Dispatch<SetStateAction<string | null>>,
  shapes: Shape[],
  setIsResizing: Dispatch<SetStateAction<boolean>>,
  setResizeHandle: Dispatch<SetStateAction<string | null>>,
  setIsDragging: Dispatch<SetStateAction<boolean>>,
  setDragOffset: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  setStartPos: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >,
  shapeId: string,
  handle?: string
) => {
  e.stopPropagation();
  setSelectedShape(shapeId);

  if (handle) {
    setIsResizing(true);
    setResizeHandle(handle);
  } else {
    setIsDragging(true);
    const shape = shapes.find((s) => s.id === shapeId);
    if (shape) {
      setDragOffset({
        x: e.clientX - shape.x,
        y: e.clientY - shape.y,
      });
    }
  }

  setStartPos({
    x: e.clientX,
    y: e.clientY,
  });
};

export const handleShapeDoubleClick = (id: string, setIsFormOpen: Dispatch<SetStateAction<string|null>>) => {
  setIsFormOpen(id);
}
