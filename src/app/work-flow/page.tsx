"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  MousePointer,
  Square,
  Circle,
  ArrowUpRight,
  Pencil,
  Link,
  Type,
  Maximize,
  Gem,
} from "lucide-react";
import ToolButton from "@/components/common/button/ToolButton";
import { workflow } from "@/json/work-flow/workflow";

type ShapeType = "square" | "circle" | "arrow" | "text" | "diamond";

type Point = {
  x: number;
  y: number;
};

type Shape = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  startPoint?: Point;
  endPoint?: Point;
  stateId: string,
  initialState: boolean,
  endState: boolean,
};

export default function Home() {
  const [scale, setScale] = useState("100%");
  const [selectedTool, setSelectedTool] = useState<"select" | ShapeType>(
    "select"
  );
  const [shapes, setShapes] = useState<Shape[]>(workflow.states);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [drawingArrow, setDrawingArrow] = useState<Shape | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);


  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "arrow") {
      if (!drawingArrow) {
        // Start drawing arrow
        const newArrow: Shape = {
          id: Date.now().toString(),
          type: "arrow",
          x,
          y,
          width: 100,
          height: 0,
          startPoint: { x, y },
          endPoint: { x, y },
        };
        setDrawingArrow(newArrow);
      } else {
        // Finish drawing arrow
        const finalArrow = {
          ...drawingArrow,
          endPoint: { x, y },
        };
        setShapes([...shapes, finalArrow]);
        setDrawingArrow(null);
        setSelectedTool("select");
      }
    } else if (selectedTool !== "select") {
      const newShape: Shape = {
        id: Date.now().toString(),
        type: selectedTool,
        x,
        y,
        width: selectedTool === "diamond" ? 100 : 200,
        height:
          selectedTool === "diamond" ? 100 : selectedTool === "text" ? 50 : 120,
        text: selectedTool === "text" ? "Double click to edit" : undefined,
      };

      setShapes([...shapes, newShape]);
      setSelectedTool("select");
      setSelectedShape(newShape.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (drawingArrow) {
      setDrawingArrow({
        ...drawingArrow,
        endPoint: { x, y },
      });
      return;
    }

    if (!isDragging && !isResizing) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setShapes(
      shapes.map((shape) => {
        if (shape.id === selectedShape) {
          if (isDragging) {
            const newShape = {
              ...shape,
              x: shape.x + dx,
              y: shape.y + dy,
            };

            if (shape.type === "arrow") {
              return {
                ...newShape,
                startPoint: {
                  x: (shape.startPoint?.x || 0) + dx,
                  y: (shape.startPoint?.y || 0) + dy,
                },
                endPoint: {
                  x: (shape.endPoint?.x || 0) + dx,
                  y: (shape.endPoint?.y || 0) + dy,
                },
              };
            }

            return newShape;
          }

          if (isResizing && shape.type === "arrow") {
            const isStart = resizeHandle?.includes("start");
            const point = isStart ? "startPoint" : "endPoint";

            return {
              ...shape,
              [point]: { x, y },
            };
          }


          if (isResizing && shape.type === "diamond") {
            let newWidth = shape.width;
            let newHeight = shape.height;
            let newX = shape.x;
            let newY = shape.y;

            switch (resizeHandle) {
              case "top-left":
                newWidth = shape.width - dx;
                newHeight = newWidth
                newX = shape.x + dx;
                newY = shape.y + dy;
                break;
              case "top-right":
                newWidth = shape.width + dx;
                newHeight = newWidth
                newY = shape.y + dy;
                break;
              case "bottom-left":
                newWidth = shape.width - dx;
                newHeight = newWidth
                newX = shape.x + dx;
                break;
              case "bottom-right":
                newWidth = shape.width + dx;
                newHeight = newWidth
                break;
            }

            return {
              ...shape,
              x: newX,
              y: newY,
              width: Math.max(50, newWidth),
              height: Math.max(50, newHeight),
            };
          }

          if (isResizing) {
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
          }
        }
        return shape;
      })
    );

    setStartPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    shapeId: string,
    handle?: string
  ) => {
    e.stopPropagation();
    setSelectedShape(shapeId);

    console.log("handle", handle);

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
    } else {
      setIsDragging(true);
    }

    setStartPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  const handleDoubleClick = (e: React.MouseEvent, shape: Shape) => {
    if (shape.type === "text") {
      const newText = prompt("Enter text:", shape.text);
      if (newText !== null) {
        setShapes(
          shapes.map((s) => (s.id === shape.id ? { ...s, text: newText } : s))
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const renderShape = (shape: Shape) => {
    const isSelected = selectedShape === shape.id;
    const baseStyle = {
      left: shape.x,
      top: shape.y,
      width: shape.width,
      height: shape.height,
      cursor: isDragging ? "grabbing" : "grab",
    };

    const baseClasses = `absolute ${isSelected ? "ring-1 ring-blue-500" : ""}`;

    switch (shape.type) {
      case "square":
        return (
          <div
            className={`${baseClasses} border-2 border-white rounded-xl bg-transparent z-10 flex align-middle ${shape.endState?"border-green-500":"border-white"}`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, shape.id)}
          >
            <div className={`text-[10px] flex justify-center p-4 text-center items-center w-full ${shape.endState?"text-green-500":"text-white"}`}>
            {shape?.stateId?.split("_").join(" ")}
            </div>
            </div>
        );
      case "circle":
        return (
          <div
            className={`${baseClasses} border-2 ${shape.endState?"border-green-500":"border-white"} rounded-full bg-transparent z-10  flex align-middle`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, shape.id)}
          >
            <div className={`text-[10px] flex justify-center p-4 text-center items-center w-full ${shape.endState?"text-green-500":"text-white"}`}>
            {shape?.stateId?.split("_").join(" ")}
            </div>
            </div>
        );
      case "arrow":
        if (!shape.startPoint || !shape.endPoint) return null;

        const dx = shape.endPoint.x - shape.startPoint.x;
        const dy = shape.endPoint.y - shape.startPoint.y;
        const angle = Math.atan2(dy, dx);
        const length = Math.sqrt(dx * dx + dy * dy);

        return (
          <>
            <div
              className={`${baseClasses} ${shape.endState?"bg-green-500":"bg-white"}`}
              style={{
                position: "absolute",
                left: shape.startPoint.x,
                top: shape.startPoint.y,
                width: length,
                height: 2,
                transformOrigin: "0 50%",
                transform: `rotate(${angle}rad)`,
              }}
              onMouseDown={(e) => handleMouseDown(e, shape.id)}
            >
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 border-t-[6px] border-r-[6px] border-b-[6px] border-transparent border-l-[10px] ${shape.endState?"border-l-green-500":"border-l-white"} right-[-9px]`}/>
            </div>
            {isSelected && (
              <>
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
                  style={{
                    left: shape.startPoint.x - 6,
                    top: shape.startPoint.y - 6,
                  }}
                  onMouseDown={(e) =>
                    handleMouseDown(e, shape.id, "start-point")
                  }
                />
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
                  style={{
                    left: shape.endPoint.x - 6,
                    top: shape.endPoint.y - 6,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, shape.id, "end-point")}
                />
              </>
            )}
          </>
        );
      case "text":
        return (
          <div
            className={`${baseClasses} text-white p-2`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, shape.id)}
            onDoubleClick={(e) => handleDoubleClick(e , shape)}
          >
            {shape.text}
          </div>
        );
      case "diamond":
        return (
          <div
            className={`${baseClasses} border-2 border-white bg-transparent z-10 flex justify-center items-center ${shape.endState?"border-green-500":"border-white"}`}
            style={{
              ...baseStyle,
              transform: "rotate(45deg)",
              transformOrigin: "center",
            }}
            onMouseDown={(e) => handleMouseDown(e, shape.id)}
          >
             <div className={`text-[10px] flex justify-center p-4 text-center items-center w-full ${shape.endState?"text-green-500":"text-white"} -rotate-45`} >
            {shape?.stateId?.split("_").join(" ")}
            </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white">
      {/* Left Toolbar */}
      <div className="w-14 bg-[#242424] flex flex-col gap-1 p-2">
        <div className="flex items-center mb-4">
          <button className="w-full p-2 hover:bg-[#3a3a3a] rounded-md transition-colors flex justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <ToolButton
          icon={<MousePointer className="w-5 h-5" />}
          active={selectedTool === "select"}
          onClick={() => setSelectedTool("select")}
        />
        <ToolButton
          icon={<Square className="w-5 h-5" />}
          active={selectedTool === "square"}
          onClick={() => setSelectedTool("square")}
        />
        <ToolButton
          icon={<Gem className="w-5 h-5" />}
          active={selectedTool === "diamond"}
          onClick={() => setSelectedTool("diamond")}
        />
        <ToolButton
          icon={<Circle className="w-5 h-5" />}
          active={selectedTool === "circle"}
          onClick={() => setSelectedTool("circle")}
        />
        <ToolButton
          icon={<ArrowUpRight className="w-5 h-5" />}
          active={selectedTool === "arrow"}
          onClick={() => setSelectedTool("arrow")}
        />
        <ToolButton
          icon={<Type className="w-5 h-5" />}
          active={selectedTool === "text"}
          onClick={() => setSelectedTool("text")}
        />
        <ToolButton icon={<Pencil className="w-5 h-5" />} />
        <ToolButton icon={<Link className="w-5 h-5" />} />

        <div className="mt-auto">
          <ToolButton icon={<Maximize className="w-5 h-5" />} />
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-12 flex items-center justify-between px-4 bg-[#242424]">
          <div>Press / to open insert menu</div>
          <div className="flex items-center gap-2">
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="bg-[#242424] border border-[#3a3a3a] rounded px-2 py-1"
            >
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
              <option value="125%">125%</option>
              <option value="150%">150%</option>
            </select>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden cursor-crosshair"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
        >
          {shapes.map((shape) => (
            <div key={shape.id}>
              {renderShape(shape)}
              {selectedShape === shape.id && shape.type !== "arrow" && (
                <>
                  <div
                    style={{
                      left: shape.type!="diamond"?shape.x - 7:shape.x-(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2-7,
                      top: shape.type!="diamond"?shape.y - 7:shape.y-(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2-6,
                      width: shape.type!="diamond"?shape.width + 14:Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))+14,
                      height: shape.type!="diamond"?shape.height + 14:Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))+14,
                    }}
                    className="absolute border-2 border-blue-500 "
                  ></div>
                  <div
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize "
                    style={{ left:shape.type!="diamond"? shape.x - 12:shape.x-(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2-12,
                              top: shape.type!="diamond"? shape.y - 12:shape.y-(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2-11, }}
                    onMouseDown={(e) =>
                      handleMouseDown(e, shape.id, "top-left")
                    }
                  />
                  <div
                    className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize"
                    style={{
                      left: shape.type!="diamond"?shape.x + 12 + shape.width - 12:shape.x + 10 + (Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2 - 11+shape.width,
                      top: shape.type!="diamond"?shape.y - 12:shape.y-(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2-11 ,
                    }}
                    onMouseDown={(e) =>
                      handleMouseDown(e, shape.id, "top-right")
                    }
                  />
                  <div
                    className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize"
                    style={{
                      left: shape.type!="diamond"? shape.x - 12:shape.x-(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2-12,
                      top: shape.type !="diamond"?shape.y + 0 + shape.height:shape.y+(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2 + 0 + shape.height,
                    }}
                    onMouseDown={(e) =>
                      handleMouseDown(e, shape.id, "bottom-left")
                    }
                  />
                  <div
                    className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize"
                    style={{
                      left: shape.type !="diamond"?shape.x + shape.width:shape.x + shape.width+(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2,
                      top: shape.type!="diamond"?shape.y + shape.height:shape.y + shape.height+(Math.sqrt((shape.width * shape.width ) + (shape.width * shape.width))-shape.width)/2,
                    }}
                    onMouseDown={(e) =>
                      handleMouseDown(e, shape.id, "bottom-right")
                    }
                  />
                </>
              )}
            </div>
          ))}
          {drawingArrow && drawingArrow.startPoint && drawingArrow.endPoint && (
            <div
              className="absolute bg-white"
              style={{
                left: drawingArrow.startPoint.x,
                top: drawingArrow.startPoint.y,
                width: Math.sqrt(
                  Math.pow(
                    drawingArrow.endPoint.x - drawingArrow.startPoint.x,
                    2
                  ) +
                    Math.pow(
                      drawingArrow.endPoint.y - drawingArrow.startPoint.y,
                      2
                    )
                ),
                height: 2,
                transformOrigin: "0 50%",
                transform: `rotate(${Math.atan2(
                  drawingArrow.endPoint.y - drawingArrow.startPoint.y,
                  drawingArrow.endPoint.x - drawingArrow.startPoint.x
                )}rad)`,
              }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[6px] border-r-[6px] border-b-[6px] border-transparent border-l-[10px] border-l-white" />
            </div>
          )}
          {shapes.length === 0 && !drawingArrow && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Draw, Diagram
            </div>
          )}
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-4 right-4 w-10 h-10 bg-[#242424] rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
        ?
      </button>
    </div>
  );
}
