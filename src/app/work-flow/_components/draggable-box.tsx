import { useDraggable } from "@dnd-kit/core";
import ConnectionButton from "./connection-button";
import { BoxProps } from "@/types/work-flow/work-flow";

const DraggableBox: React.FC<BoxProps> = ({
    id,
    type,
    position,
    width,
    height,
    children,
    className = "",
    onSelect,
    isSelected,
    onConnectionStart,
    isConnecting,
}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const style: React.CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        width: `${width}px`,
        height: type=="square"?`${height}px`:`${width}px`,
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        touchAction: "none",
    };

    return (
        <div
            
            ref={setNodeRef}
            style={style}
            className={`cursor-move group relative p-5 rounded-md ${className} ${
                isSelected ? "ring-2 ring-purple-600" : ""
            }`}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
            {...listeners}
            {...attributes}
        >
            <div id={id} className="w-full h-full">
            {children}
            </div>
            {["top", "right", "bottom", "left"].map((side) => (
                <ConnectionButton
                    key={side}
                    side={side as "top" | "right" | "bottom" | "left"}
                    boxId={id}
                    onConnectionStart={onConnectionStart}
                    isConnecting={isConnecting}
                />
            ))}
        </div>
    );
};

export default DraggableBox;