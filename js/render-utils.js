const table        = document.getElementById('table');
const result       = document.getElementById('result');

export function create_table() {

  if (result.firstElementChild) 
    result.removeChild(result.firstElementChild)

  if (table.firstElementChild) 
    table.removeChild(table.firstElementChild)

  const table_element = document.createElement('table')
  const tbody_element = document.createElement('tbody')

  for (let row = 1; row <= 9; row++) {
    const tr_element = document.createElement('tr')
    
    for (let cell = 1; cell <= 9; cell++) {
      const td_element = document.createElement('td')
      const input_element = document.createElement('input')
      input_element.type = 'number'
      input_element.maxLength = 1
      td_element.appendChild(input_element)
      tr_element.appendChild(td_element)
    }
    tbody_element.appendChild(tr_element)
  }
  table_element.appendChild(tbody_element)

  table.appendChild(table_element)

}

export function clear_errors() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      table
        .firstElementChild
        .firstElementChild
        .children[row]
        .children[col]
        .classList
        .remove('error')
    }
  }
}

export function print_solved_sudoku(solved_sudoku_table) {

  const table_element = document.createElement('table')
  const tbody_element = document.createElement('tbody')

  if (result.firstElementChild) 
    result.removeChild(result.firstElementChild)

  solved_sudoku_table.forEach(row => {

    const tr_element = document.createElement('tr')

    row.forEach(cell => {
      const { value, is_entered } = cell
      const td_element = document.createElement('td')
      const span_element = document.createElement('span')
      span_element.classList.add('solved-digit')
      if (is_entered)
        span_element.classList.add('entered')
      span_element.textContent = value
      td_element.appendChild(span_element)
      tr_element.appendChild(td_element)
    });

    tbody_element.appendChild(tr_element)

  });

  table_element.appendChild(tbody_element)
  result.appendChild(table_element)

}

export function throw_new_error(row, cell) {

  console.log(`There is an error in ${row + 1} row and ${cell + 1} cell.`)

  const rows = table
    .firstElementChild
    .firstElementChild
    .children

  const row_element = rows[row]
  const cell_element = row_element.children[cell]
  cell_element.classList.add('error')

  if (result.firstElementChild) 
    result.removeChild(result.firstElementChild)

  return false;

}