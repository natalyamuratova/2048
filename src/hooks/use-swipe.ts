import {RefObject, useEffect, useRef, useState} from "react";

export type TouchType = 'left' | 'right' | 'up' | 'down' | '';

export function useSwipe(container: RefObject<HTMLElement>) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const [touch, setTouch] = useState<TouchType>('');

  const handleGesure = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        setTouch('right');
      } else {
        setTouch('left');
      }
    } else if (deltaY > 0) {
      setTouch('down');
    } else {
      setTouch('up');
    }
    setTimeout(() => {
      setTouch('');
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
    container.current?.removeEventListener('touchstart', onTouchStart);
    container.current?.removeEventListener('touchend', onTouchEnd);

    return () => {
      container.current?.removeEventListener('touchstart', onTouchStart);
      container.current?.removeEventListener('touchend', onTouchEnd);
    }
  }, [container]);

  return {
    touch,
  };
}
