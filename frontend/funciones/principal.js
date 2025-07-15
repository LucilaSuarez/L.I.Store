// funciones de la pantalla principal
document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.getElementById("nombre");
    const mensajeError = document.getElementById("mensaje-error");
    const enlacesProtegidos = document.querySelectorAll(".opciones a ");
    const formulario = document.querySelector(".form-nombre");

    const btnSalir = document.getElementById("btn-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "../screens/index.html";
        });
    }

    // Restaurar nombre si ya estaba guardado
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado) {
        inputNombre.value = nombreGuardado;
        inputNombre.classList.add("is-valid");
    }

    // Función para validar el nombre
    function validarNombre(nombre) {
        const caracteres = /^[A-Za-z]+$/;
        return caracteres.test(nombre);
    }


    // Validación al escribir
    inputNombre.addEventListener("input", () => {
        const nombre = inputNombre.value.trim();
        if (validarNombre(nombre)) {
            inputNombre.classList.remove("is-invalid");
            inputNombre.classList.add("is-valid");
            mensajeError.classList.add("d-none");
        } else {
            inputNombre.classList.remove("is-valid");
            inputNombre.classList.add("is-invalid");
            mensajeError.textContent = "Por favor ingresá solo letras.";
            mensajeError.classList.remove("d-none");
            saludo.classList.add("d-none");
        }
    });

    // Validación al enviar
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = inputNombre.value.trim();

        if (validarNombre(nombre)) {
            localStorage.setItem("nombreUsuario", nombre);
            inputNombre.classList.remove("is-invalid");
            inputNombre.classList.add("is-valid");
            mensajeError.classList.add("d-none");
            window.location.href = "../screens/selector.html";
        } else {
            mensajeError.textContent = "Por favor ingresá solo letras.";
            mensajeError.classList.remove("d-none");
            inputNombre.classList.remove("is-valid");
            inputNombre.classList.add("is-invalid");
            saludo.classList.add("d-none");
        }
    });

    // Bloqueo de enlaces si no hay nombre válido
    enlacesProtegidos.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            const nombre = inputNombre.value.trim();
            if (!validarNombre(nombre)) {
                e.preventDefault();
                mensajeError.textContent = "Ingresá tu nombre para continuar.";
                mensajeError.classList.remove("d-none");
                inputNombre.classList.remove("is-valid");
                inputNombre.classList.add("is-invalid");
                saludo.classList.add("d-none");
            }
        });
    });
});


