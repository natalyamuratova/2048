import {useEffect, useRef, useState} from "react";
import {Cell} from "../cell/cell.tsx";
import {useCellsInitialization} from "../../hooks/use-cells-initialization.ts";
import {useBoardSlides} from "../../hooks/use-board-slides.ts";
import {useMovementHandler} from "../../hooks/use-movement-handler.ts";
import {useSwipe} from "../../hooks/use-swipe.ts";
import './board.scss';

export const Board = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);

  const {setValueInRandomPlace} = useCellsInitialization({board, setBoard});

  const {slideLeft, slideRight, slideUp, slideDown} = useBoardSlides({board, setScore});

  const {makeSlidesMove} = useMovementHandler({
    setValueInRandomPlace,
    slideLeft,
    slideRight,
    slideUp,
    slideDown
  });

  const initGame = () => {
    setValueInRandomPlace();
    setValueInRandomPlace();

    document.addEventListener('keyup', makeSlidesMove);
  };

  const destroyGame = () => {
    document.removeEventListener('keyup', makeSlidesMove);
  };

  useEffect(() => {
    initGame();

    return () => destroyGame();
  }, []);

  const {touch} = useSwipe(boardRef);
  useEffect(() => {
    makeSlidesMove(touch);
  }, [touch]);

  return (
    <>
      <h2>Счет: {score}</h2>
      <div className="board-container"
           ref={boardRef}
      >
        {
          board.map((row, rowIndex) => (
            row.map((cellValue, columnIndex) => (
              <Cell key={`${rowIndex}-${columnIndex}`}
                    value={cellValue}
              />
            ))
          ))
        }
      </div>
    </>
  )
}
