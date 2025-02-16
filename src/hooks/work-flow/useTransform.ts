import { useState, useCallback, useRef } from 'react';

export const useTransform = () => {
  const [transform, setTransform] = useState({
    scale: 1,
    positionX: 0,
    positionY: 0
  });

  const transformRef = useRef(transform);

  const handleTransform = useCallback((ref) => {
    const { scale, positionX, positionY } = ref.state;
    const newTransform = { 
      scale: parseFloat(scale.toFixed(2)), 
      positionX, 
      positionY 
    };
    transformRef.current = newTransform;
    setTransform(newTransform);
    return scale;
  }, []);

  return { 
    transform: transformRef.current, 
    handleTransform,
    setTransform 
  };
};
