const plane = document.getElementById('plane');
const changeColorButton = document.getElementById('change-color');
const speedInput = document.getElementById('speed');
const numberOfDotsInput = document.getElementById('dots-number');
const runButton = document.getElementById('run-button');

let points = [];
let currentColor = 'blue';
let refreshIntervalId = null;
let numberOfDots = 0;
let speed = 1;

plane.addEventListener('click', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  createDot(x,y,currentColor)
});

changeColorButton.addEventListener('click', () => {
  currentColor = currentColor === 'blue' ? 'red' : 'blue';
  changeColorButton.textContent = `Сменить цвет точек (${currentColor === 'blue' ? 'синий' : 'красный'})`;
});

function createDot(x,y,color) {
  var dot = {x,y,color}
  const point = document.createElement('div');
  point.className = 'point';
  point.style.backgroundColor = color;
  point.style.left = `${x}px`;
  point.style.top = `${y}px`;
  point.id = dotToPointId(dot)

  plane.appendChild(point);

  points.push(dot);
}

function drawLine(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const line = document.createElement('div');
  line.className = 'line';
  line.style.width = `${length}px`;
  line.style.height = '2px';
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.transform = `rotate(${angle}deg)`;

  plane.appendChild(line);
}


runButton.addEventListener('click', () => {
  const newSpeed = parseInt(speedInput.value, 10);
  if (!isNaN(newSpeed)) {
    if (newSpeed <= 0 || newSpeed > 100) {
      alert(`Введите коректное значение скорости (>0 и <= 100)`)
    } else {
      speed = newSpeed
    }
  }
  const newNumberOfDots = parseInt(numberOfDotsInput.value, 10);
  if (!isNaN(newNumberOfDots)) {
    if (newNumberOfDots <= 0) {
      alert(`Введите коректное значение количества новых точек (>0 и <= 100)`)
    } else {
      numberOfDots = newNumberOfDots
    }
  }
});

async function worker() {
  while (true) {
    await sleep();
    if (numberOfDots <= 0) {
      numberOfDots = 0
      continue
    }
    numberOfDots--
    let dots = [...points]
    if (dots.length == 0) {
      continue
    }
    const dot = dots[Math.floor(Math.random()*dots.length)];
    const point = getPoint(dot)
    point.style.width = "20px"
    point.style.height = "20px"
    await sleep();
    let itsClan = []
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].color == dot.color && dots[i] != dot) {
        itsClan.push(dots[i])
      }
    }
    if (itsClan.length == 0) {
      continue
    }
    const pair = itsClan[Math.floor(Math.random()*itsClan.length)];

    createDotBetween(dot,pair)
    point.style.width = "10px"
    point.style.height = "10px"
  }
}

function getPoint(dot) {
  return document.getElementById(dotToPointId(dot))
}

function dotToPointId(dot) {
  return `${dot.x}-${dot.y}-${dot.color}`
}

async function operationOnDot(dot,action) {
  const point = getPoint(dot)
  point.style.width = "20px"
  point.style.height = "20px"
  await sleep();
  action();
  point.style.width = "10px"
  point.style.height = "10px"
}

function sleep() {
  return new Promise(resolve => setTimeout(resolve, Math.floor(1000 / speed)))
}

function createDotBetween(dot1,dot2) {
  const dx = dot2.x - dot1.x
  const dy = dot2.y - dot1.y
  const alf = Math.random()
  const x = dot1.x + dx * alf
  const y = dot1.y + dy * alf

  createDot(x,y,dot1.color)
}

worker();