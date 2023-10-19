const table        = document.getElementById('table');
const result       = document.getElementById('result');

export function create_table() {

  result.textContent = ''

  let table_html_element = '<table><tbody>'
  for (let row = 1; row <= 9; row++) {
    table_html_element += '<tr>'
    for (let cell = 1; cell <= 9; cell++) {
      table_html_element +=
        '<td>' +
        '<input type="text" maxlength="1">' +
        '</td>'
    }
    table_html_element += '</tr>'
  }
  table_html_element += '</tbody></table>'

  table.innerHTML = table_html_element

}

export function clear_errors() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      table.
        firstChild.
        firstChild.
        children[row].
        children[col].
        classList.
        remove('error')
    }
  }
}

export function print_solved_sudoku(solved_sudoku_table) {

  let table_html_element = '<table>'

  solved_sudoku_table.forEach(row => {

    table_html_element += '<tr>'

    row.forEach(cell => {
      const { value, is_entered } = cell

      table_html_element += '<td>'
      is_entered && (table_html_element += '<b>')
      table_html_element += value
      is_entered && (table_html_element += '</b>')
      table_html_element += '</td>'
    });

    table_html_element += '</tr>'

  });
  table_html_element += '</table>'

  result.innerHTML = table_html_element

}

export function throw_new_error(row, cell) {

  console.log(`There is an error in ${row + 1} row and ${cell + 1} cell.`)

  const rows = table
    .firstChild
    .firstChild
    .children

  const row_element = rows[row]
  const cell_element = row_element.children[cell]
  cell_element.classList.add('error')

  if (result.firstElementChild) 
    result.removeChild(result.firstElementChild)

  return false;

}