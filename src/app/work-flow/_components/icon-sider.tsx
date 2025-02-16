import ToolButton from '@/components/common/button/ToolButton'
import { ArrowUpRight, Circle, Gem, Link, Maximize, MousePointer, Pencil, Plus, Square, Type } from 'lucide-react'
import React from 'react'

function IconSider({selectedTool,setSelectedTool,setBoxes,boxes}:any) {
  return (
    <div className="w-14 bg-[#242424] flex flex-col gap-1 p-2">
        <div className="flex items-center mb-4">
          <button className="w-full p-2 hover:bg-[#3a3a3a] rounded-md transition-colors flex justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <ToolButton
          icon={<MousePointer className="w-5 h-5" />}
          active={selectedTool === "select"}
          
        />
        <ToolButton
          icon={<Square className="w-5 h-5" />}
          active={selectedTool === "square"}
          onClick={() => setBoxes([
            ...boxes,
            {
              id: Date.now().toString(),
              title: 'Box 1',
              form:[{
                label:"",
                value:"",
                title:"title"
              }],
              type: "square",
              x: 57,
              y: 235,
              position: { x: 400, y: 200 }, 
              width: 150,
              height: 100,
              stateId: "LEAVE_REQUEST",
              prasentStatues:"",
              initialState: true,
              endState: true,
            },
          ])}
        />
        <ToolButton
          icon={<Gem className="w-5 h-5" />}
          active={selectedTool === "diamond"}
          onClick={() => setSelectedTool("diamond")}
        />
        <ToolButton
          icon={<Circle className="w-5 h-5" />}
          active={selectedTool === "circle"}
          onClick={() => setBoxes([
            ...boxes,
            {
              id: Date.now().toString(),
              title: 'Box 1',
              form:[{
                label:"",
                value:"",
                title:"title"
              }],
              type: "circle",
              x: 57,
              y: 235,
              position: { x: 400, y: 200 },
              width: 120,
              height: 100,
              stateId: "LEAVE_REQUEST",
              prasentStatues:"",
              initialState: true,
              endState: true,
            },
          ])}
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
  )
}

export default IconSider
