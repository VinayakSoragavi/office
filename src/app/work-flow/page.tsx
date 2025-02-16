"use client";

import { useTransform } from "@/hooks/work-flow/useTransform";
import {
  DeleteConnection,
  HandleConnectionPoint,
} from "@/utils/work-flow/arrow-utility";
import { HandleDragEnd, HandleDragStart } from "@/utils/work-flow/dragging";
import {
  HandleBoxSelect,
  HandleCanvasClick
} from "@/utils/work-flow/utility-main";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { useWorkflow } from "../../../hooks/work-flow/useWorkflow";
import ArrowConnection from "./_components/arrow-connection";
import SquareNode from "./_components/common/square-node";
import DraggableBox from "./_components/draggable-box";
import DroppableCanvas from "./_components/droppable-canvas";
import IconSider from "./_components/icon-sider";
import NavbarWorkFlow from "./_components/navbar-work-flow";
import ZoomWrapper from "./_components/zoom-wrapper";
import CircleNode from "./_components/common/circle-node";
import WorkflowTrigger from "./_components/workflow-trigger";

export default function Home() {
  const {
    scale,
    setScale,
    selectedTool,
    setSelectedTool,
    setIsDragging: setWorkflowIsDragging,
    boxes,
    setBoxes,
    selectedBox,
    setSelectedBox,
    connections,
    setConnections,
    selectedConnection,
    setSelectedConnection,
    connectionStart,
    setConnectionStart,
  } = useWorkflow();

  const [isDragging, setIsDragging] = useState(false);
  const { transform, handleTransform } = useTransform();

  const handleDragStartWrapper = () => {
    setIsDragging(true);
    HandleDragStart(setWorkflowIsDragging);
  };

  const handleDragEndWrapper = (e: DragEndEvent) => {
    setIsDragging(false);
    HandleDragEnd(e, setBoxes, setWorkflowIsDragging, scale);
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white">
      <IconSider
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        setBoxes={setBoxes}
        boxes={boxes}
      />

      <div className="flex-1 flex flex-col">
        <NavbarWorkFlow scale={scale} setScale={setScale} />

        <ZoomWrapper
          setScale={setScale}
          isDragging={isDragging}
          handleTransform={handleTransform}
        >
          <DndContext
            onDragStart={handleDragStartWrapper}
            onDragEnd={handleDragEndWrapper}
          >
            <DroppableCanvas
              onClick={() =>
                HandleCanvasClick(
                  setSelectedBox,
                  setSelectedConnection,
                  setConnectionStart
                )
              }
            >
              <div className="relative w-full h-full">
                {boxes.map((box) => (
                  <DraggableBox
                    type={box.type}
                    key={box.id}
                    id={box.id}
                    position={box.position}
                    width={box.width}
                    height={box.height}
                    onSelect={() =>
                      HandleBoxSelect(
                        box.id,
                        setSelectedBox,
                        setSelectedConnection
                      )
                    }
                    isSelected={selectedBox === box.id}
                    onConnectionStart={(point) => {
                      HandleConnectionPoint(
                        point,
                        connectionStart,
                        setConnectionStart,
                        connections,
                        setConnections
                      );
                    }}
                    isConnecting={!!connectionStart}
                  >
                    <CircleNode
                      box={box}
                      selectedBox={selectedBox}
                      boxes={boxes}
                      setBoxes={setBoxes}
                      setSelectedBox={setSelectedBox}
                      connections={connections}
                      setConnections={setConnections}
                    />
                  </DraggableBox>
                ))}

                <ArrowConnection
                  connections={connections}
                  selectedConnection={selectedConnection}
                  setSelectedConnection={setSelectedConnection}
                  setSelectedBox={setSelectedBox}
                  transform={transform}
                />
              </div>
            </DroppableCanvas>
          </DndContext>
        </ZoomWrapper>
      </div>

      {selectedConnection && (
        <button
          onClick={() =>
            DeleteConnection(
              selectedConnection,
              setConnections,
              setSelectedConnection,
              connections
            )
          }
          className="fixed bottom-16 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 z-20"
        >
          Delete Connection
        </button>
      )}

      {connectionStart && (
        <div className="fixed bottom-16 left-4 bg-purple-600 text-white px-4 py-2 rounded-md">
          Select another point to complete the connection
        </div>
      )}

      <button className="fixed bottom-4 right-4 w-10 h-10 bg-[#242424] rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
        ?
      </button>
      <div className="fixed right-0 bottom-0">
      <WorkflowTrigger/>
      </div>
    </div>
  );
}
