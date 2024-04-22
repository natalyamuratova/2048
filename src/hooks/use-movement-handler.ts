import {useBoardSlides} from "./use-board-slides.ts";
import {useCellsInitialization} from "./use-cells-initialization.ts";
import {Direction} from "../types/direction.ts";
import {useEffect, useState} from "react";

export function useMovementHandler() {
  const { slideLeft, slideRight, slideUp, slideDown } = useBoardSlides();
  const { setValueInRandomPlace } = useCellsInitialization();

  const [slideChanged, setSlideChanged] = useState(false);

  const makeSlidesMove = (direction: Direction) => {
    if (direction === 'left') {
      slideLeft();
    } else if (direction === 'right') {
      slideRight();
    } else if (direction === 'up') {
      slideUp();
    } else if (direction === 'down') {
      slideDown();
    }
    setSlideChanged((prev) => !prev);
  }

  useEffect(() => {
    setValueInRandomPlace();
  }, [slideChanged]);

  return {
    makeSlidesMove,
  }
}
