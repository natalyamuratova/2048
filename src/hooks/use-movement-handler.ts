import {GameLogicComposableReturn} from "./use-board-slides.ts";
import {CellsInitializationComposableReturn} from "./use-cells-initialization.ts";
import {TouchType} from "./use-swipe.ts";

type MovementHandlerComposableArgs = GameLogicComposableReturn & CellsInitializationComposableReturn;

export function useMovementHandler({ slideLeft, slideRight, slideUp, slideDown, setValueInRandomPlace}: MovementHandlerComposableArgs) {
  const makeSlidesMove = (event: KeyboardEvent | TouchType) => {
    if (event === 'left' || (event as KeyboardEvent)?.code === 'ArrowLeft') {
      slideLeft();
      setValueInRandomPlace();
    } else if (event === 'right' || (event as KeyboardEvent)?.code === 'ArrowRight') {
      slideRight();
      setValueInRandomPlace();
    } else if (event === 'up' || (event as KeyboardEvent)?.code === 'ArrowUp') {
      slideUp();
      setValueInRandomPlace();
    } else if (event === 'down' || (event as KeyboardEvent)?.code === 'ArrowDown') {
      slideDown();
      setValueInRandomPlace();
    }
  }

  return {
    makeSlidesMove,
  }
}
