/*
 * @Author: wynnxin 
 * @Date: 2018-05-17 18:57:31 
 * @Last Modified by:   wynnxin 
 * @Last Modified time: 2018-05-17 18:57:31 
 */
const damagedOrSunk = (board = [], attacks = []) => {
  // ships.push(board.length);
  let ships = { 1: 0, 2: 0, 3: 0 },
    hits = { 1: 0, 2: 0, 3: 0 },
    sunk = 0,
    damaged = 0,
    notTouched = 0,
    points = 0;

  for (let x in board) {
    for (let y in board[x]) {
      //计算所有船只的空格数
      if (board[x][y] != 0) {
        //所有有数字的格子
        //   console.log(board[x][y]);

        //统计每个编号的个数 => 每条船的长度
        ships[board[x][y]] += 1;
      }
    }
  }
  console.log(ships);

  //统计攻击的次数和具体的点
  for (let x in attacks) {
    /* 计算每次attack点在board数组中的位置
     *  Tips:attacks数组是根据坐标表示的
     *  x坐标 = board.length - attacks[x][1];
     *  y坐标 = attacks[x][0] - 1;
     *  ship =board[x][y];
    */
    ship = board[board.length - attacks[x][1]][attacks[x][0] - 1];
    // console.log(ship);
    if (ship > 0) {
      //攻击的次数
      hits[ship] += 1;
    }
  }
  console.log(hits);

  //根据对应的1,2,3类船 => 攻击的次数和船的长度比较 => 计算point
  for (let x = 1; x <= 3; x++) {
    if (ships[x] != 0) {
      //击中让空格减少
      ships[x] = ships[x] - hits[x];
      if (ships[x] == 0) {
        points += 1;
        sunk += 1;
      } else {
        if (hits[x] == 0) {
          notTouched += 1;
          points -= 1;
        } else {
          damaged += 1;
          points += 0.5;
        }
      }
    }
  }
  return {
    sunk: sunk,
    damaged: damaged,
    notTouched: notTouched,
    points: points
  };
};

//   Game 1
var board = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];

var attacks = [[3, 1], [3, 2], [3, 3]];
// [3,1] => attack 1 => board[2][2]
// [3,2] => attack 1 => board[1][2]
// [3,3] => attack 1 => board[0][2]
var result = damagedOrSunk(board, attacks);

// console.log(result.sunk); //1
// console.log(result.damaged); //1
// console.log(result.notTouched); //0
// console.log(result.points); //1

  //Game 2
  var board1 = [[3, 0, 1], [3, 0, 1], [0, 2, 1], [0, 2, 0]];

  var attacks1 = [[2, 1], [2, 2], [3, 2], [3, 3]];
  var result1 = damagedOrSunk(board1, attacks1);

//   console.log(result1.sunk); //1     0
//   console.log(result1.damaged); //1   1
//   console.log(result1.notTouched); //1  2
//   console.log(result1.points); //0.5  -1.5



// var test = {
//   1: 0,
//   2: 0,
//   3: 0,
//   4: 0
// };

// console.log(test[1]); //0
// console.log(test[2]); //0
// console.log(test[3]); //0
// console.log(test[4]); //0
