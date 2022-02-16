//take a wrapper
const wrapper = document.querySelector(".play > ul");

// grid setting 10 x 20
const gridRow = 10;
const gridColumn = 20;

// set
let score = 0;
let duration = 50;
let fallInterval;
let temItem;
let pastItem;

// getting next items
const movingItem = {
  type: "tree",
  direction: 0, // up arrow
  top: 0,
  left: 0, // 7 is the max
};
// blocks.tree[[direction[i,j],[i,j]]] => wrapper -> 20 lists -> 20 ul -> 10 li
//

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
  pastItem = { ...temItem };
  console.log(pastItem);
  //getting moving information and add it up
  temItem[way] += num;
  console.log(temItem);
  showBlocks();
}

document.addEventListener("keydown", (i) => {
  if (i.keyCode === 39) {
    move("left", 1);
  } else if (i.keyCode === 37) {
    move("left", -1);
  } else if (i.keyCode == 40) {
    move("top", 1);
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

function showBlocks() {
  //destructuring. Not to use temItem.type .. temItem.direction..
  const { type, direction, top, left } = temItem;

  const moveditems = document.querySelectorAll(".moved");
  //erase each previous one
  moveditems.forEach((i) => {
    i.classList.remove(type, "moved");
  });
  console.log(moveditems);

  // direction is nested array in type
  // block structure will be
  // type(object) -> dictionary (array) -> square x,y (array)
  // square index top -> y / left -> x
  const allx = [];
  const ally = [];
  blocks[type][direction].forEach((block) => {
    let x = block[0] + left; // take array index for coloring in each row
    let y = block[1] + top; // each y
    console.log(x, y);
    if (x > 9) {
      move("left", -1);
    } else if (x < 0) {
      move("left", 1);
    } else if (y > 19) {
      move("top", -1);
    }
    const fill = wrapper.childNodes[y].childNodes[0].childNodes[x];
    fill.classList.add(type, "moved");
    console.log(fill);

    // wrapper -> 20 lists -> 20 ul -> 10 li
    // childNodes[list y num] -> ul will 0 index each 20 list ->
    // console.log(y, x);

    // if (typeof pastItem != "undefined") {
    //   erase(x, y);
    // }

    //check
    allx.push(x);
    ally.push(y);
  });
  console.log(allx);
  console.log(ally);
  const checkRow = (row) => row > 9;
  const checkColumn = (column) => column > 20;
  if (allx.every(checkRow) && ally.every(checkColumn)) {
    console.log("row");
  }
  //   } else if (ally.every(checkColumn)) {
  //     console.log("what");
  //   }
}
