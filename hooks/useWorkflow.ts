import { Shape, ShapeType } from "@/types/shapes";
import { useEffect, useRef, useState } from "react";

const useWorkflow = () => {
  // String states
  const [scale, setScale] = useState("100%");
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<string|null>("");

  // Tool/Shape type state
  const [selectedTool, setSelectedTool] = useState<"select" | ShapeType>(
    "select"
  );

  // Boolean states
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Array state
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Object/Position states
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Shape state
  const [drawingArrow, setDrawingArrow] = useState<Shape | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return {
    scale,
    setScale,
    selectedTool,
    setSelectedTool,
    shapes,
    setShapes,
    selectedShape,
    setSelectedShape,
    isDragging,
    setIsDragging,
    isResizing,
    setIsResizing,
    resizeHandle,
    setResizeHandle,
    startPos,
    setStartPos,
    drawingArrow,
    setDrawingArrow,
    dragOffset,
    setDragOffset,
    canvasRef,
    isFormOpen,
    setIsFormOpen
  };
};

export { useWorkflow };
