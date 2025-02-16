import { Plus } from "lucide-react";
import React, { useCallback } from "react";
import { Handle, Position, useReactFlow, MarkerType } from "reactflow";

interface CustomNodeData {
  nodeType: string;
  label: string;
  connectedHandles: Record<string, "source" | "target">;
}

interface StartFlowProps {
  data: CustomNodeData;
  Position: typeof Position;
  handleStyle: {
    width: string;
    height: string;
    background: string;
    border: string;
    opacity: number;
  };
  selected: boolean;
  onAddNode?: () => void;
}

function StartFlow({
  data,
  Position,
  selected,
}: StartFlowProps) {
  const reactFlowInstance = useReactFlow();
  
  const handleAddNode = useCallback(() => {
    const sourceNode = reactFlowInstance.getNodes().find(
      (node) => node.data.label === "start-flow"
    );

    if (sourceNode) {
      // Base X position (fixed distance from source node)
      const baseX = sourceNode.position.x + 140;
      
      // Get all existing nodes sorted by Y position
      const existingNodes = reactFlowInstance
        .getNodes()
        .filter(node => node.id !== sourceNode.id)
        .sort((a, b) => a.position.y - b.position.y);

      // Find the appropriate Y position for the new node
      let newY = sourceNode.position.y;
      const spacing = 60; // Space between nodes

      if (existingNodes.length > 0) {
        // Find the first gap in Y positions that can fit our new node
        let foundGap = false;
        
        for (let i = 0; i < existingNodes.length; i++) {
          const currentNode = existingNodes[i];
          // Check if current position is already occupied
          const currentYPosition = sourceNode.position.y + (i * spacing);
          const hasNodeAtPosition = existingNodes.some(node => 
            Math.abs(node.position.y - currentYPosition) < spacing / 2
          );

          if (!hasNodeAtPosition) {
            newY = currentYPosition;
            foundGap = true;
            break;
          }
          
          // If we're at the last node and haven't found a gap,
          // place the new node below the last one
          if (i === existingNodes.length - 1 && !foundGap) {
            newY = currentNode.position.y + spacing;
          }
        }
      }

      const newNodeId = `circle-${Date.now()}`;
      const newNode = {
        id: newNodeId,
        type: 'custom',
        position: { x: baseX, y: newY },
        data: {
          label: 'circle',
          nodeType: 'circle',
          connectedHandles: {
            left: "target"
          }
        }
      };

      reactFlowInstance.addNodes(newNode);

      const newEdge = {
        id: `edge-${sourceNode.id}-${newNodeId}`,
        source: sourceNode.id,
        target: newNodeId,
        sourceHandle: 'right',
        targetHandle: 'left',
        type: 'default',
        style: {
          stroke: "#7b809a",
          strokeWidth: 1
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#7b809a"
        }
      };

      reactFlowInstance.addEdges(newEdge);
    }
  }, [reactFlowInstance]);

  const persistentHandleStyle = {
    width: "2px",
    height: "2px",
    background: "#2563eb",
    border: "0px solid white",
    opacity: 0,
    zIndex: 0,
    cursor: "pointer"
  };

  return (
    <div 
      className={`flex flex-col items-center relative ${selected ? "pb-[0.1px]" : "pb-0"}`}
    >
      <div className="flex items-center">
        <div
          className={`
            px-4 py-2
            shadow-md
            max-w-[100px]
            min-h-[40px]
            rounded-l-2xl
            rounded-r-full
            bg-[#ffffff]
            flex items-center
            border-2
            ${selected ? "border-[#343439]" : "border-[#344767]"}
            break-words
            whitespace-normal
            relative
          `}
        >
          <div className="flex items-center justify-center text-[#344767] h-full">
            <h6 className="text-[9px] text-center">{data.label}</h6>
          </div>
        
        </div>
        <div className="w-6 border-[1px] border-[#343439]"></div>
        <button
          className="w-3 h-3 flex items-center justify-center border-[1px] border-[#343439] rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={handleAddNode}
        >
          <Plus size={10} className="text-[#343439]" />
        </button>
        <Handle
            type="source"
            position={Position.Right}
            style={persistentHandleStyle}
            id="right"
            isConnectable={true}
            isConnectableStart={true}
            isConnectableEnd={false}
          />
      </div>
    </div>
  );
}

export default StartFlow;