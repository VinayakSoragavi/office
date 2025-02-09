import { cn } from "@/lib/utils"

function ToolButton({
    icon,
    active,
    onClick,
  }: {
    icon: React.ReactNode
    active?: boolean
    onClick?: () => void
  }) {
    return (
      <button
        // className={`w-full p-2 rounded-md transition-colors ${active ? "bg-[#3a3a3a]" : "hover:bg-[#3a3a3a]"} flex justify-center`}
        className={cn("w-full p-2 rounded-md transition-colors flex justify-center" ,{
          "bg-[#3a3a3a]" : active,
          "hover:bg-[#3a3a3a]": !active
        })}
        onClick={onClick}
      >
        {icon}
      </button>
    )
  }

  export default ToolButton