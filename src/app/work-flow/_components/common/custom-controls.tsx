import { useReactFlow } from "reactflow";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"; // For icons

const CustomControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="bg-[#3a3a3a] p-2 rounded-md flex gap-2 absolute right-0 bottom-0 z-50">
      <button onClick={() => zoomIn()} className="text-white p-2">
        <ZoomIn />
      </button>
      <button onClick={() => zoomOut()} className="text-white p-2">
        <ZoomOut />
      </button>
      <button onClick={() => fitView()} className="text-white p-2">
        <RotateCcw />
      </button>
    </div>
  );
};

export default CustomControls;
