import { BoxData } from "@/types/work-flow/work-flow";
import { DragEndEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";

export const HandleDragStart = (
  setWorkflowIsDragging: (value: SetStateAction<boolean>) => void
) => {
  setWorkflowIsDragging(true);
};

export const HandleDragEnd = (
  event: DragEndEvent,
  setBoxes: Dispatch<SetStateAction<BoxData[]>>,
  setWorkflowIsDragging: (value: SetStateAction<boolean>) => void,
  scale:number
) => {
  const { active, delta } = event;

  // Adjust delta based on current zoom scale
  const adjustedDelta = {
    x: delta.x / scale,
    y: delta.y / scale
  };


  setBoxes((prevBoxes) =>
    prevBoxes.map((box) => {
      if (box.id === active.id) {
        return {
          ...box,
          position: {
            x: box.position.x + adjustedDelta.x,
            y: box.position.y + adjustedDelta.y,
          },
        };
      }
      return box;
    })
  );

  setWorkflowIsDragging(false);
};