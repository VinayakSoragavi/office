import { BoxData, Connection, ConnectionPoint } from "@/types/work-flow/work-flow";
import { Dispatch, SetStateAction } from "react";

export const DeleteBox = (
  id: string,
  boxes: BoxData[],
  setBoxes: React.Dispatch<React.SetStateAction<BoxData[]>>,
  setSelectedBox: React.Dispatch<React.SetStateAction<string | null>>,
  connections: Connection[],
  setConnections: React.Dispatch<React.SetStateAction<Connection[]>>
) => {
  setBoxes(boxes.filter((box) => box.id !== id));
  setConnections(
    connections.filter((conn) => conn.start !== id && conn.end !== id)
  );
  setSelectedBox(null);
};

export const HandleBoxSelect = (
  id: string,
  setSelectedBox: Dispatch<SetStateAction<string | null>>,
  setSelectedConnection: Dispatch<SetStateAction<string | null>>
) => {
  setSelectedBox(id);
  setSelectedConnection(null);
};

export const HandleCanvasClick = (setSelectedBox:Dispatch<SetStateAction<string | null>>,setSelectedConnection:Dispatch<SetStateAction<string | null>>,setConnectionStart:Dispatch<SetStateAction<ConnectionPoint | null>>) => {
  setSelectedBox(null);
  setSelectedConnection(null);
  setConnectionStart(null);
};
