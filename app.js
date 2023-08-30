const solve_button = document.getElementById('solve_button');
const reset_button = document.getElementById('reset_button');
const table        = document.getElementById('table');
const result       = document.getElementById('result');


const create_table = ()  => {

  result.textContent = ''

  let table_html_element = '<table><tbody>'
  
  for (let row = 1; row <= 9; row++) {
    table_html_element += '<tr>'
    for (let cell = 1; cell <= 9; cell++) {
      table_html_element += '<td>'
      table_html_element += '<input type="text" maxlength="1">'
      table_html_element += '</td>'
    }
    table_html_element += '</tr>'
  } 
  table_html_element += '</tbody></table>'
  
  table.innerHTML = table_html_element
}


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
      const { value, is_entered } = solved_sudoku_table[row - 1][cell - 1]
      table_html_element += '<td>'
      is_entered && (table_html_element += '<b>')
      table_html_element += value
      is_entered && (table_html_element += '</b>')
      table_html_element += '</td>'
    }
    table_html_element += '</tr>'
  } 

  table_html_element += '</table>'

  result.innerHTML = table_html_element

}

const solve_sudoku = table_values => {

  const table_data = table_values.map(row => row.map(value => {
    return {
      value: value,
      is_entered: !!value
    }
  }))

  return solve(table_data);

}

const solve = (table_data) => {

  let board = [ ...table_data ];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === 0) {
        for (let num = 1; num <= 9; num++) {
          if (is_valid(board, row, col, num)) {
            board[row][col].value = num;
            if (solve(board))
              return board;
            board[row][col].value = 0;
          }
        }
        return false;
      }
    }
  }
  return board;

}

const is_valid = (board, row, col, num) => {

  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === num || board[i][col].value === num) {
      return false;
    }
  }
  
  const start_row = Math.floor(row / 3) * 3;
  const start_col = Math.floor(col / 3) * 3;
  for (let i = start_row; i < start_row + 3; i++) {
    for (let j = start_col; j < start_col + 3; j++) {
      if (board[i][j].value === num) {
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