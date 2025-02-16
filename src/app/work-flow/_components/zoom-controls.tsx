import { Maximize, ZoomIn, ZoomOut } from 'lucide-react'
import React from 'react'

interface ZoomControlsProps {
  zoomIn: (scale: number) => void;
  zoomOut: (scale: number) => void;
  resetTransform: () => void;
}

function ZoomControls({ zoomIn, zoomOut, resetTransform }: ZoomControlsProps) {
  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2">
      <button
        onClick={() => zoomIn(0.2)}
        className="bg-[#242424] p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button
        onClick={() => zoomOut(0.2)}
        className="bg-[#242424] p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      <button
        onClick={resetTransform}
        className="bg-[#242424] p-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
        title="Reset Zoom"
      >
        <Maximize className="w-5 h-5" />
      </button>
    </div>
  )
}

export default ZoomControls