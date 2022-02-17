//take a wrapper
const wrapper = document.querySelector(".play > ul");

// grid setting 10 x 20
const gridRow = 10;
const gridColumn = 20;

// set
let score = 0;
let duration = 500;
let fallInterval = setInterval((i) => {
  move("top", 1);
}, 800);
let temItem;

// getting next items
const movingItem = {
  type: "bar",
  direction: 0, // up arrow
  top: 0,
  left: 0, // 7 is the max
};
// blocks.tree[[direction[i,j],[i,j]]] => wrapper -> 20 lists -> 20 ul -> 10 li

// all block types
const blocks = {
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [2, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [2, 1],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  bar: [
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
  ],
  square: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  leftBlock: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
  ],
  rightBlock: [
    [
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ],
  ],
};
init();

function init() {
  // save temporary item to move
  temItem = Object.assign({}, movingItem); //spread operator also works {...movingItems}
  makeGrid();
  showBlocks();
}

function makeGrid() {
  // make a grid
  for (let i = 0; i < gridColumn; i++) {
    //make 20 li, 20 ul to input wrapper
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < gridRow; j++) {
      // make 10 lists to inside second wrapper => row
      const liTwo = document.createElement("li");
      ul.appendChild(liTwo);
    }
    li.appendChild(ul);
    wrapper.appendChild(li);
  }
}

function move(way, num) {
  // pastItem = { ...temItem };
  // console.log(pastItem);
  //getting moving information and add it up
  temItem[way] += num;
  showBlocks(way);
}
function changeDirection(direc, num) {
  console.log(temItem[direc]);
  console.log("print direction");
  if (temItem[direc] < 3) {
    temItem[direc] += num;
  }
  // it will iterate the range 0-3 direction num
  else {
    temItem[direc] = 0;
  }
  console.log(temItem);
  showBlocks();
}
//create random blocks for whenever placed the block,also reset all.
function randomblocks() {
  const typeArr = ["tree", "bar", "square", "leftBlock", "rightBlock"];
  //make a random index
  const i = Math.floor(Math.random() * 5);
  temItem.type = typeArr[i];
  temItem.direction = 0;
  temItem.left = 0;
  temItem.top = 0;

  showBlocks();
}

document.addEventListener("keydown", (i) => {
  if (i.keyCode === 39) {
    move("left", 1);
  } else if (i.keyCode === 37) {
    move("left", -1);
  } else if (i.keyCode == 40) {
    move("top", 1);
  } else if (i.keyCode == 38) {
    changeDirection("direction", 1);
  }
});

// function erase(x, y) {
//   //fill it out past element as a white
//   let newX = x;
//   let newY = y;
//   let p_type = pastItem.type;
//   let p_direction = pastItem.direction;
//   let p_left = pastItem.left;
//   let p_top = pastItem.top;
//   blocks[p_type][p_direction].forEach((block) => {
//     const x = block[0] + p_left; // take array index for coloring in each row
//     const y = block[1] + p_top; // each y
//     console.log(x, y);
//     console.log("hey");
//     // wrapper -> 20 lists -> 20 ul -> 10 li
//     // childNodes[list y num] -> ul will 0 index each 20 list ->
//     const pastFill = wrapper.childNodes[y].childNodes[0].childNodes[x];
//     if (newX !== x && newY !== y && x != y) {
//       pastFill.classList.add("hidden");
//     }
//     console.log(pastFill);
//   });
// }

function showBlocks(way = "") {
  //destructuring. Not to use temItem.type .. temItem.direction..
  const { type, direction, top, left } = temItem;

  const moveditems = document.querySelectorAll(".moved");
  //erase each previous one
  moveditems.forEach((i) => {
    i.classList.remove(type, "moved");
  });

  // direction is nested array in type
  // block structure will be
  // type(object) -> dictionary (array) -> square x,y (array)
  // square index top -> y / left -> x

  blocks[type][direction].some((item) => {
    const x = item[0] + left; // take array index for coloring in each row
    const y = item[1] + top; // each y

    // check the items exists for unexpected x,y values ex) 0,1
    const point = wrapper.childNodes[y]
      ? wrapper.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const possible = checkValue(point);
    if (possible) {
      point.classList.add(type, "moved");
    } else {
      temItem = { ...movingItem };
      setTimeout(() => {
        showBlocks();
        if (way === "top") {
          stop();
          randomblocks();
        }
      }, 0);
      return true;
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;

  function stop() {
    const moveditems = document.querySelectorAll(".moved");
    moveditems.forEach((i) => {
      i.classList.remove("moved");
      i.classList.add("stack");
    });
  }

  function checkValue(point) {
    if (!point || point.classList.contains("stack")) {
      return false;
    }
    return true;
  }

  //IMPORTANT: FOREACH NEVER STOP UNTIL FINISIH THE WHOLE ITERATION.
  // some() and for loop ARE POSSIBLE TO STOP WHEN IT MEETS CERTIAN CONDITION.
  // wrapper -> 20 lists -> 20 ul -> 10 li
  // childNodes[list y num] -> ul will 0 index each 20 list ->
  // blocks[type][direction].forEach((block) => {
  //   let x = block[0] + left; // take array index for coloring in each row
  //   let y = block[1] + top; // each y
  //   console.log(x, y);
  //   if (x > 9) {
  //     move("left", -1);
  //   } else if (x < 0) {
  //     move("left", 1);
  //   } else if (y > 19) {
  //     move("top", -1);
  //     randomblocks();
  //   } else {
  //     const fill = wrapper.childNodes[y].childNodes[0].childNodes[x];
  //     fill.classList.add(type, "moved", "stack");
  //     console.log(fill);
  //   }
  // });
}

//check there is existing blocks.
//

// 1. save x,y set of array set
// 2. check the array has the same set
// erase fill with same x,y remove class (get fill element)
