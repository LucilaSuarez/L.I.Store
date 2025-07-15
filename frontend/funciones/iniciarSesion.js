document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formLogin");

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

/**
 * Inicia sesión como administrador enviando email y contraseña al backend.
 * 
 * Si la autenticación es exitosa:
 * - Se almacena el token JWT en `localStorage`.
 * - Se redirige a la pantalla del administrador.
 * 
 * Si ocurre un error (credenciales inválidas o fallo del servidor):
 * - Se muestra un mensaje de alerta con la causa.
 * 
 * @async
 * @function
 * @param {string} email - Correo electrónico ingresado por el administrador.
 * @param {string} password - Contraseña correspondiente al correo.
 * */

        if (!email || !password) {
            alert("Por favor, completar todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3030/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Error: ${data.message}`);
                return;
            }

            localStorage.setItem('token', data.token);
            window.location.href = "../screens/administrador.html"; 
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Ocurrió un error al iniciar sesión. Por favor, intentá de nuevo más tarde.");
        }
    });
    const btnAutocompletar = document.getElementById("btn-Autocompletar");
    btnAutocompletar.addEventListener("click", () => {
        document.getElementById("email").value = "admin@store.com";
        document.getElementById("password").value = "admin123";
    });
});
