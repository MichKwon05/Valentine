let playerPosition = { x: 0, y: 0 }; // Posición inicial del jugador (estrella)
const mazeSize = 10; // Tamaño del laberinto (10x10)
const goalPosition = { x: mazeSize - 1, y: mazeSize - 1 }; // Meta en la esquina inferior derecha)

// Simular carga
window.onload = function () {
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('laberinto').classList.remove('d-none');
    generateMaze();
    placeStar();
    placeGoal();
    Swal.fire({
      title: '¡Bienvenido!',
      text: 'Usa las flechas del teclado para mover la estrella hasta la meta.',
      imageUrl: './assets/cinamoroll.png', 
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonText: 'Comenzar'
    });
  }, 3000); 
};

// Generar laberinto
function generateMaze() {
  const maze = document.querySelector('.maze');
  maze.innerHTML = ''; // Limpiar laberinto

  // Crear una matriz para representar el laberinto
  let mazeMatrix = new Array(mazeSize);
  for (let i = 0; i < mazeSize; i++) {
    mazeMatrix[i] = new Array(mazeSize).fill(0); // 0 representa un camino
  }

  // Asegurar que la posición inicial y la meta sean caminos
  mazeMatrix[playerPosition.y][playerPosition.x] = 0;
  mazeMatrix[goalPosition.y][goalPosition.x] = 0;

  // Generar paredes aleatorias, pero asegurando que haya un camino válido
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      if (i === playerPosition.y && j === playerPosition.x) continue; // No poner pared en la posición inicial
      if (i === goalPosition.y && j === goalPosition.x) continue; // No poner pared en la meta

      if (Math.random() < 0.3) { // 30% de probabilidad de ser un muro
        mazeMatrix[i][j] = 1; // 1 representa una pared
      }
    }
  }

  // Verificar si hay un camino válido usando BFS
  if (!hasValidPath(mazeMatrix, playerPosition, goalPosition)) {
    // Si no hay un camino válido, regenerar el laberinto
    generateMaze();
    return;
  }

  // Renderizar el laberinto
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      const cell = document.createElement('div');
      if (mazeMatrix[i][j] === 1) {
        cell.classList.add('wall');
      } else {
        cell.classList.add('path');
      }
      maze.appendChild(cell);
    }
  }
}

// Función para verificar si hay un camino válido usando BFS
function hasValidPath(mazeMatrix, start, goal) {
  const queue = [];
  const visited = new Array(mazeSize);
  for (let i = 0; i < mazeSize; i++) {
    visited[i] = new Array(mazeSize).fill(false);
  }

  queue.push(start);
  visited[start.y][start.x] = true;

  const directions = [
    { x: 0, y: -1 }, // Arriba
    { x: 1, y: 0 },  // Derecha
    { x: 0, y: 1 },  // Abajo
    { x: -1, y: 0 }  // Izquierda
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === goal.x && current.y === goal.y) {
      return true; // Se encontró un camino
    }

    for (const dir of directions) {
      const newX = current.x + dir.x;
      const newY = current.y + dir.y;

      if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize &&
          mazeMatrix[newY][newX] === 0 && !visited[newY][newX]) {
        visited[newY][newX] = true;
        queue.push({ x: newX, y: newY });
      }
    }
  }

  return false; // No se encontró un camino
}

// Colocar la estrella en la posición inicial
function placeStar() {
  const maze = document.querySelector('.maze');
  const initialCell = maze.children[playerPosition.y * mazeSize + playerPosition.x];
  initialCell.innerHTML = '⭐';
  initialCell.classList.add('star');
}

// Colocar la meta en la esquina inferior derecha
function placeGoal() {
  const maze = document.querySelector('.maze');
  const goalCell = maze.children[goalPosition.y * mazeSize + goalPosition.x];
  goalCell.innerHTML = '🏁'; // Emoji de bandera para la meta
  goalCell.classList.add('goal');
}

// Mover la estrella con las flechas del teclado
document.addEventListener('keydown', (event) => {
  const maze = document.querySelector('.maze');
  const currentCell = maze.children[playerPosition.y * mazeSize + playerPosition.x];

  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch (event.key) {
    case 'ArrowUp':
      newY = Math.max(playerPosition.y - 1, 0);
      break;
    case 'ArrowDown':
      newY = Math.min(playerPosition.y + 1, mazeSize - 1);
      break;
    case 'ArrowLeft':
      newX = Math.max(playerPosition.x - 1, 0);
      break;
    case 'ArrowRight':
      newX = Math.min(playerPosition.x + 1, mazeSize - 1);
      break;
  }

  const newCell = maze.children[newY * mazeSize + newX];

  // Verificar si la nueva posición es un muro
  if (!newCell.classList.contains('wall')) {
    // Limpiar la celda actual
    currentCell.innerHTML = '';
    currentCell.classList.remove('star');

    // Mover la estrella a la nueva posición
    newCell.innerHTML = '⭐';
    newCell.classList.add('star');

    // Actualizar la posición del jugador
    playerPosition.x = newX;
    playerPosition.y = newY;

    // Verificar si el jugador llegó a la meta
    if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
      Swal.fire({
        title: '¡Felicidades!',
        text: 'Has ganado 🎉',
        imageUrl: '../assets/lisa_beso.jpg', 
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true, 
        confirmButtonText: 'Jugar de nuevo', 
        cancelButtonText: 'Ir a la sorpresa', 
      }).then((result) => {
        if (result.isConfirmed) {
          resetGame();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = 'disco.html'; 
        }
      });
    }
  }
});

// Reiniciar el juego
function resetGame() {
  playerPosition = { x: 0, y: 0 }; // Reiniciar posición del jugador
  generateMaze();
  placeStar();
  placeGoal();
}