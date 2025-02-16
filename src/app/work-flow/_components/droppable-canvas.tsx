import { useDroppable } from "@dnd-kit/core";

const DroppableCanvas: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
  }> = ({ children, onClick }) => {
    const { setNodeRef } = useDroppable({
      id: "canvas",
    });
  
    return (
      <div
        ref={setNodeRef}
        className="absolute rounded-xl shadow-lg w-auto h-auto "
        onClick={onClick}
      >
        {children}
      </div>
    );
  };
  export default DroppableCanvas