import { Point, Shape } from '@/types/shapes';
import { DragOffset } from '@/types/workflow';
import { handleMouseDown } from '@/utils/work-flow/utility';
import { type Dispatch, type SetStateAction } from 'react';


interface ResizeHandleProps {
  shape: Shape;
  selectedShape: string | null;
  shapes: Shape[];
  setSelectedShape: Dispatch<SetStateAction<string | null>>;
  setIsResizing: Dispatch<SetStateAction<boolean>>;
  setResizeHandle: Dispatch<SetStateAction<string | null>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setDragOffset: Dispatch<SetStateAction<DragOffset>>;
  setStartPos: Dispatch<SetStateAction<Point>>;
}

interface HandlePosition {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  cursor: string;
  style: {
    left: number;
    top: number;
  };
}

const ResizeHandles: React.FC<ResizeHandleProps> = ({
  shape,
  selectedShape,
  shapes,
  setSelectedShape,
  setIsResizing,
  setResizeHandle,
  setIsDragging,
  setDragOffset,
  setStartPos,
}) => {
  if (shape.type === 'arrow' || !selectedShape) return null;

  const bounds = shape.type === 'diamond' 
    ? calculateDiamondBounds(shape) 
    : shape;

  const handlePositions: HandlePosition[] = [
    {
      position: 'top-left',
      cursor: 'nw-resize',
      style: {
        left: bounds.x - 12,
        top: bounds.y - 12,
      },
    },
    {
      position: 'top-right',
      cursor: 'ne-resize',
      style: {
        left: bounds.x + bounds.width,
        top: bounds.y - 12,
      },
    },
    {
      position: 'bottom-left',
      cursor: 'sw-resize',
      style: {
        left: bounds.x - 12,
        top: bounds.y + bounds.height,
      },
    },
    {
      position: 'bottom-right',
      cursor: 'se-resize',
      style: {
        left: bounds.x + bounds.width,
        top: bounds.y + bounds.height,
      },
    },
  ];

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    position: HandlePosition['position']
  ) => {
    handleMouseDown(
      e,
      setSelectedShape,
      shapes,
      setIsResizing,
      setResizeHandle,
      setIsDragging,
      setDragOffset,
      setStartPos,
      shape.id,
      position
    );
  };

  const ResizeHandle: React.FC<{ handleData: HandlePosition }> = ({ handleData }) => (
    <div
      className="absolute w-3 h-3 bg-blue-500 rounded-full"
      style={{
        ...handleData.style,
        cursor: handleData.cursor,
      }}
      onMouseDown={(e) => handleResizeMouseDown(e, handleData.position)}
    />
  );

  return (
    <>
      <div
        style={{
          left: bounds.x - 7,
          top: bounds.y - 7,
          width: bounds.width + 14,
          height: bounds.height + 14,
        }}
        className="absolute border-2 border-blue-500"
      />
      {handlePositions.map((handleData) => (
        <ResizeHandle key={handleData.position} handleData={handleData} />
      ))}
    </>
  );
};

// Helper function to calculate diamond bounds (implement based on your needs)
const calculateDiamondBounds = (shape: Shape): Shape => {
  // Implement your diamond bounds calculation logic here
  return shape;
};

export default ResizeHandles;