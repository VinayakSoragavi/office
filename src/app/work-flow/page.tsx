"use client";

import { handleCanvasClick, handleMouseMove } from "@/utils/work-flow/utility";
import IconSider from "./_components/icon-sider";
import RenderShape from "./_components/render-shape";
import ResizeHandles from "./_components/resize-handles";
import { useWorkflow } from "../../../hooks/useWorkflow";

export default function Home() {
  const {
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
  } = useWorkflow();

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white">
      {/* Left Toolbar */}
      <IconSider
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />

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
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
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
