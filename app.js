const solve_button = document.getElementById('solve_button');
const table        = document.getElementById('table');
const result       = document.getElementById('result');


const get_data = table => {

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

const print_solved_sudoku = solved_sudoku_table => {

  let table_html_element = '<table>'

  for (let row = 1; row <= 9; row++) {
    table_html_element += '<tr>'
  
    for (let cell = 1; cell <= 9; cell++) {
      table_html_element += '<td>'
      table_html_element += solved_sudoku_table[row - 1][cell - 1];
      table_html_element += '</td>'
    }

    table_html_element += '</tr>'
  } 

  table_html_element += '</table>'

  result.innerHTML = table_html_element

}

const solve_sudoku = board => {

  const n = board.length;

  if (solve(board, n)) return board;
  else                 return "Brak rozwiązania.";

}

const solve = (board, n) => {

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (is_valid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board, n)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;

}

const is_valid = (board, row, col, num) => {

  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }
  
  const start_row = Math.floor(row / 3) * 3;
  const start_col = Math.floor(col / 3) * 3;
  for (let i = start_row; i < start_row + 3; i++) {
    for (let j = start_col; j < start_col + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }
  
  return true;

}


solve_button.addEventListener('click', () => {

  const table_values  = get_data(table)
  const solved_sudoku = solve_sudoku(table_values)

  print_solved_sudoku(solved_sudoku)

})


reset_button.addEventListener('click', create_table)
create_table()