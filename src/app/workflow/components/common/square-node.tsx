import React from 'react'
import { Handle,Position } from 'reactflow'

interface CustomNodeData {
    nodeType: string;
    label: string;
    connectedHandles: Record<string, "source" | "target">;
  }

function SquareNode({data,getHandleType,handleStyle,selected}:{
    data:CustomNodeData,
    getHandleType:(position: string) => "source" | "target",
    handleStyle:{
        width: string;
        height: string;
        background: string;
        border: string;
        opacity: number;
    },
    selected:boolean
}) {
  return (
    <div className={`flex flex-col items-center relative ${selected?"pb-[0.1px]":"pb-0"}`}>
      <div>
      <div className={`px-4 py-2 shadow-md w-20 h-10 rounded-xl  bg-[#ffffff] border-2 ${selected?"border-[#343439]":"border-[#344767]"}`}>
        <Handle
          type={getHandleType("top")}
          position={Position.Top}
          style={handleStyle}
          id="top"
        />
        <Handle
          type={getHandleType("left")}
          position={Position.Left}
          style={handleStyle}
          id="left"
        />
        <div className="flex items-center justify-center text-[#242424] h-full">
          <h6 className="text-[9px]">{data.label}</h6>
        </div>
        <Handle
          type={getHandleType("right")}
          position={Position.Right}
          style={handleStyle}
          id="right"
        />
        <Handle
          type={getHandleType("bottom")}
          position={Position.Bottom}
          style={handleStyle}
          id="bottom"
        />
      </div>
      <div className=''>

      </div>
        </div>    
    </div>
  )
}

export default SquareNode
