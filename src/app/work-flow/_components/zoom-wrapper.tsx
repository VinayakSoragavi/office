import React, { Dispatch, SetStateAction } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import ZoomControls from './zoom-controls';
  

function ZoomWrapper({
    children,
    setScale,
    isDragging,
    handleTransform
  }: Readonly<{
    children: React.ReactNode;
    setScale: Dispatch<SetStateAction<number>>;
    isDragging:boolean;
    handleTransform: (ref: { state: { scale: number } }) => number
  }>) {
  return (
    <>
       <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          wheel={{
            step: 0.03, 
            smoothStep: 0.005,
            wheelDisabled: false,
          }}
          centerOnInit={true}
          limitToBounds={false}
          doubleClick={{ disabled: true }}
          pinch={{
            disabled: false,
            step: 1,
            excluded: [],
          }}
          disabled={isDragging}
          onZoom={(ref) => {
            const newScale = handleTransform(ref);
            setScale(newScale);
          }}
          onTransformed={handleTransform}
          smooth={true}
        //   smoothSensitivity={0.1} 
          zoomAnimation={{
            disabled: false,
            size: 0.05,
            animationType: "linear",
          }}
          alignmentAnimation={{ sizeY: 0, sizeX: 0 }}
          velocityAnimation={{
            sensitivity: 1,
            animationTime: 250,
            equalToMove: true,
          }}
        >
          {(utils) => (
            <>
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full"
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                {
                    children
                }
              </TransformComponent>
              <ZoomControls {...utils} />
            </>
          )}
        </TransformWrapper>
    </>
  )
}

export default ZoomWrapper