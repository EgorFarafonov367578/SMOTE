const plane = document.getElementById('plane');
let lastPoint = null;
const toggleColorButton = document.getElementById('toggle-color');
const refreshInput = document.getElementById('refresh-interval');
const setIntervalButton = document.getElementById('set-interval');

let points = [];
let currentColor = 'blue';
let refreshIntervalId = null;

plane.addEventListener('click', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(`x = ${x}, y = ${y} plx = ${plane.offsetX}`)

  const point = document.createElement('div');
  point.className = 'point';
  point.style.backgroundColor = currentColor;
  point.style.left = `${x}px`;
  point.style.top = `${y}px`;

  plane.appendChild(point);

  if (lastPoint) {
    drawLine(lastPoint.x, lastPoint.y, x, y);
  }

  lastPoint = { x, y };
  points.push({x,y});
});

toggleColorButton.addEventListener('click', () => {
  currentColor = currentColor === 'blue' ? 'red' : 'blue';
  toggleColorButton.textContent = `Сменить цвет точек (${currentColor === 'blue' ? 'синий' : 'красный'})`;
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


setIntervalButton.addEventListener('click', () => {
  const interval = parseInt(refreshInput.value, 10);

  if (!isNaN(interval) && interval > 0) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }

    refreshIntervalId = setInterval(() => {
      location.reload();
    }, interval * 1000);

    alert(`Интервал обновления страницы установлен: ${interval} секунд.`);
  } else {
    alert('Введите корректное значение интервала (число больше 0).');
  }
});

