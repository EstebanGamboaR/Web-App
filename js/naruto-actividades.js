/* Proyecto: Academia Ninja - Web App
   Archivo: naruto-actividades.js
   Autor: Esteban Gamboa
*/

const actividadesBase = [
    { nombre: "Uzumaki Naruto", actividad: "Entrenamiento de Rasengan", precio: 5000, elemento: "viento" },
    { nombre: "Uchiha Sasuke", actividad: "Clases de Chidori", precio: 8000, elemento: "rayo" },
    { nombre: "Hatake Kakashi", actividad: "Estrategias Ninja", precio: 12000, elemento: "rayo" },
    { nombre: "Rock Lee", actividad: "Taijutsu Intensivo", precio: 4000, elemento: "tierra" }
];

function getEmojiElemento(elemento) {
    const emojis = { 'fuego': '🔥', 'agua': '💧', 'tierra': '🪨', 'viento': '🌪️', 'rayo': '⚡' };
    return emojis[elemento] || '⚡';
}

function getClasePrecio(precio) {
    if (precio < 5000) return 'precio-bajo';
    if (precio >= 5000 && precio <= 8000) return 'precio-medio';
    return 'precio-alto';
}

function cargarActividades() {
    const actividades = obtenerActividades();
    const tbody = document.getElementById('cuerpoTabla');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (actividades.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #666;">
                    <div style="font-size: 3em; margin-bottom: 20px;">🍥</div>
                    <h3>No hay misiones disponibles</h3>
                    <p>¡Registra tu primera misión ninja!</p>
                    <a href="agregar.html" style="display: inline-block; margin-top: 20px; padding: 10px 30px; background: #FFA500; color: white; text-decoration: none; border-radius: 20px; font-weight: bold;">+ AGREGAR MISIÓN</a>
                </td>
            </tr>`;
        actualizarEstadisticas([]);
        return;
    }

    actividades.forEach((actividad) => {
        const fila = document.createElement('tr');
        fila.className = getClasePrecio(actividad.precio);
        
        fila.innerHTML = `
            <td data-label="Ninja"><strong>🥷 ${actividad.nombre}</strong></td>
            <td data-label="Habilidad">📜 ${actividad.actividad}</td>
            <td data-label="Precio"><strong>₡${actividad.precio.toLocaleString()}</strong></td>
            <td data-label="Elemento">${getEmojiElemento(actividad.elemento)} <span style="text-transform: capitalize;">${actividad.elemento}</span></td>
        `;
        tbody.appendChild(fila);
    });

    actualizarEstadisticas(actividades);
}

function obtenerActividades() {
    try {
        const datos = localStorage.getItem('actividadesNinja');
        if (!datos) {
            localStorage.setItem('actividadesNinja', JSON.stringify(actividadesBase));
            return actividadesBase;
        }
        return JSON.parse(datos);
    } catch (error) {
        return actividadesBase;
    }
}

function actualizarEstadisticas(actividades) {
    if (actividades.length === 0) {
        document.getElementById('misionBarata').innerHTML = '<span class="ninja-nombre">N/A</span>';
        document.getElementById('misionCara').innerHTML = '<span class="ninja-nombre">N/A</span>';
        document.getElementById('promedioRyos').textContent = '₡0';
        document.getElementById('totalMisionesDisp').textContent = '0';
        return;
    }

    const masBarata = actividades.reduce((min, act) => act.precio < min.precio ? act : min);
    const masCara = actividades.reduce((max, act) => act.precio > max.precio ? act : max);
    const promedio = actividades.reduce((sum, act) => sum + act.precio, 0) / actividades.length;
    
    document.getElementById('misionBarata').innerHTML = `<span class="ninja-nombre">${masBarata.nombre}</span><span class="precio-valor">₡${masBarata.precio.toLocaleString()}</span>`;
    document.getElementById('misionCara').innerHTML = `<span class="ninja-nombre">${masCara.nombre}</span><span class="precio-valor">₡${masCara.precio.toLocaleString()}</span>`;
    document.getElementById('promedioRyos').textContent = `₡${Math.round(promedio).toLocaleString()}`;
    document.getElementById('totalMisionesDisp').textContent = actividades.length;
}

function crearHojasAleatorias() {
    const container = document.querySelector('.kunais-lluvia');
    if (!container) return;
    setInterval(() => {
        const hoja = document.createElement('div');
        hoja.className = 'kunai';
        hoja.textContent = '🍃';
        hoja.style.left = Math.random() * 100 + '%';
        hoja.style.animationDuration = (Math.random() * 5 + 5) + 's';
        container.appendChild(hoja);
        setTimeout(() => hoja.remove(), 10000);
    }, 3000);
}

function efectoByakugan() {
    const ojo = document.querySelector('.ojo-byakugan');
    if (!ojo) return;
    setInterval(() => {
        ojo.style.boxShadow = '0 0 30px rgba(63,81,181,0.8)';
        setTimeout(() => { ojo.style.boxShadow = '0 0 20px rgba(63,81,181,0.5)'; }, 500);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    cargarActividades();
    crearHojasAleatorias();
    efectoByakugan();
});

window.addEventListener('storage', function(e) {
    if (e.key === 'actividadesNinja') {
        cargarActividades();
    }
});