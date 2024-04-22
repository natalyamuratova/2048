import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {Cell} from "../cell/cell.tsx";
import {useCellsInitialization} from "../../hooks/use-cells-initialization.ts";
import {useMovementHandler} from "../../hooks/use-movement-handler.ts";
import {useSwipe} from "../../hooks/use-swipe.ts";
import {useKeyboard} from "../../hooks/use-keyboard.ts";
import {GameSelectors} from "../../store/game/selectors.ts";
import './board.scss';

export const Board = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  const board = useSelector(GameSelectors.selectBoard);

  const {setValueInRandomPlace} = useCellsInitialization();
  const {makeSlidesMove} = useMovementHandler();

  const initGame = () => {
    setValueInRandomPlace();
    setValueInRandomPlace();
  };

  useEffect(() => {
    initGame();
  }, []);

  const {touchDirection} = useSwipe(boardRef);
  const {keyDirection} = useKeyboard();

  useEffect(() => {
    makeSlidesMove(keyDirection || touchDirection);
  }, [keyDirection, touchDirection]);

  return (
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
  )
}
