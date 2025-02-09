import ToolButton from '@/components/common/button/ToolButton'
import { IconSiderProps } from '@/types/workflow'
import { ArrowUpRight, Circle, Gem, Link, Maximize, MousePointer, Pencil, Plus, Square, Type } from 'lucide-react'
import React from 'react'

function IconSider({selectedTool,setSelectedTool}:IconSiderProps) {
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
  )
}

export default IconSider
