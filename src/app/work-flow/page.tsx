"use client";

import { useState, useRef, useEffect } from "react";
import { Shape, ShapeType } from "@/types/shapes";
import { handleCanvasClick, handleMouseMove } from "@/utils/work-flow/utility";
import RenderShape from "./_components/RenderShape";
import ResizeHandles from "./_components/ResizeHandles";
import IconSider from "./_components/IconSider";

export default function Home() {
  // State
  const [scale, setScale] = useState("100%");
  const [selectedTool, setSelectedTool] = useState<"select" | ShapeType>(
    "select"
  );
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [drawingArrow, setDrawingArrow] = useState<Shape | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white">
      {/* Left Toolbar */}
      <IconSider selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

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
          onClick={(e) =>
            handleCanvasClick(
              e,
              canvasRef,
              drawingArrow,
              setDrawingArrow,
              shapes,
              setShapes,
              setSelectedTool,
              selectedTool,
              setSelectedShape
            )
          }
          onMouseMove={(e) => {
            handleMouseMove(
              e,
              drawingArrow,
              setDrawingArrow,
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
          }}
        >
          {shapes.map((shape) => (
            <div key={shape.id}>
              <RenderShape
                shape={shape}
                selectedShape={selectedShape}
                isDragging={isDragging}
                setSelectedShape={setSelectedShape}
                shapes={shapes}
                setShapes={setShapes}
                setIsResizing={setIsResizing}
                setResizeHandle={setResizeHandle}
                setIsDragging={setIsDragging}
                setDragOffset={setDragOffset}
                setStartPos={setStartPos}
              />
              {selectedShape === shape.id && (
                <ResizeHandles
                  shape={shape}
                  selectedShape={selectedShape}
                  shapes={shapes}
                  setSelectedShape={setSelectedShape}
                  setIsResizing={setIsResizing}
                  setResizeHandle={setResizeHandle}
                  setIsDragging={setIsDragging}
                  setDragOffset={setDragOffset}
                  setStartPos={setStartPos}
                />
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
