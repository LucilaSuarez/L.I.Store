document.addEventListener("DOMContentLoaded", () => {
    const saludoUsuario = document.getElementById("saludo-usuario");
    const btnSalir = document.getElementById("btn-salir");
    const nombreGuardado = localStorage.getItem("nombreUsuario");

    if (nombreGuardado) {
        saludoUsuario.textContent = `Hola, ${nombreGuardado}!`;
    }

    if (btnSalir) {
        btnSalir.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "../screens/index.html";
        });
    }
});
