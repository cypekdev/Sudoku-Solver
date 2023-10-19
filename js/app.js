import { solve_sudoku } from './solve-utils.js';
import {
  print_solved_sudoku,
  create_table,
  clear_errors
} from './render-utils.js'

const solve_button = document.getElementById('solve_button');
const reset_button = document.getElementById('reset_button');

function get_data(table) {

  const rows = table
    .firstChild
    .firstChild
    .children
  const sudoku_board = []

  for (const row_index in Array.from(rows)) {
    sudoku_board.push([])
    for (const cell of rows[row_index].children) {
      const input = cell.firstChild
      const input_number_value = +input.value
      sudoku_board[row_index].push(input_number_value)
    }
  }
  return sudoku_board;

}


solve_button.addEventListener('click', () => {

  clear_errors()

  const table_values  = get_data(table)
  const solved_sudoku = solve_sudoku(table_values)

  if (solved_sudoku) {
    return print_solved_sudoku(solved_sudoku);
  }

  console.log('błąd')

})

reset_button.addEventListener('click', create_table)
create_table()