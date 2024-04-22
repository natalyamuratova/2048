import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  board: number[][];
  score: number;
}

const initialState: GameState = {
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  score: 0,
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    increaseScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    updateBoardCell: (state, action: PayloadAction<{ col: number; row: number; value: number }>) => {
      const { row, col, value } = action.payload;
      state.board[row][col] = value;
    },
    updateBoardRow: (state, action: PayloadAction<{ row: number; value: number[] }>) => {
      const { row, value } = action.payload;
      state.board[row] = value;
    },
    updateBoardColumn: (state, action: PayloadAction<{ col: number; value: number[] }>) => {
      const { col, value } = action.payload;
      const rows = state.board.length;
      for (let row = 0; row < rows; row += 1) {
        state.board[row][col] = value[row];
      }
    }
  },
});

export const { increaseScore, updateBoardCell, updateBoardRow, updateBoardColumn } = gameSlice.actions;

export default gameSlice.reducer;
