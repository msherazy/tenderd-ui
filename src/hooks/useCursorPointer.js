import { useCallback } from 'react';

/**
 * Hook to add cursor pointer style to elements with click handlers
 * Usage: const props = useCursorPointer(onClick);
 */
const useCursorPointer = (clickHandler) => {
  const enhancedClickHandler = useCallback(
    (event) => {
      if (clickHandler) {
        clickHandler(event);
      }
    },
    [clickHandler]
  );

  return {
    onClick: clickHandler ? enhancedClickHandler : undefined,
    style: clickHandler ? { cursor: 'pointer' } : undefined,
  };
};

export default useCursorPointer;
