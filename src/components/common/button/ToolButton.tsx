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
        className={`w-full p-2 rounded-md transition-colors ${active ? "bg-[#3a3a3a]" : "hover:bg-[#3a3a3a]"} flex justify-center`}
        onClick={onClick}
      >
        {icon}
      </button>
    )
  }

  export default ToolButton