/* Proyecto: Academia Ninja - Web App
   Archivo: naruto-agregar.js
   Autor: Esteban Gamboa
*/

let formulario, nombreInput, actividadInput, precioInput, mensajeConfirmacion;

document.addEventListener('DOMContentLoaded', function() {
    formulario = document.getElementById('formularioMision');
    nombreInput = document.getElementById('nombreNinja');
    actividadInput = document.getElementById('actividadNinja');
    precioInput = document.getElementById('precioMision');
    mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    
    if (formulario) {
        formulario.addEventListener('submit', procesarFormulario);
    }
});

function procesarFormulario(e) {
    e.preventDefault();
    
    const nombre = nombreInput.value.trim();
    const actividad = actividadInput.value.trim();
    const precio = parseInt(precioInput.value);
    const elementoSeleccionado = document.querySelector('input[name="elemento"]:checked');
    
    if (!elementoSeleccionado) {
        alert('⚠️ Por favor selecciona un elemento');
        return;
    }
    
    const elemento = elementoSeleccionado.value;
    let errores = [];
    
    if (nombre.length === 0) {
        errores.push('El nombre no puede estar vacío');
        nombreInput.style.borderColor = '#c62828';
    } else {
        nombreInput.style.borderColor = '#4caf50';
    }
    
    if (actividad.length === 0) {
        errores.push('La actividad no puede estar vacía');
        actividadInput.style.borderColor = '#c62828';
    } else {
        actividadInput.style.borderColor = '#4caf50';
    }
    
    if (isNaN(precio) || precio < 3000 || precio > 15000) {
        errores.push('El precio debe estar entre ₡3,000 y ₡15,000');
        precioInput.style.borderColor = '#c62828';
    } else {
        precioInput.style.borderColor = '#4caf50';
    }
    
    if (errores.length > 0) {
        alert('⚠️ ERRORES DE VALIDACIÓN:\n\n' + errores.join('\n'));
        return;
    }
    
    const nuevaActividad = { nombre, actividad, precio, elemento };
    
    if (guardarActividad(nuevaActividad)) {
        mostrarMensajeConfirmacion(nuevaActividad);
        setTimeout(() => { limpiarFormulario(); }, 3000);
    }
}

function guardarActividad(actividad) {
    try {
        let actividades = JSON.parse(localStorage.getItem('actividadesNinja')) || [];
        actividades.push(actividad);
        localStorage.setItem('actividadesNinja', JSON.stringify(actividades));
        return true;
    } catch (error) {
        console.error('Error al guardar:', error);
        return false;
    }
}

function mostrarMensajeConfirmacion(actividad) {
    if (!mensajeConfirmacion) return;
    
    const detalles = document.getElementById('detallesMision');
    if (detalles) {
        detalles.innerHTML = `
            <strong>👤 Estudiante:</strong> ${actividad.nombre}<br>
            <strong>📚 Actividad:</strong> ${actividad.actividad}<br>
            <strong>💰 Costo:</strong> ₡${actividad.precio.toLocaleString()}<br>
            <strong>🎯 Elemento:</strong> ${capitalizar(actividad.elemento)}
        `;
    }
    
    mensajeConfirmacion.classList.remove('oculto');
    mensajeConfirmacion.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function limpiarFormulario() {
    if (!formulario) return;
    formulario.reset();
    nombreInput.style.borderColor = '';
    actividadInput.style.borderColor = '';
    precioInput.style.borderColor = '';
    if (mensajeConfirmacion) mensajeConfirmacion.classList.add('oculto');
    nombreInput.focus();
}

function capitalizar(texto) {
    return texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : '';
}