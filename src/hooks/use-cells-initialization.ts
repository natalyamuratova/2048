import {updateBoardCell} from "../store/game";
import {useDispatch, useSelector} from "react-redux";
import {GameSelectors} from "../store/game/selectors.ts";

export function useCellsInitialization() {
  const dispatch = useDispatch();

  const board = useSelector(GameSelectors.selectBoard);
  const rows = useSelector(GameSelectors.selectColumns);
  const columns = useSelector(GameSelectors.selectRows);

  const hasEmptyCell = () => board.find((row) => row.some((cellValue) => (cellValue === 0))) !== undefined;

  const getNewValue = () => {
    const degree = Math.ceil(Math.random() * 2);
    return 2 ** degree;
  };

  const setValueInRandomPlace = () => {
    if (!hasEmptyCell()) {
      return;
    }
    let found = false;
    while (!found) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * columns);
      if (board[r][c] === 0) {
        dispatch(updateBoardCell({ col: c, row: r, value: getNewValue() }));
        found = true;
      }
    }
  };

  return {
    setValueInRandomPlace,
  };
}
