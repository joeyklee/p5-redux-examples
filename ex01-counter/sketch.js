let store = Redux.createStore(dots);

let addBtn;
let removeBtn;

function setup() {
  createCanvas(400, 400);

  store.subscribe(refreshBackground)
  store.subscribe(renderNumber)
  store.subscribe(renderSquare)


  addBtn = createButton('add');
  removeBtn = createButton('remove');

  addBtn.mousePressed(addDot);
  removeBtn.mousePressed(removeDot);
  noLoop();
}

function draw() {

  refreshBackground();
  renderNumber();
  renderSquare();
}

function refreshBackground() {
  background(220);
}

function renderNumber() {
  let t = store.getState().toString()
  text(t, 20, 20);
}

function renderSquare() {
  let t = store.getState()
  let boxWidth = 40;
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < t; i++) {

    if (x * boxWidth > width - boxWidth * 2) {
      y++
      x = 0
    }

    square(x * boxWidth + boxWidth / 2, y * boxWidth + boxWidth, boxWidth);
    x++;
  }

}

function addDot(e) {
  store.dispatch({
    type: 'ADD'
  })
}

function removeDot(e) {
  store.dispatch({
    type: 'REMOVE'
  })
}

function dots(state, action) {

  if (typeof state === 'undefined') {
    return 0
  }

  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'REMOVE':
      return state - 1
    default:
      return state
  }
}