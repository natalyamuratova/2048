import {useEffect, useState} from "react";
import {Direction} from "../types/direction.ts";

export function useKeyboard() {
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
    document.addEventListener('keyup', handleArrowKeyDown);

    return () => {
      document.removeEventListener('keyup', handleArrowKeyDown);
    }
  }, []);

  return {
    keyDirection,
  }
}
