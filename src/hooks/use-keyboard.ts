import {RefObject, useEffect, useState} from "react";
import {Direction} from "../types/direction.ts";

export function useKeyboard(container: RefObject<HTMLElement>) {
  const [keyDirection, setKeyDirection] = useState<Direction>('');

  const handleArrowKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'ArrowLeft') {
      setKeyDirection('left');
    } else if (event.code === 'ArrowRight') {
      setKeyDirection('right');
    } else if (event.code === 'ArrowUp') {
      setKeyDirection('up');
    } else if (event.code === 'ArrowDown') {
      setKeyDirection('down');
    }
    setTimeout(() => {
      setKeyDirection('');
    });
  }

  useEffect(() => {
    container.current?.addEventListener('keyup', handleArrowKeyDown);

    return () => {
      container.current?.removeEventListener('keyup', handleArrowKeyDown);
    }
  }, []);

  return {
    keyDirection,
  }
}
