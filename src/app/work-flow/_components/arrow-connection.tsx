import { Connection } from "@/types/work-flow/work-flow";
// import { HandleConnectionClick } from "@/utils/work-flow/arrow-utility";
import React, { Dispatch, SetStateAction } from "react";
import Xarrow, { anchorType } from "react-xarrows";

interface ArrowConnectionProps {
  connections: Connection[];
  selectedConnection: string | null;
  setSelectedConnection: Dispatch<SetStateAction<string | null>>;
  setSelectedBox: Dispatch<SetStateAction<string | null>>;
  transform: {
    scale: number;
    positionX: number;
    positionY: number;
  };
}

function ArrowConnection({
  connections,
  selectedConnection,
  // setSelectedConnection,
  // setSelectedBox,
  transform,
}: ArrowConnectionProps) {
  return (
    <>
      {connections.map((connection) => (
        <Xarrow
          key={connection.id}
          start={connection.start}
          end={connection.end}
          path="smooth"
          color={selectedConnection === connection.id ? "#ffffff" : "#aaaaaa"}
          strokeWidth={selectedConnection === connection.id ? 3 : 2}
          headSize={8}
          tailSize={8}
          startAnchor={{
            position: "auto",
            offset: { x: 0, y: 0 }
          } as anchorType}
          endAnchor={{
            position: "auto",
            offset: { x: 0, y: 0 }
          } as anchorType}
          showXarrow={true}
          // cursor="pointer"
          animateDrawing={0}
          zIndex={1000}
          divContainerStyle={{
            transform: `scale(${1 / transform.scale})`,
            transformOrigin: "0 0",
          }}
      
        />
      ))}
    </>
  );
}

export default ArrowConnection;