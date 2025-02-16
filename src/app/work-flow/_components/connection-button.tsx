import { ConnectionButtonProps } from "@/types/work-flow/work-flow";
import { Plus } from "lucide-react";

const ConnectionButton: React.FC<ConnectionButtonProps> = ({
    side,
    boxId,
    onConnectionStart,
    isConnecting,
}) => {
    const getPositionClasses = (side: "top" | "right" | "bottom" | "left") => {
        switch (side) {
            case "top":
                return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2";
            case "right":
                return "top-1/2 right-0 translate-x-1/2 -translate-y-1/2";
            case "bottom":
                return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2";
            case "left":
                return "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2";
        }
    };

    return (
        <button
            className={`absolute ${getPositionClasses(side)} w-6 h-6 ${
                isConnecting
                    ? "bg-green-600 opacity-100"
                    : "bg-purple-600 opacity-0 group-hover:opacity-100"
            } rounded-full flex items-center justify-center hover:bg-purple-500 z-20 transition-all`}
            onClick={(e) => {
                e.stopPropagation();
                onConnectionStart({ box: boxId, side });
            }}
        >
            <Plus className="w-4 h-4 text-white" />
        </button>
    );
};

export default ConnectionButton;