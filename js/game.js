// window.onload = () => {
  const randomTable = () => {
    const gameTable = document.querySelector(`.game-table`);
    // const random = Math.ceil(Math.random() * 10);
    // gameTable.innerHTML = `${random}`;
    const boardNumber = localStorage.getItem(`boardNumber`);
    //清除存储
    localStorage.removeItem(`boardNumber`);
    var table = `<table border='1' bordercolor='blue' width='200' height='10'>`;
    // table.innerHTML = `${boardNumber}`;
    for (var i = 1; i < 10; i++) {
      table+=`<tr>`;
      for(var j = 1;i<10;j++){
        table+=`<td>233</td>`;
      }
      table+=`</tr>`;
    }
    table+=`</table>`;
    gameTable.innerHTML = table;
  };
  randomTable();
// };
