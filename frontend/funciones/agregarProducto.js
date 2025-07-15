// funciones pantalla agregar producto
const API_URL = "http://localhost:3030/productos"; 
function volverAgregarProducto() {
    window.location.href = "../screens/administrador.html";
}

document.addEventListener("DOMContentLoaded", () => {
    verificarToken(); 

    const form = document.getElementById("frmFormulario");  
    const alerta = document.getElementById("alerta"); 

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validar si el formulario es correcto
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        // Obtener los valores de los campos del formulario
        const tipo = document.getElementById("inputTipo").value;
        const nombre = document.getElementById("inputNombre").value.trim();
        const imagenInput = document.getElementById("inputImagen"); // Input para la imagen
        const modelo = document.getElementById("inputModelo").value.trim();
        const descripcion = document.getElementById("inputDescripcion").value.trim();
        const precio = parseFloat(document.getElementById("inputPrecio").value);
        const stock = parseInt(document.getElementById("inputStock").value);
        const activo = document.getElementById("inputActivo").checked ? 1 : 0;

        // Leer la imagen (el archivo)
        const imagen = imagenInput.files[0];
        if (!imagen) {
            mostrarError("Debes cargar una imagen."); 
            return;
        }

        // Crear el objeto FormData para enviar todos los datos, incluyendo la imagen
        const nuevoProducto = new FormData();
        nuevoProducto.append("tipo_producto", tipo);
        nuevoProducto.append("nombre", nombre);
        nuevoProducto.append("modelo", modelo);
        nuevoProducto.append("descripcion", descripcion);
        nuevoProducto.append("precio", precio);
        nuevoProducto.append("stock", stock);
        nuevoProducto.append("activo", activo);
        nuevoProducto.append("imagen", imagen);  

        try {
            // Realizar la solicitud POST para agregar el producto con FormData
            const respuesta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`  // Autenticación con el token de sesión
                },
                body: nuevoProducto  // Enviar el formData 
            });

            if (!respuesta.ok) throw new Error("Error al guardar el producto");

            mostrarMensaje("Producto agregado con éxito", "success");
            setTimeout(() => {
                window.location.href = "../screens/administrador.html"; // Redirige al administrador tras agregar el producto
            }, 1500);
        } catch (error) {
            mostrarError("No se pudo agregar el producto. Intente nuevamente.");
        }
    });

    // Función para mostrar mensajes en la UI
    function mostrarMensaje(mensaje, tipo) {
        alerta.textContent = mensaje;
        alerta.className = `alert alert-${tipo}`;  // Asigna la clase correspondiente para mostrar el tipo de mensaje
        alerta.classList.remove("d-none");
    }

    // Función para mostrar errores en la UI
    function mostrarError(mensaje) {
        mostrarMensaje(mensaje, "danger"); 
    }

    // Verificar que el token de sesión esté presente
    function verificarToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "../screens/iniciarSesion.html"; // Redirige al login si no hay token
        }
    }
});
