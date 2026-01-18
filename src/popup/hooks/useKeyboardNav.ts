import { useEffect, useCallback } from 'react';

interface UseKeyboardNavOptions {
  itemCount: number;
  selectedIndex: number;
  onSelectedIndexChange: (index: number) => void;
  onEnter: () => void;
  onEnterEmpty?: () => void;
  onEscape: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  itemCount,
  selectedIndex,
  onSelectedIndexChange,
  onEnter,
  onEnterEmpty,
  onEscape,
  enabled = true,
}: UseKeyboardNavOptions): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onEscape();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onSelectedIndexChange(selectedIndex < itemCount - 1 ? selectedIndex + 1 : selectedIndex);
          break;
        case 'ArrowUp':
          e.preventDefault();
          onSelectedIndexChange(selectedIndex > 0 ? selectedIndex - 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          if (itemCount > 0) {
            onEnter();
          } else if (onEnterEmpty) {
            onEnterEmpty();
          }
          break;
      }
    },
    [itemCount, selectedIndex, onSelectedIndexChange, onEnter, onEnterEmpty, onEscape]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}
