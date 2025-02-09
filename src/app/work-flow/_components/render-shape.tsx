"use client";
import { RenderShapeProps } from "@/types/workflow";
import {
  handleDoubleClick,
  handleMouseDown,
  handleShapeDoubleClick,
} from "@/utils/work-flow/utility";
import BasicInfoForm from "./common/basic-info-form";
import { cn } from "@/lib/utils";

const RenderShape: React.FC<RenderShapeProps> = ({
  shape,
  selectedShape,
  isDragging,
  setSelectedShape,
  shapes,
  setShapes,
  setIsResizing,
  setResizeHandle,
  setIsDragging,
  setDragOffset,
  setStartPos,
  isFormOpen,
  setIsFormOpen,
}) => {
  const isSelected = selectedShape === shape.id;

  const baseStyle = {
    position: "absolute" as const,
    left: shape.x,
    top: shape.y,
    width: shape.width,
    height: shape.height,
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getStateColor = (isEndState?: boolean) =>
    isEndState ? "border-green-500 text-green-500" : "border-white text-white";

  const handleShapeMouseDown = (e: React.MouseEvent, resizeHandle?: string) => {
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
      resizeHandle
    );
  };

  const renderStateText = (stateId?: string) => {
    if (!stateId) return null;
    return (
      <div
        className={`text-[10px] flex justify-center p-4 text-center items-center w-full ${
          getStateColor(shape.endState).split(" ")[1]
        }`}
      >
        {stateId.split("_").join(" ")}
      </div>
    );
  };

  const findTitle = (shape: { form: Array<{ title: string; value: string }> }): string | undefined => {
    const formEntry = shape.form.find(entry => entry.title === "title");
    return formEntry?.value;
  };

  const baseClasses = `absolute ${isSelected ? "ring-1 ring-blue-500" : ""}`;

  const renderArrowHandles = () => {
    if (!isSelected || !shape.startPoint || !shape.endPoint) return null;

    return (
      <>
        <div
          className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
          style={{
            left: shape.startPoint.x - 6,
            top: shape.startPoint.y - 6,
          }}
          onMouseDown={(e) => handleShapeMouseDown(e, "start-point")}
        />
        <div
          className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-move"
          style={{
            left: shape.endPoint.x - 6,
            top: shape.endPoint.y - 6,
          }}
          onMouseDown={(e) => handleShapeMouseDown(e, "end-point")}
        />
      </>
    );
  };

  const renderArrow = () => {
    if (!shape.startPoint || !shape.endPoint) return null;

    const dx = shape.endPoint.x - shape.startPoint.x;
    const dy = shape.endPoint.y - shape.startPoint.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dx * dx + dy * dy);

    return (
      <>
        <div
          className={`${baseClasses} ${
            shape.endState ? "bg-green-500" : "bg-white"
          }`}
          style={{
            ...baseStyle,
            left: shape.startPoint.x,
            top: shape.startPoint.y,
            width: length,
            height: 2,
            transformOrigin: "0 50%",
            transform: `rotate(${angle}rad)`,
          }}
          onMouseDown={handleShapeMouseDown}
          onDoubleClick={(e) => {
            e.stopPropagation(); // Prevent event conflicts
            handleShapeDoubleClick(shape.id, setIsFormOpen);
          }}
        >
          <div
            className={`absolute ri{
    e.stopPropagation(); // Prevent event conflicts
    handleShapeDoubleClick(shape.id, setIsFormOpen);
  }t-0 top-1/2 -translate-y-1/2 border-t-[6px] border-r-[6px] border-b-[6px] border-transparent border-l-[10px] ${
    shape.endState ? "border-l-green-500" : "border-l-white"
  } right-[-9px]`}
          />
        </div>
        <div
          className={cn("w-full h-full rounded-xl relative")}
          style={{
            left: isFormOpen == shape.id ? shape.width / 2 : 0,
            top: isFormOpen == shape.id ? shape.height / 2 : 0,
          }}
        >
          {isFormOpen == shape.id && (
            <BasicInfoForm setIsFormOpen={setIsFormOpen} />
          )}
        </div>
        {renderArrowHandles()}
      </>
    );
  };

  switch (shape.type) {
    case "square":
      return (
        <div
          className={`${baseClasses} border-2 rounded-xl bg-transparent z-10 flex align-middle ${getStateColor(
            shape.endState
          )}`}
          style={baseStyle}
          onMouseDown={handleShapeMouseDown}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleShapeDoubleClick(shape.id, setIsFormOpen);
          }}
        >
          {renderStateText(shape.stateId)}
          <div className="w-full h-full rounded-xl relative">
            <div className="w-full h-full absolute flex justify-center items-center">
              <h4 className="text-sm text-center">
                {findTitle(shape)}
              </h4>
            </div>
            <div
              className={cn("w-full h-full absolute z-50")}
              style={{
                left: isFormOpen == shape.id ? shape.width / 2 : 0,
                top: isFormOpen == shape.id ? shape.height / 2 : 0,
              }}
            >
              {isFormOpen == shape.id && (
                <BasicInfoForm setIsFormOpen={setIsFormOpen} shape={shape}/>
              )}
            </div>
          </div>
        </div>
      );

    case "circle":
      return (
        <div
          className={`${baseClasses} border-2 rounded-full bg-transparent z-10 flex align-middle ${getStateColor(
            shape.endState
          )}`}
          style={baseStyle}
          onMouseDown={handleShapeMouseDown}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleShapeDoubleClick(shape.id, setIsFormOpen);
          }}
        >
          {renderStateText(shape.stateId)}
          <div className="w-full h-full rounded-xl relative">
            <div className="w-full h-full absolute flex justify-center items-center">
              <h4 className="text-sm text-center">
              {findTitle(shape)}
              </h4>
            </div>
            <div
              className={cn("w-full h-full absolute z-50")}
              style={{
                left: isFormOpen == shape.id ? shape.width / 2 : 0,
                top: isFormOpen == shape.id ? shape.height / 2 : 0,
              }}
            >
              {isFormOpen == shape.id && (
                <BasicInfoForm setIsFormOpen={setIsFormOpen} shape={shape}/>
              )}
            </div>
          </div>
        </div>
      );

    case "diamond":
      return (
        <div
          className={`${baseClasses} border-2 bg-transparent z-10 flex justify-center items-center ${getStateColor(
            shape.endState
          )}`}
          style={{
            ...baseStyle,
            transform: "rotate(45deg)",
            transformOrigin: "center",
          }}
          onMouseDown={handleShapeMouseDown}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleShapeDoubleClick(shape.id, setIsFormOpen);
          }}
        >
          {renderStateText(shape.stateId)}
          <div
            className={cn("w-full h-full rounded-xl relative")}
            style={{
              left: isFormOpen == shape.id ? shape.width / 2 : 0,
              top: isFormOpen == shape.id ? shape.height / 2 : 0,
            }}
          >
            {isFormOpen == shape.id && (
              <BasicInfoForm setIsFormOpen={setIsFormOpen} />
            )}
          </div>
        </div>
      );

    case "arrow":
      return renderArrow();

    case "text":
      return (
        <div
          className={`${baseClasses} text-white p-2`}
          style={baseStyle}
          onMouseDown={handleShapeMouseDown}
          onDoubleClick={(e) => handleDoubleClick(e, shape, shapes, setShapes)}
        >
          {renderStateText(shape.stateId)}
          <div
            className={cn("w-full h-full rounded-xl relative")}
            style={{
              left: isFormOpen == shape.id ? shape.width / 2 : 0,
              top: isFormOpen == shape.id ? shape.height / 2 : 0,
            }}
          >
            {isFormOpen == shape.id && (
              <BasicInfoForm setIsFormOpen={setIsFormOpen} />
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default RenderShape;
