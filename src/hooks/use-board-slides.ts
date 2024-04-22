import {useDispatch, useSelector} from "react-redux";
import {increaseScore, updateBoardColumn, updateBoardRow} from "../store/game";
import {GameSelectors} from "../store/game/selectors.ts";

export function useBoardSlides() {
  const dispatch = useDispatch();

  const board = useSelector(GameSelectors.selectBoard);
  const rows = useSelector(GameSelectors.selectColumns);
  const columns = useSelector(GameSelectors.selectRows);

  const filterZero = (row: number[]) => row.filter((num) => num !== 0);

  const slide = (row: number[]) => {
    // [0, 2, 2, 2]
    let filteredRow = filterZero(row); // [2, 2, 2]
    for (let i = 0; i < filteredRow.length - 1; i += 1) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        filteredRow[i + 1] = 0;
        dispatch(increaseScore(filteredRow[i]));
      }
    } // [4, 0, 2]
    filteredRow = filterZero(filteredRow); // [4, 2]
    while (filteredRow.length < columns) {
      filteredRow.push(0);
    } // [4, 2, 0, 0]
    return filteredRow;
  };

  const slideLeft = () => {
    for (let r = 0; r < rows; r += 1) {
      let row = [...board[r]]; // [0, 2, 2, 2]
      row = slide(row); // [0, 0, 2, 4];
      dispatch(updateBoardRow({ row: r, value: row }));
    }
  };

  const slideRight = () => {
    for (let r = 0; r < rows; r += 1) {
      let row = [...board[r]]; // [0, 2, 2, 2]
      row.reverse(); // [2, 2, 2, 0]
      row = slide(row); // [4, 2, 0, 0]
      dispatch(updateBoardRow({ row: r, value: row.reverse() }));// [0, 0, 2, 4];
    }
  };

  const slideUp = () => {
    for (let c = 0; c < columns; c += 1) {
      let row = Array.from({ length: rows }, (_, i) => (board[i][c]));
      row = slide(row);
      dispatch(updateBoardColumn({ col: c, value: row }));
    }
  };

  const slideDown = () => {
    for (let c = 0; c < columns; c += 1) {
      let row = Array.from({ length: rows }, (_, i) => (board[i][c]));
      row.reverse();
      row = slide(row);
      dispatch(updateBoardColumn({ col: c, value: row.reverse() }));
    }
  };

  return {
    slideLeft,
    slideRight,
    slideUp,
    slideDown,
  };
}
