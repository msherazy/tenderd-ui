import React from 'react';
import useCursorPointer from '../../hooks/useCursorPointer';

const ClickableComponent = ({ onClick, children }) => {
  const pointerProps = useCursorPointer(onClick);
  
  return (
    <div {...pointerProps}>
      {children}
    </div>
  );
};

export default ClickableComponent;
