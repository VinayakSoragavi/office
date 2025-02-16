import React from 'react';
import { MiniMap } from 'reactflow';

const CustomMiniMap = () => {
  return (
    <MiniMap
      nodeStrokeColor="#343439"  
      nodeColor="#ffffff"        
      nodeBorderRadius={12}      
      maskColor="rgba(0, 0, 0, 0.05)"  
      className="bg-white rounded-lg shadow-md absolute" 
      style={{
        right: 16,
        top: 16,
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
      }}
      zoomable
      pannable
      nodeClassName="custom-minimap-node"
    />
  );
};

export default CustomMiniMap;