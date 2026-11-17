const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  velocity.x = Math.max(1, velocity.x) * (Math.random() < 0.5 ? -1 : 1);
  velocity.y = Math.max(1, velocity.y) * (Math.random() < 0.5 ? -1 : 1);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;
  newimg.height = 106;

  let position = {
    x: Math.random() * Math.max(0, window.innerWidth - newimg.width),
    y: Math.random() * Math.max(0, window.innerHeight - newimg.height),
  };
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  const startButton = document.getElementById('startBtn');
  if (startButton) startButton.disabled = true;

  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.position.x = Math.max(0, Math.min(Math.max(0, window.innerWidth - item.newimg.width), item.position.x));
    item.position.y = Math.max(0, Math.min(Math.max(0, window.innerHeight - item.newimg.height), item.position.y));

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  const maxX = Math.max(0, window.innerWidth - item.newimg.width);
  const maxY = Math.max(0, window.innerHeight - item.newimg.height);

  item.position.x = Math.max(0, Math.min(maxX, item.position.x));
  item.position.y = Math.max(0, Math.min(maxY, item.position.y));

  if (item.position.x + item.velocity.x < 0 || item.position.x + item.velocity.x > maxX) {
    item.velocity.x = -item.velocity.x;
  }
  if (item.position.y + item.velocity.y < 0 || item.position.y + item.velocity.y > maxY) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
