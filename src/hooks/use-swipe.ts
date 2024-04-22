import {RefObject, useEffect, useRef, useState} from "react";
import {Direction} from "../types/direction.ts";

export function useSwipe(container: RefObject<HTMLElement>) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const [touchDirection, setTouchDirection] = useState<Direction>('');

  const handleGesure = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        setTouchDirection('right');
      } else {
        setTouchDirection('left');
      }
    } else if (deltaY > 0) {
      setTouchDirection('down');
    } else {
      setTouchDirection('up');
    }
    setTimeout(() => {
      setTouchDirection('');
    });
  };

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.changedTouches?.[0]?.screenX;
    touchStartY.current = event.changedTouches?.[0]?.screenY;
  };

  const onTouchEnd = (event: TouchEvent) => {
    touchEndX.current = event.changedTouches?.[0]?.screenX;
    touchEndY.current = event.changedTouches?.[0]?.screenY;
    handleGesure();
  };

  useEffect(() => {
    container.current?.addEventListener('touchstart', onTouchStart);
    container.current?.addEventListener('touchend', onTouchEnd);

    return () => {
      container.current?.removeEventListener('touchstart', onTouchStart);
      container.current?.removeEventListener('touchend', onTouchEnd);
    }
  }, [container]);

  return {
    touchDirection,
  };
}
