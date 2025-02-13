document.getElementById("si").addEventListener("click", function() {
    Swal.fire({
        title: '¡Abachuuuuuu! ❤️',
        text: 'Te quiero amor',
        confirmButtonText: 'Se aprecia',
        background: '#ffebf1',
        color: '#ff1493',
        confirmButtonColor: '#ff69b4'
    });
});


document.getElementById("no").addEventListener("click", function() {
    Swal.fire({
        title: 'Respuesta equivocada',
        icon: 'error',
        confirmButtonText: 'Intenta de nuevo',
        background: '#ffebf1',
        color: '#ff1493',
        confirmButtonColor: '#ff69b4'
    });
});
