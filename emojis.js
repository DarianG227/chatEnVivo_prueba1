const botonEmoji = document.getElementById('botonEmoji');
const menuEmojis = document.getElementById('menuEmojis');
const inputMensaje = document.getElementById('mensajeEnviado');

// Mostrar/ocultar el menú
botonEmoji.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que el clic en el botón cierre el menú
    menuEmojis.classList.toggle('visible');
});

// Insertar emoji en el campo de texto
menuEmojis.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        inputMensaje.value += e.target.textContent;
        menuEmojis.classList.remove('visible'); // Cerrar el menú
    }
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', (e) => {
    // Verificar si el clic fue fuera del botón de emoji y del menú
    if (!menuEmojis.contains(e.target) && e.target !== botonEmoji) {
        menuEmojis.classList.remove('visible');
    }
});
