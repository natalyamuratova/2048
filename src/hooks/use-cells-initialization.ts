import {StateSetter} from "../types/utility-types.ts";

interface CellsInitializationComposableArgs {
    board: number[][];
    setBoard: StateSetter<number[][]>;
}

export interface CellsInitializationComposableReturn {
    setValueInRandomPlace: () => void;
}

export function useCellsInitialization({ board, setBoard }: CellsInitializationComposableArgs): CellsInitializationComposableReturn {
  const rows = board.length;
  const columns = board?.[0].length ?? 0;

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
        board[r][c] = getNewValue();
        setBoard([...board]);
        found = true;
      }
    }
  };

  return {
    setValueInRandomPlace,
  };
}
