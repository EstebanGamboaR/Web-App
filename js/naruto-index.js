// ========================================
// NARUTO-INDEX.JS - PÁGINA PRINCIPAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍥 Cargando Academia Ninja...');
    cargarEstadisticasIndex();
    iniciarEfectosVisuales();
});

// 🔥 CARGAR ESTADÍSTICAS EN INDEX
function cargarEstadisticasIndex() {
    const actividades = obtenerActividades();
    
    // Contar ninjas activos (ninjas únicos)
    const ninjasActivos = contarNinjasUnicos(actividades);
    
    // Contar misiones disponibles (total de actividades)
    const misionesDisponibles = actividades.length;
    
    // Actualizar en el DOM
    actualizarStatsIndex(ninjasActivos, misionesDisponibles);
    
    console.log(`✅ Ninjas Activos: ${ninjasActivos}`);
    console.log(`✅ Misiones Disponibles: ${misionesDisponibles}`);
}

// Contar ninjas únicos
function contarNinjasUnicos(actividades) {
    if (actividades.length === 0) return 0;
    
    const ninjasUnicos = new Set();
    actividades.forEach(act => {
        ninjasUnicos.add(act.nombre);
    });
    
    return ninjasUnicos.size;
}

// Obtener actividades del localStorage
function obtenerActividades() {
    try {
        const datos = localStorage.getItem('actividadesNinja');
        if (!datos) return [];
        return JSON.parse(datos);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Actualizar stats en el DOM
function actualizarStatsIndex(ninjas, misiones) {
    // Buscar los elementos de stats
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length >= 2) {
        // Primera tarjeta: Ninjas Activos
        const numeroNinjas = statCards[0].querySelector('.stat-numero');
        if (numeroNinjas) {
            numeroNinjas.textContent = ninjas;
        }
        
        // Segunda tarjeta: Misiones Disponibles
        const numeroMisiones = statCards[1].querySelector('.stat-numero');
        if (numeroMisiones) {
            numeroMisiones.textContent = misiones;
        }
    }
}

// Efectos visuales
function iniciarEfectosVisuales() {
    // Hojas cayendo
    crearHojasCayendo();
}

function crearHojasCayendo() {
    const container = document.querySelector('.hojas-contenedor');
    if (!container) return;
    
    setInterval(() => {
        const hoja = document.createElement('div');
        hoja.className = 'hoja';
        hoja.textContent = '🍃';
        hoja.style.left = Math.random() * 100 + '%';
        hoja.style.animationDuration = (Math.random() * 5 + 10) + 's';
        container.appendChild(hoja);
        
        setTimeout(() => hoja.remove(), 15000);
    }, 2000);
}

console.log('🍥 naruto-index.js cargado');