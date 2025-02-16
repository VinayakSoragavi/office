import React, { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut, RotateCcw, Lock, Unlock } from 'lucide-react';

interface ControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
}

const Controls = ({ onZoomIn, onZoomOut, onReset}: ControlsProps) => {
  // const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      // setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      // setIsFullscreen(false);
    }
  };

  const handleLockToggle = () => {
    const newLockedState = !isLocked;
    setIsLocked(newLockedState);
    // onLockChange?.(newLockedState);
  };

  const buttonClassName = "p-2 bg-white rounded border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none transition-colors duration-200 bg-gradient-to-b from-[#3f3f46] to-[#1b1b1b] backdrop-blur-lg shadow-lg";

  return (
    <div className="absolute bottom-4 left-[295px] flex gap-2 z-50">
      <button
        onClick={handleFullscreen}
        className={buttonClassName}
        title="Toggle fullscreen"
      >
        <Maximize2 size={20} className="text-white" />
      </button>
      
      <button
        onClick={onZoomIn}
        className={buttonClassName}
        title="Zoom in"
        disabled={isLocked}
      >
        <ZoomIn size={20} className={`${isLocked ? 'text-gray-400' : 'text-white'}`} />
      </button>
      
      <button
        onClick={onZoomOut}
        className={buttonClassName}
        title="Zoom out"
        disabled={isLocked}
      >
        <ZoomOut size={20} className={`${isLocked ? 'text-gray-400' : 'text-white'}`} />
      </button>
      
      <button
        onClick={onReset}
        className={buttonClassName}
        title="Reset view"
        disabled={isLocked}
      >
        <RotateCcw size={20} className={`${isLocked ? 'text-gray-400' : 'text-white'}`} />
      </button>

      <button
        onClick={handleLockToggle}
        className={`${buttonClassName} ${isLocked ? 'bg-gray-100' : ''}`}
        title={isLocked ? "Unlock controls" : "Lock controls"}
      >
        {isLocked ? (
          <Lock size={20} className="text-gray-600" />
        ) : (
          <Unlock size={20} className="text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default Controls;