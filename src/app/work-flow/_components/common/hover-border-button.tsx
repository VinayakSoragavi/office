import { useState, MouseEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HoverBorderButtonProps {
  bounds: Bounds;
}

export default function HoverBorderButton({ bounds }: HoverBorderButtonProps) {
  const [hoverSide, setHoverSide] = useState<string | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { x, y, width, height } = bounds;
    const threshold = 10; // Distance from border to trigger hover

    const isTop = clientY >= y && clientY <= y + threshold;
    const isBottom = clientY >= y + height - threshold && clientY <= y + height;
    const isLeft = clientX >= x && clientX <= x + threshold;
    const isRight = clientX >= x + width - threshold && clientX <= x + width;

    if (isTop) setHoverSide("top");
    else if (isBottom) setHoverSide("bottom");
    else if (isLeft) setHoverSide("left");
    else if (isRight) setHoverSide("right");
    else setHoverSide(null);
  };

  const getButtonPosition = (): React.CSSProperties => {
    switch (hoverSide) {
      case "top":
        return { left: "50%", top: "-12px", transform: "translateX(-50%)" };
      case "bottom":
        return { left: "50%", bottom: "-12px", transform: "translateX(-50%)" };
      case "left":
        return { top: "50%", left: "-12px", transform: "translateY(-50%)" };
      case "right":
        return { top: "50%", right: "-12px", transform: "translateY(-50%)" };
      default:
        return { display: "none" };
    }
  };

  return (
    <div
      style={{
        left: bounds.x - 7,
        top: bounds.y - 7,
        width: bounds.width + 14,
        height: bounds.height + 14,
      }}
      className="absolute border-2 border-blue-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverSide(null)}
    >
      <div className="w-full h-full rounded-xl relative flex justify-center">
        <Button
          size="icon"
          variant="ghost"
          className="absolute h-8 w-8 text-white hover:bg-[#8080806a] rounded-full"
          style={getButtonPosition()}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
