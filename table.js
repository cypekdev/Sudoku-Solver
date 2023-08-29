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

reset_button.addEventListener('click', create_table)


create_table()