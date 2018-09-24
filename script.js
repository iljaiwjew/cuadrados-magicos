const CONTAINER_SIZE_PX = 600;

const state = {
  squaresInRowCount: 5, 
};

const render = () => {
  const squareSize = CONTAINER_SIZE_PX / state.squaresInRowCount;
  const positions = generateSquaresPositions();
  const container = document.getElementById('squares-container');
  container.innerHTML = '';

  positions.forEach(({ x, y }) => {
    const square = document.createElement('div');
    
    square.className = 'square';
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.style.transform = `translate3d(${x * squareSize}px, ${y * squareSize}px, 0px)`;
    square.style['background-color'] = generateRandomColor();

    container.appendChild(square);
  });
}

const generateSquaresPositions = () => {
  const squearesCount = Math.pow(state.squaresInRowCount, 2);

  return (new Array(squearesCount))
    .fill(0)
    .map((v, i) => ({
      x: Math.floor(i / state.squaresInRowCount),
      y: i % state.squaresInRowCount,
    }));
}

const generateRandomColor = () => `#${(new Array(3))
  .fill(0)
  .map(() => getRandomInt(0, 256))
  .map(v => v.toString(16))
  .map(v => {
    if (v.length === 1) {
      const random = getRandomInt(0, 2);
      return random ? `0${v}` : `${v}0`;
    }

    return v;
  })
  .join('')}`

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const repaint = () => {
  const squares = document.querySelectorAll('.square');

  squares.forEach(square => {
    square.style['background-color'] = generateRandomColor();
  });
}

const reshake = () => {
  const squareSize = CONTAINER_SIZE_PX / state.squaresInRowCount;
  const positions = generateSquaresPositions();
  shakeArray(positions);

  const squares = document.querySelectorAll('.square');
  squares.forEach((square, i) => {
    const { x, y } = positions[i];
    square.style.transform = `translate3d(${x * squareSize}px, ${y * squareSize}px, 0px)`;
  });
}

const shakeArray = (arr) => {
  return arr.forEach((el, i) => {
    const indexToSwap = getRandomInt(0, arr.length);
    const elementToSwap = arr[indexToSwap];
    arr[indexToSwap] = el;
    arr[i] = elementToSwap;
  });
};

const repaintButton = document.getElementById('repaint-button')
repaintButton.addEventListener('click', repaint);

const reshakeButton = document.getElementById('shake-button')
reshakeButton.addEventListener('click', reshake);

render();