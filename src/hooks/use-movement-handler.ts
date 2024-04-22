import {useBoardSlides} from "./use-board-slides.ts";
import {useCellsInitialization} from "./use-cells-initialization.ts";
import {Direction} from "../types/direction.ts";

export function useMovementHandler() {
  const { slideLeft, slideRight, slideUp, slideDown } = useBoardSlides();
  const { setValueInRandomPlace } = useCellsInitialization();

  const makeSlidesMove = (direction: Direction) => {
    if (direction === 'left') {
      slideLeft();
      setValueInRandomPlace();
    } else if (direction === 'right') {
      slideRight();
      setValueInRandomPlace();
    } else if (direction === 'up') {
      slideUp();
      setValueInRandomPlace();
    } else if (direction === 'down') {
      slideDown();
      setValueInRandomPlace();
    }
  }

  return {
    makeSlidesMove,
  }
}
