let store = Redux.createStore(dots);

let addBtn;
let removeBtn;
let sortBrightnessBtn;
let sortHueBtn;
let sortSaturationBtn;

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(400, 400);

  store.subscribe(refreshBackground)
  store.subscribe(renderNumber)
  store.subscribe(renderSquare)


  addBtn = createButton('add');
  removeBtn = createButton('remove');
  sortBrightnessBtn = createButton('sortBrightness');
  sortHueBtn = createButton('sortHue');
  sortSaturationBtn = createButton('sortSaturation');

  addBtn.mousePressed(addDot);
  removeBtn.mousePressed(removeDot);
  sortBrightnessBtn.mousePressed(sortBrightness);
  sortHueBtn.mousePressed(sortHue);
  sortSaturationBtn.mousePressed(sortSaturation);
  
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
  let t = store.getState().length
  text(t, 20, 20);
}

function renderSquare() {
  let t = store.getState().length
  let boxWidth = 40;
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < t; i++) {

    if (x * boxWidth > width - boxWidth * 2) {
      y++
      x = 0
    }
    fill(store.getState()[i].color)
    stroke(0,0,100);
    square(x * boxWidth + boxWidth / 2, y * boxWidth + boxWidth, boxWidth);
    x++;
  }

}

function addDot(e) {
  store.dispatch({
    type: 'ADD',
    color: color(int(random(0, 300)),int(random(80,100)),int(random(80, 100)) )
  })
}

function removeDot(e) {
  store.dispatch({
    type: 'REMOVE',
  })
}

function sortBrightness(e) {
  store.dispatch({
    type: 'SORT_BRIGHTNESS',
  })
}

function sortHue(e) {
  store.dispatch({
    type: 'SORT_HUE',
  })
}

function sortSaturation(e) {
  store.dispatch({
    type: 'SORT_SATURATION',
  })
}


function dots(state, action) {

  if (typeof state === 'undefined') {
    return [];
  }
  

  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: state.length,
          color: action.color,
        }
      ]
    case 'SORT_BRIGHTNESS':
      return state.sort((a, b) => (a.color.levels[2] > b.color.levels[2]) ? 1 : -1)
    case 'SORT_HUE':
      return state.sort((a, b) => (a.color.levels[0] > b.color.levels[0]) ? 1 : -1)
    case 'SORT_SATURATION':
      return state.sort((a, b) => (a.color.levels[1] > b.color.levels[1]) ? 1 : -1)
    case 'REMOVE':
      return state.splice(1,)
    default:
      return state
  }
}


