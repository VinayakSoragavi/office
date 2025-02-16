import { BoxData, Connection } from "@/types/work-flow/work-flow";
import { DeleteBox } from "@/utils/work-flow/utility-main";
import { Trash2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

function CircleNode({
  box,
  selectedBox,
  boxes,
  setBoxes,
  setSelectedBox,
  connections,
  setConnections,
}: {
  box: BoxData;
  selectedBox: string | null;
  boxes:BoxData[];
  setBoxes:Dispatch<SetStateAction<BoxData[]>>;
  setSelectedBox:Dispatch<SetStateAction<string | null>>;
  connections: Connection[];
  setConnections:Dispatch<SetStateAction<Connection[]>>
}) {
  return (
    <div className="border-2 bg-transparent z-10 flex align-middle border-white w-full h-full rounded-full">
      <div className="flex justify-between items-center p-4 w-full">
        <span>{box.title}</span>
        {selectedBox === box.id && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              DeleteBox(
                box.id,
                boxes,
                setBoxes,
                setSelectedBox,
                connections,
                setConnections
              );
            }}
            className="text-red-500 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default CircleNode;
