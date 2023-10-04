function checkCredentials() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === "Admin" && password === "123") {
        message.textContent = "Inicio de sesión exitoso!";
        message.style.color = "green";
        // Redirige a la página principal si el inicio de sesión es exitoso
        setTimeout(function() {
            window.location.href = "principal.html";
        }, 1000); // Espera 1 segundo antes de redirigir
    } else {
        message.textContent = "Credenciales incorrectas.";
        message.style.color = "red";
    }

    // Limpia los campos de entrada
    usernameInput.value = "";
    passwordInput.value = "";
}