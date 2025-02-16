import { Square, Circle, Diamond, ArrowUpRight, Type } from "lucide-react";

const nodeTypes = [
  { type: "square", Icon: Square, label: "Square" },
  { type: "circle", Icon: Circle, label: "Circle" },
  { type: "diamond", Icon: Diamond, label: "Diamond" },
  { type: "arrow", Icon: ArrowUpRight, label: "Arrow" },
  { type: "text", Icon: Type, label: "Text" },
];

interface BottomToolbarProps {
  selectedNode: string | null;
  selectedNodeType?: string;
  onUpdateNodeType?: (id: string, type: string) => void;
}

const BottomToolbar = memo(
  ({
    selectedNode,
    selectedNodeType,
    onUpdateNodeType,
  }: BottomToolbarProps) => {
    if (!selectedNode || selectedNodeType=="defalt" || selectedNodeType=="start-flow" || !selectedNodeType) return null;

    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#242424] p-2 rounded-lg shadow-lg border border-stone-600 z-50">
        <div className="flex gap-2">
          {nodeTypes.map(({ type, Icon, label }) => (
            <button
              key={type}
              onClick={() => onUpdateNodeType?.(selectedNode, type)}
              className={`p-2 rounded-md flex items-center justify-center transition-colors ${
                selectedNodeType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    );
  }
);

BottomToolbar.displayName = "BottomToolbar";

// Modified CustomNode.tsx
import { Dispatch, memo, SetStateAction } from "react";
import { Position, NodeProps } from "reactflow";
import CircleNode from "./common/circle-node";
import SquareNode from "./common/square-node";
import DiamondNode from "./common/diamond-node";
import StartFlow from "./common/start-flow";
import DefaltNode from "./common/defalt-node";

interface CustomNodeData {
  nodeType: string;
  label: string;
  connectedHandles: Record<string, "source" | "target">;
  onAddNode?: () => void;
  setOpenSelectBox?: Dispatch<SetStateAction<boolean>>;
}

function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const handleStyle = {
    width: "10px",
    height: "10px",
    background: "#2563eb",
    border: "2px solid white",
    opacity: selected ? 1 : 0,
  };

  const getHandleType = (position: string): "source" | "target" => {
    if (data.connectedHandles && data.connectedHandles[position]) {
      return data.connectedHandles[position];
    }

    switch (data.nodeType) {
      case "arrow":
        return position === "right" || position === "bottom"
          ? "source"
          : "target";
      case "diamond":
        return selected ? "source" : "target";
      case "circle":
        return selected ? "source" : "target";
      default:
        return selected ? "source" : "target";
    }
  };

  return (
    <>
      {(() => {
        switch (data.label) {
          case "start-flow":
          return (
            <StartFlow
              data={data}
              Position={Position}
              handleStyle={handleStyle}
              selected={selected}
              onAddNode={data.onAddNode}
            />
          );
          case "circle":
            return (
              <CircleNode
                data={data}
                getHandleType={getHandleType}
                handleStyle={handleStyle}
                selected={selected}
              />
            );
          case "square":
            return (
              <SquareNode
                data={data}
                getHandleType={getHandleType}
                handleStyle={handleStyle}
                selected={selected}
              />
            );
            case "diamond":
            return (
              <DiamondNode
                data={data}
                getHandleType={getHandleType}
                handleStyle={handleStyle}
                selected={selected}
              />
            );
            case "defalt":
            return (
              <DefaltNode
                selected={selected}
                setOpenSelectBox={data.setOpenSelectBox}
              />
            );
          default:
            return null; // Ensure a default case to prevent unexpected behavior
        }
      })()}
    </>
  );
  
}

export { CustomNode, BottomToolbar };
