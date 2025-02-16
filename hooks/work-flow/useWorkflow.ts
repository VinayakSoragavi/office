import { ShapeType } from "@/types/shapes";
import { BoxData, Connection, ConnectionPoint } from "@/types/work-flow/work-flow";
import { useEffect, useRef, useState } from "react";


const useWorkflow = () => {
  // String states
  const [scale, setScale] = useState(1);

  // Tool/Shape type state
  const [selectedTool, setSelectedTool] = useState<"select" | ShapeType>("select");

  // Boolean states
  const [isDragging, setIsDragging] = useState(false);

  // Box and Connection states
  const [boxes, setBoxes] = useState<BoxData[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [connectionStart, setConnectionStart] = useState<ConnectionPoint | null>(null);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isDragging) {
      const updateArrows = () => {
        setConnections((prev) => [...prev]); // Force re-render of arrows
        animationFrameRef.current = requestAnimationFrame(updateArrows);
      };
      animationFrameRef.current = requestAnimationFrame(updateArrows);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging]);

  return {
    // Scale
    scale,
    setScale,
    
    // Tool selection
    selectedTool,
    setSelectedTool,
    
    // Dragging state
    isDragging,
    setIsDragging,
    
    // Boxes
    boxes,
    setBoxes,
    selectedBox,
    setSelectedBox,
    
    // Connections
    connections,
    setConnections,
    selectedConnection,
    setSelectedConnection,
    connectionStart,
    setConnectionStart,
  };
};

export { useWorkflow };
export type { BoxData, Connection, ConnectionPoint };
