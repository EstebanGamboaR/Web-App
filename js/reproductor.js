/* Proyecto: Academia Ninja - Web App
   Archivo: reproductor.js
   Autor: Esteban Gamboa
   Descripción: Controla la música de fondo
*/

// Crear el objeto de audio (Asegúrate de tener el archivo en la carpeta audio)
const musicaNinja = new Audio('audio/naruto-theme.mp3');
musicaNinja.loop = true; // Que se repita infinitamente
musicaNinja.volume = 0.4; // Volumen al 40%

// Estado de la música
let estaReproduciendo = false;

function toggleMusic() {
    const boton = document.querySelector('.boton-musica');

    if (!estaReproduciendo) {
        // Intentar reproducir
        musicaNinja.play().then(() => {
            estaReproduciendo = true;
            boton.textContent = '⏸️'; // Icono de pausa
            boton.classList.add('activo'); // Para animación CSS
        }).catch(error => {
            console.log("Error al reproducir (posiblemente falta interacción del usuario):", error);
        });
    } else {
        // Pausar
        musicaNinja.pause();
        estaReproduciendo = false;
        boton.textContent = '🎵'; // Icono de música
        boton.classList.remove('activo');
    }
}

// Opcional: Intentar recuperar estado si navegamos entre páginas
// (Nota: En webs estáticas puras la música se reinicia al cambiar de HTML)
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Reproductor Ninja cargado');
});