/*
 * @Author: wynnxin 
 * @Date: 2018-05-17 18:57:06 
 * @Last Modified by: wynnxin
 * @Last Modified time: 2018-05-17 23:40:59
 */
window.onload = () => {
  //存输入的challenge Number
  let challenge = new Array();

  //输入框页面 => 小游戏页面
  const skip = () => {
    const father = document.querySelector(`.mini-game`);
    const confirmBtn = document.querySelector(`.confirm-btn`);
    confirmBtn.addEventListener(`click`, () => {
      var numInput = document.querySelector(`.boat-num`);

      if (numInput.value != "") {
        if (!isNaN(Number(numInput.value))) {
          father.classList.add(`fadeOutLeft`);

          //传值
          challenge.push(Number(numInput.value));

          //跳转
          setTimeout(() => {
            document.body.removeChild(father);
            const gameContainer = document.querySelector(`.container`);
            gameContainer.style.display = `block`;
            gameContainer.classList.add(`zoomInDown`);
          }, 500);
        } else {
          father.classList.add(`shake`);
          setTimeout(() => {
            father.classList.remove(`shake`);
          }, 500);
          // console.log(`只能是数字`);
        }
      } else {
        father.classList.add(`rubberBand`);
        setTimeout(() => {
          father.classList.remove(`rubberBand`);
        }, 500);
        // console.log(`不能为空`);
      }
    });
  };
  skip();

  //生成表格
  const render = () => {
    const table = document.querySelector(`.table`);
    for (let i = 0; i < 8; i++) {
      table.innerHTML += `<tr></tr>`;
      var tr = document.querySelector(`tr`);
    }
    Array.from(document.querySelectorAll(`tr`)).map(x => {
      for (let j = 0; j < 15; j++) {
        x.innerHTML += `<th class="animated" choose="false"></th>`;
      }
    });
  };
  render();

  //得分
  var point = 0;
  var pointDom = document.querySelector(`.point`);
  var tbody = Array.from(document.querySelectorAll(`tbody tr th`));


  //随机小船出现的动画
  const domAppear = (...arg) => {
    //随机色
    var randomColor = [
      "#7986cb",
      "#64ffda",
      "#90a4ae",
      "#b3e5fc",
      "#fff9c4",
      "#9575cd"
    ];
    var randomColorIndex = Math.ceil(Math.random() * 6) - 1;
    [...arg].forEach(element => {
      if (element != undefined) {
        element.style.backgroundColor = randomColor[randomColorIndex];
        element.classList.add(`jackInTheBox`);
        setTimeout(() => {
          element.classList.remove(`jackInTheBox`);
        }, 2000);
      }
    });
    return [...arg];
  };

  //完成挑战的动画
  const winAnimation = (...arg) => {
    [...arg].forEach(element => {
      if (element != undefined) {
        element.style.backgroundColor = `#f44336`;
        element.classList.add(`jackInTheBox`);
        setTimeout(() => {
          element.classList.remove(`jackInTheBox`);
        }, 500);
        setTimeout(() => {
          element.style.backgroundColor = `#fff`;
          element.classList.add(`rollOut`);
        }, 900);
      }
    });
  };

  //小船消失的动画
  const domDisapper = (...arg) => {
    return new Promise(resolve => {
      [...arg].forEach(element => {
        if (element != undefined) {
          element.classList.add(`rollOut`);
          element.style.backgroundColor = `#fff`;
          setTimeout(() => {
            element.classList.remove(`rollOut`);
          }, 500);
        }
      });
    });
  };

  //分数增加
  const countPlus = (Point = 0) => {
    point += Point;
    pointDom.classList.add(`rubberBand`);
    pointDom.innerHTML = `Points:${Number(point)}`;
    // console.log(`point is ${point}`);
    setTimeout(() => {
      pointDom.classList.remove(`rubberBand`);
    }, 600);

    //达到挑战分数的动画
    if (challenge[0] != undefined) {
      if (point >= challenge[0]) {
        setInterval(() => {
          let winRandom = Math.ceil(Math.random() * 120) - 1;
          let winDirection = Math.ceil(Math.random() * 3);
          if (winDirection == 1) {
            winAnimation(
              tbody[winRandom],
              tbody[winRandom + 16],
              tbody[winRandom - 16]
            );
          } else if (winDirection == 2) {
            winAnimation(
              tbody[winRandom],
              tbody[winRandom + 1],
              tbody[winRandom - 1]
            );
          } else if (winDirection == 3) {
            winAnimation(tbody[winRandom]);
          }
          point--;
          pointDom.innerHTML = `Points:${Number(point)}`;
          pointDom.classList.add(`rubberBand`);
          setTimeout(() => {
            pointDom.classList.remove(`rubberBand`);
          }, 900);
        }, 1500);
      }
    }
  };

  //所有的点击次数
  var clickNum = 0;
  //点击小船的次数
  var clickBoatNum = 0;
  //点击不是小船的次数
  var clickOther = 0;


  //计算Point的逻辑
  tbody.forEach(x =>
    x.addEventListener(`click`, e => {
      clickNum++;
      e.currentTarget.id = Math.random();
      //点击后设置选中
      e.currentTarget.setAttribute(`choose`, true);

      //记下点击元素的id
      var boatIdArr = new Array();
      for (let i in boatAll) {
        if (boatAll[i] != undefined) {
          boatIdArr.push(boatAll[i].id);
        }
      }

      //过滤空值的元素 => 因为点击后才有id 所以根据crr数组的长度和小船的长度比较,就可以判断是否全部被打中
      var crr = boatIdArr.filter(i => i != "");
      // console.log(crr);
      //判断点击的元素是否是小船数组里的元素
      if (boatAll.includes(e.currentTarget)) {
        if (randomLength == 1) {
          //长度是1的打中
          clickBoatNum = 1;
        } else {
          //没有全打中
          if (crr.length < randomLength) {
            // console.log(`打中一下下`);
            clickBoatNum = 4;
          } else {
            //全部打中
            clickBoatNum = 5;
          }
        }
      } else {
        //一次没打中
        console.log(`没打中`);
        if (crr.length == 0) {
          clickOther++;
          clickBoatNum = -1;
        }
      }

      /**
       * 打中的次数和小船的长度进行比较
       * 全部打中 Point+1
       *  小船长度>1&&打中次数小于长度 Point+0.5
       * 点击其他空格的次数 = 船的长度 Point-1
       */

      if (clickNum == randomLength) {
        if (clickBoatNum >= 0) {
          if (randomLength == 1) {
            countPlus(1);
          } else {
            if (clickBoatNum == 4) {
              countPlus(0.5);
            } else if (clickBoatNum == 5) {
              countPlus(1);
            }
          }
        } else {
          if (randomLength == 1) {
            countPlus(-1);
          } else {
            if (clickNum == randomLength) {
              countPlus(-1);
            }
          }
        }
      }

      //点击次数超过小船长度 => 生成新的随机小船
      if (clickNum >= randomLength) {
        boatAll.forEach(y => {
          // y.setAttribute(`choose`, false);
          domDisapper(y);
        });
        //小船的长度和小船的全部空格更新
        var result = randomBoat();
        randomLength = result.randomLength;
        boatAll = result.boatAll;

        //所有的点击次数重置
        clickNum = 0;
        //击中的次数重置
        clickBoatNum = 0;
        //点击其他空格的次数重置
        clickOther = 0;
      }
    })
  );

  //随机小船生成
  var randomBoat = function() {
    //随机点
    var randomDot = Math.ceil(Math.random() * 120) - 1;

    //随机方向 1 -> 横 2 -> 竖 3-> 斜
    var randomDirection = Math.ceil(Math.random() * 3);

    //完整小船的数组
    var boatAll = null;
    //随机长度
    var randomLength = Math.ceil(Math.random() * 4);

    // setInterval(function() {
    if (
      //去除边缘的计算
      (randomDot >= 16 && randomDot <= 28) ||
      (randomDot >= 31 && randomDot <= 43) ||
      (randomDot >= 46 && randomDot <= 58) ||
      (randomDot >= 61 && randomDot <= 73) ||
      (randomDot >= 76 && randomDot <= 88) ||
      (randomDot >= 91 && randomDot <= 103)
    ) {
      if (randomLength == 1) {
        boatAll = domAppear(tbody[randomDot]);
      } else if (randomLength == 2) {
        //方向分类
        switch (randomDirection) {
          case 1:
            boatAll = domAppear(tbody[randomDot], tbody[randomDot + 1]);
            break;
          case 2:
            boatAll = domAppear(tbody[randomDot], tbody[randomDot + 15]);
            break;
          case 3:
            boatAll = domAppear(tbody[randomDot], tbody[randomDot + 16]);
            break;
        }
      } else if (randomLength == 3) {
        if (randomDirection == 1 || randomDirection == 3) {
          boatAll = domAppear(
            tbody[randomDot],
            tbody[randomDot + 15],
            tbody[randomDot - 15]
          );
        } else {
          boatAll = domAppear(
            tbody[randomDot],
            tbody[randomDot + 16],
            tbody[randomDot - 16]
          );
        }
      } else if (randomLength == 4) {
        boatAll = domAppear(
          tbody[randomDot],
          tbody[randomDot + 1],
          tbody[randomDot + 2],
          tbody[randomDot + 3]
        );
      }
    } else if (
      (randomDot > 1 && randomDot < 15) ||
      (randomDot > 106 && randomDot < 120)
    ) {
      randomLength = 3;
      boatAll = domAppear(
        tbody[randomDot],
        tbody[randomDot + 1],
        tbody[randomDot - 1]
      );
    } else if (randomDot == 1) {
      randomLength = 4;
      boatAll = domAppear(
        tbody[randomDot],
        tbody[randomDot + 16],
        tbody[randomDot + 32],
        tbody[randomDot + 48]
      );
    } else if (randomDot == 15) {
      randomLength = 4;
      boatAll = domAppear(
        tbody[randomDot],
        tbody[randomDot + 14],
        tbody[randomDot + 28],
        tbody[randomDot + 42]
      );
    } else if (randomDot == 106) {
      randomLength = 4;
      boatAll = domAppear(
        tbody[randomDot],
        tbody[randomDot - 14],
        tbody[randomDot - 28],
        tbody[randomDot - 42]
      );
    } else if (randomDot == 120) {
      randomLength = 4;
      boatAll = domAppear(
        tbody[randomDot],
        tbody[randomDot - 16],
        tbody[randomDot - 32],
        tbody[randomDot - 48]
      );
    } else {
      randomLength = 1;
      boatAll = domAppear(tbody[randomDot]);
    }
    // }, 1000);
    return {
      randomLength: randomLength,
      boatAll: boatAll
    };
  };

  var { randomLength, boatAll } = randomBoat();

  // setInterval(randomBoat,2000);
};
