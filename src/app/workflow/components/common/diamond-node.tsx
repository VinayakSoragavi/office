import React from "react";
import { Handle,Position } from "reactflow";

interface CustomNodeData {
  nodeType: string;
  label: string;
  connectedHandles: Record<string, "source" | "target">;
}

function DiamondNode({
  data,
  getHandleType,
  handleStyle,
  selected,
}: {
  data: CustomNodeData;
  getHandleType: (position: string) => "source" | "target";
  handleStyle: {
    width: string;
    height: string;
    background: string;
    border: string;
    opacity: number;
  };
  selected: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center relative ${
        selected ? "pb-[0.1px]" : "pb-0"
      }`}
    >
      <div>
        <div
          className={`px-0 py-0 shadow-md w-20 h-20 rounded-xl bg-[#242424] border-2 ${
            selected ? "border-stone-400" : "border-[#494949]"
          } -rotate-45`}
        >
          <div className="absolute right-0 top-0 mr-2">
            <Handle
              type={getHandleType("top")}
              position={Position.Top}
              style={{
                ...handleStyle,
                transform: 'rotate(-45deg)',
                transformOrigin: 'center center'
              }}
              id="top"
            />
          </div>
          <div className="absolute left-0 top-0">
            <Handle
              type={getHandleType("left")}
              position={Position.Left}
              style={handleStyle}
              id="left"
            />
          </div>
          <div className="flex items-center justify-center text-[#242424] h-full rotate-45">
            <h6 className="text-[9px]">{data.label}</h6>
          </div>
          <div className="absolute right-0 bottom-0">
            <Handle
              type={getHandleType("right")}
              position={Position.Right}
              style={handleStyle}
              id="right"
            />
          </div>
          <div className="absolute left-0 bottom-0">
            <Handle
              type={getHandleType("bottom")}
              position={Position.Bottom}
              style={handleStyle}
              id="bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiamondNode;
