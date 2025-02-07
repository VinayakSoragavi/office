import { Plus } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
}

export function PlusButton({ size = "md", className, ...props }: PlusButtonProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <button
      type="button"
      className={`rounded-full bg-black flex items-center justify-center transition-transform hover:scale-105 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <Plus className="text-white" size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
    </button>
  )
}

