import {RootState} from "../index.ts";

const selectGameState = (state: RootState) => state.game;

const selectBoard = (state: RootState) => selectGameState(state).board;
const selectColumns = (state: RootState) => selectGameState(state).board.length;
const selectRows = (state: RootState) => selectGameState(state).board?.[0].length ?? 0;
const selectScore = (state: RootState) => selectGameState(state).score;

export const GameSelectors = {
  selectBoard,
  selectColumns,
  selectRows,
  selectScore,
};
