// Función para obtener la fecha y hora actual en el formato DD/MM/AAAA - HH:MM:SS
function obtenerFechaHoraActual() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Modificar el formato para que sea DD/MM/AAAA - HH:MM:SS
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

// Completa automáticamente la fecha y hora cuando se abre la página
window.onload = function() {
    const fechaHora = obtenerFechaHoraActual();
    console.log(fechaHora); // Verifica en la consola si se obtiene la fecha y hora correctamente
    document.getElementById('fecha-hora').value = fechaHora;
};

// Función para cancelar y limpiar el formulario
function cancelar() {
    document.getElementById('formulario').reset();
    document.getElementById('fecha-hora').value = obtenerFechaHoraActual();
}

    // Enviar por WhatsApp
    function enviarDatos(event) {
      event.preventDefault();

      const inspector = document.getElementById("inspector").value;
      const fechaHora = document.getElementById("fecha-hora").value;
      const empresa = document.getElementById("empresa").value;
      const interno = document.getElementById("interno").value;
      const linea = document.getElementById("linea").value;
      const legajo = document.getElementById("legajo").value;
      const chofer = document.getElementById("chofer").value;
      const detalle = document.getElementById("detalle").value;

      const mensaje = `Inspector: ${inspector}
Fecha y Hora: ${fechaHora}
Empresa: ${empresa}
Interno: ${interno}
Línea: ${linea}
Chofer: ${chofer}
Legajo: ${legajo}
Detalle: ${detalle}`;

      const telefono = "542234171729";
      const mensajeCodificado = encodeURIComponent(mensaje);

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = `whatsapp://send?phone=${telefono}&text=${mensajeCodificado}`;
      } else {
        window.open(`https://wa.me/${telefono}?text=${mensajeCodificado}`, "_blank");
      }
    setTimeout(() => location.reload(), 1000);
    }

    document.getElementById("formulario").addEventListener("submit", enviarDatos);
