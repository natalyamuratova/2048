import {StateSetter} from "../types/utility-types.ts";

interface GameLogicComposableArgs {
  board: number[][];
  setScore: StateSetter<number>;
}

export interface GameLogicComposableReturn {
  slideLeft: () => void;
  slideRight: () => void;
  slideUp: () => void;
  slideDown: () => void;
}

export function useBoardSlides({ board, setScore }: GameLogicComposableArgs): GameLogicComposableReturn {
  const rows = board.length;
  const columns = board?.[0].length ?? 0;

  const filterZero = (row: number[]) => row.filter((num) => num !== 0);

  const slide = (row: number[]) => {
    // [0, 2, 2, 2]
    let filteredRow = filterZero(row); // [2, 2, 2]
    for (let i = 0; i < filteredRow.length - 1; i += 1) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        filteredRow[i + 1] = 0;
        setScore((prevScore) => (prevScore + filteredRow[i]));
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
      let row = board[r]; // [0, 2, 2, 2]
      row = slide(row); // [0, 0, 2, 4];
      board[r] = row;
    }
  };

  const slideRight = () => {
    for (let r = 0; r < rows; r += 1) {
      let row = board[r]; // [0, 2, 2, 2]
      row.reverse(); // [2, 2, 2, 0]
      row = slide(row); // [4, 2, 0, 0]
      board[r] = row.reverse(); // [0, 0, 2, 4];
    }
  };

  const slideUp = () => {
    for (let c = 0; c < columns; c += 1) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      row = slide(row);
      for (let r = 0; r < rows; r += 1) {
        board[r][c] = row[r];
      }
    }
  };

  const slideDown = () => {
    for (let c = 0; c < columns; c += 1) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      row.reverse();
      row = slide(row);
      row.reverse();
      for (let r = 0; r < rows; r += 1) {
        board[r][c] = row[r];
      }
    }
  };

  return {
    slideLeft,
    slideRight,
    slideUp,
    slideDown,
  };
}
