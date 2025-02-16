import ToolButton from "@/components/common/button/ToolButton"
import { ArrowUpRight, Circle, Gem, Link, Maximize, MousePointer, Pencil, Plus, Square, Type } from "lucide-react"

interface SidebarProps {
  onAddNode: (type: string) => void
}

function Sidebar({ onAddNode }: SidebarProps) {
  const tools = [
    { icon: <MousePointer className="w-5 h-5 text-white" />, type: "start-flow" },
    { icon: <Square className="w-5 h-5 text-white" />, type: "square" },
    { icon: <Gem className="w-5 h-5 text-white" />, type: "diamond" },
    { icon: <Circle className="w-5 h-5 text-white" />, type: "circle" },
    { icon: <ArrowUpRight className="w-5 h-5 text-white" />, type: "arrow" },
    { icon: <Type className="w-5 h-5 text-white" />, type: "text" },
    { icon: <Pencil className="w-5 h-5 text-white" />, type: "draw" },
    { icon: <Link className="w-5 h-5 text-white" />, type: "link" },
  ]

  return (
    <div className="w-14 bg-gradient-to-b from-[#3f3f46] to-[#1b1b1b] backdrop-blur-lg shadow-lg flex flex-col gap-1 p-2 border border-white/10 rounded-lg h-full">
      <div className="flex items-center mb-4">
        <button className="w-full p-2 hover:bg-[#3a3a3a] rounded-md transition-colors flex justify-center">
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {tools.map((tool) => (
        <ToolButton key={tool.type} icon={tool.icon} onClick={() => tool.type !== "select" && onAddNode(tool.type)} />
      ))}

      <div className="mt-auto">
        <ToolButton icon={<Maximize className="w-5 h-5 text-white" />} />
      </div>
    </div>
  )
}

export default Sidebar

