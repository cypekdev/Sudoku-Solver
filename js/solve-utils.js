import { throw_new_error } from "./render-utils.js";

export function solve_sudoku(table_values) {

  const table_data = table_values.map(row => row.map(value => {
    return {
      value: value,
      is_entered: !!value
    }
  }))

  let board = [ ...table_data ];

  let table_is_valid = true;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].is_entered) {
        if (
          !is_valid(
            board,
            row,
            col,
            board[row][col].value
          )
        ) {
          throw_new_error(row, col)
          table_is_valid = false;
        }
      }
    }
  }

  return table_is_valid && solve(board);

}

function solve(board) {

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (!board[row][col].value) {
        for (let num = 1; num <= 9; num++) {
          if (is_valid(board, row, col, num)) {
            board[row][col].value = num
            if (solve(board)) return board;
            board[row][col].value = 0
          }
        }
        return false;
      }
    }
  }
  return board;

}


function is_valid(board, row, col, num) {

  for (let i = 0; i < 9; i++) {
    if (
      i !== col && board[row][i].value === num || 
      i !== row && board[i][col].value === num
    ) return false;
  }
  
  const start_row = Math.floor(row / 3) * 3;
  const start_col = Math.floor(col / 3) * 3;
  for (let i = start_row; i < start_row + 3; i++) {
    for (let j = start_col; j < start_col + 3; j++) {
      if (
        (i !== row || j !== col) &&
        board[i][j].value === num
      ) return false;
    }
  }
  
  return true;

}