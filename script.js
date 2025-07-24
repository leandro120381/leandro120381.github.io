// script.js

// Función para obtener la fecha y hora actual en el formato dd/mm/aaaa hh:mm:ss
function obtenerFechaHoraActual() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Completa automáticamente la fecha y hora cuando se abre la página
window.onload = function() {
    document.getElementById('fecha-hora').value = obtenerFechaHoraActual();
};

// Función para cancelar y limpiar el formulario
function cancelar() {
    document.getElementById('formulario').reset();  // Limpiar formulario
    document.getElementById('fecha-hora').value = obtenerFechaHoraActual();  // Reestablecer fecha
}

// Función para enviar los datos por WhatsApp
function enviarDatos(event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores de los campos
    const inspector = document.getElementById('inspector').value;
    const fechaHora = document.getElementById('fecha-hora').value;
    const empresa = document.getElementById('empresa').value;
    const interno = document.getElementById('interno').value;
    const linea = document.getElementById('linea').value;
    const chofer = document.getElementById('chofer').value;
    const legajo = document.getElementById('legajo').value;
    const detalle = document.getElementById('detalle').value;

    // Formatear el mensaje para enviar por WhatsApp
    const mensaje = `
Inspector: ${inspector}
Fecha y Hora: ${fechaHora}
Empresa: ${empresa}
Interno: ${interno}
Línea: ${linea}
Chofer: ${chofer}
Legajo: ${legajo}
Detalle: ${detalle}
    `;

    // Codificar el mensaje para la URL de WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje.trim());

    // Redirigir a WhatsApp Web (funciona también en móviles con app instalada)
    window.location.href = `https://wa.me/542234171729?text=${mensajeCodificado}`;
}
