document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const formatted = now.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById("fechaHora").value = formatted;

  document.getElementById("btnCancelar").addEventListener("click", () => {
    document.getElementById("formParte").reset();
    document.getElementById("fechaHora").value = formatted;
  });

  document.getElementById("formParte").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      inspector: document.getElementById("inspector").value,
      fechaHora: document.getElementById("fechaHora").value,
      empresa: document.getElementById("empresa").value,
      interno: parseInt(document.getElementById("interno").value),
      linea: parseInt(document.getElementById("linea").value),
      legajo: parseInt(document.getElementById("legajo").value),
      nombreChofer: document.getElementById("nombreChofer").value,
      detalle: document.getElementById("detalle").value,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1xxcYcCu-zcWeXNFPycGa3hrQr-o6yc3IsU8A5uMkOI8/edit?usp=sharing', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      if (result.result === "ok") {
        alert("✅ Parte guardado correctamente.");
        document.getElementById("formParte").reset();
        document.getElementById("fechaHora").value = formatted;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error al guardar. Revisa tu conexión.");
    }
  });
});
