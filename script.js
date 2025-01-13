const plane = document.getElementById('plane');
const changeColorButton = document.getElementById('change-color');
const speedInput = document.getElementById('speed');
const numberOfDotsInput = document.getElementById('dots-number');
const runButton = document.getElementById('run-button');

let points = [];
let currentColor = 'blue';
let refreshIntervalId = null;
let numberOfDots = 1;
let speed = 1;

plane.addEventListener('click', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  
  const point = document.createElement('div');
  point.className = 'point';
  point.style.backgroundColor = currentColor;
  point.style.left = `${x}px`;
  point.style.top = `${y}px`;

  plane.appendChild(point);

  points.push({x,y,color : point.style.backgroundColor});
});

changeColorButton.addEventListener('click', () => {
  currentColor = currentColor === 'blue' ? 'red' : 'blue';
  changeColorButton.textContent = `Сменить цвет точек (${currentColor === 'blue' ? 'синий' : 'красный'})`;
});

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
    if (numberOfDots <= 0) {
      numberOfDots = 0
      await new Promise(resolve => setTimeout(resolve, Math.floor(1000 / speed)));
      continue
    }
    numberOfDots--
    const x = Math.floor(Math.random() * plane.offsetWidth);
    const y = Math.floor(Math.random() * plane.offsetHeight);

    const point = document.createElement('div');
    point.className = 'point';
    point.style.backgroundColor = currentColor;
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;

    plane.appendChild(point);

    await new Promise(resolve => setTimeout(resolve, Math.floor(1000 / speed)));
  }
}

worker();