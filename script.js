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
      await saveToGitHub(data);
      alert("? Parte guardado correctamente.");
      document.getElementById("formParte").reset();
      document.getElementById("fechaHora").value = formatted;
    } catch (error) {
      console.error("Error:", error);
      alert("? Error al guardar. Revisa tu conexión o el token de acceso.");
    }
  });
});

async function saveToGitHub(nuevoParte) {
  const token = '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'; // ? CAMBIA ESTO
  const owner = 'leandro120381';           // ? CAMBIA ESTO
  const repo = 'leandro120381.github.io';               // ? CAMBIA ESTO
  const filePath = 'partes.json';
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  const response = await fetch(url);
  const fileData = await response.json();

  let partes = [];
  if (response.ok) {
    partes = JSON.parse(atob(fileData.content));
  }

  partes.push(nuevoParte);

  const content = btoa(unescape(encodeURIComponent(JSON.stringify(partes, null, 2))));
  const commitData = {
    message: `Añadir parte - ${nuevoParte.inspector} - ${nuevoParte.fechaHora}`,
    content: content,
    sha: fileData.sha
  };

  const putResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commitData)
  });

  if (!putResponse.ok) {
    const err = await putResponse.json();
    throw new Error(`GitHub error: ${err.message}`);
  }

}




