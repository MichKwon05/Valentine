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
      icon: 'info',
      confirmButtonText: 'Comenzar'
    });
  }, 3500); 
};


const audioPlayer = document.querySelector('.audio-player');
    const outerDisc = document.querySelector('.outer');

    audioPlayer.addEventListener('play', () => {
      outerDisc.style.animation = 'rotate 2s linear infinite';
    });

    audioPlayer.addEventListener('pause', () => {
      outerDisc.style.animation = 'none';
    });