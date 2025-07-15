function verificarToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../screens/iniciarSesion.html'; 
    }
}

//Carga todos los productos en la tabla
async function cargarProductos() {
    try {
        const respuesta = await fetch('http://localhost:3030/productos');
        const productos = await respuesta.json();
        const tbody = document.querySelector("#tablaProductos tbody");
        tbody.innerHTML = ""; // Limpiar por si hay datos previos

        productos.forEach(producto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.id_producto}</td>
                <td>${producto.tipo_producto}</td>
                <td>${producto.nombre}</td>
                <td>${producto.modelo}</td>
                <td>${producto.descripcion}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.activo ? "Sí" : "No"}</td>
                <td>
                    <button class="btn btn-danger btnEliminar" data-id="${producto.id_producto}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-warning btnSeleccionar" data-id="${producto.id_producto}">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    verificarToken();
    cargarProductos();
    // Escuchamos los clicks en el tbody
    document.querySelector("#tablaProductos tbody").addEventListener("click", function (e) {
        if (e.target.closest(".btnSeleccionar")) {
            const id = e.target.closest(".btnSeleccionar").dataset.id;
            seleccionarProducto(id);
        }
        // Baja lógica - Eliminar, desde el modal
        if (e.target.closest(".btnEliminar")) {
            const id = e.target.closest(".btnEliminar").dataset.id;
            mostrarModalBaja(id); 
        }
    });
});

let productoSeleccionado = null; // Variables global
let productoIdParaBaja = null;

async function seleccionarProducto(id) {
    try {
        const respuesta = await fetch(`http://localhost:3030/productos/${id}`);
        const producto = await respuesta.json();
        productoSeleccionado = producto;

    // Llenar el formulario con los datos del producto
        document.getElementById("inputID").value = producto.id_producto;
        document.getElementById("inputTipo").value = producto.tipo;
        document.getElementById("inputNombre").value = producto.nombre;
        document.getElementById("inputModelo").value = producto.modelo;
        document.getElementById("inputDes").value = producto.descripcion;
        document.getElementById("inputPrecio").value = producto.precio;
        document.getElementById("inputStock").value = producto.stock;
        document.getElementById("inputActivo").checked = producto.activo;

    } catch (error) {
        console.error("Error al seleccionar el producto:", error);
    }
}

// Evento para modificar producto desde el formulario
document.getElementById("btnModificar").addEventListener("click", async () => {
    const id = document.getElementById("inputID").value;
    const tipo = document.getElementById("inputTipo").value;
    const nombre = document.getElementById("inputNombre").value;
    const modelo = document.getElementById("inputModelo").value;
    const descripcion = document.getElementById("inputDes").value;
    const precio = parseFloat(document.getElementById("inputPrecio").value);
    const stock = parseInt(document.getElementById("inputStock").value);
    const activo = document.getElementById("inputActivo").checked;

    // Validación simple
    if (!tipo || !nombre || !modelo || !descripcion || isNaN(precio) || isNaN(stock)) {
        mostrarAlerta("Completá todos los campos correctamente.", "danger");
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:3030/productos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` 
            },
            body: JSON.stringify({
                tipo_producto: tipo,
                nombre,
                modelo,
                descripcion,
                precio,
                stock,
                activo
            })
        });

        if (respuesta.ok) {
            // Comparar si el producto estaba inactivo y ahora fue activado
            if (productoSeleccionado && productoSeleccionado.activo === false && activo === true) {
                mostrarAlerta("Producto reactivado con éxito.", "success");
            } else {
                mostrarAlerta("Producto modificado con éxito.", "success");
            }
            cargarProductos(); // Recargar la tabla
            document.getElementById("frmFormulario").reset(); // Limpiar el formulario
            productoSeleccionado = null; // Limpiar variable global
        } else {
            mostrarAlerta("No se pudo modificar el producto.", "danger");
        }
    } catch (error) {
        console.error("Error al modificar producto:", error);
        mostrarAlerta("Error del servidor.", "danger");
    }
});

function mostrarModalBaja(id) {
    productoIdParaBaja = id;
    document.getElementById("modalMensaje").textContent = "¿Estás seguro de que querés dar de baja este producto?";
    const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
    modal.show();
}


document.getElementById("btnConfirmarBaja").addEventListener("click", async () => {
    if (!productoIdParaBaja) return;
    try {
        const respuesta = await fetch(`http://localhost:3030/productos/${productoIdParaBaja}/desactivar`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (respuesta.ok) {
            mostrarAlerta("Producto dado de baja correctamente.", "warning");
            cargarProductos(); // Recargar la tabla
        } else {
            mostrarAlerta("No se pudo dar de baja el producto.", "danger");
        }
    } catch (error) {
        console.error("Error al dar de baja el producto:", error);
        mostrarAlerta("Error del servidor.", "danger");
    }

    // Cerrar el modal y limpiar ID
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmacion"));
    modal.hide();
    productoIdParaBaja = null;
});

function mostrarAlerta(mensaje, tipo) {
    const alerta = document.getElementById("alerta");
    alerta.textContent = mensaje;
    alerta.className = `alert alert-${tipo}`;
    alerta.classList.remove("d-none");
    setTimeout(() => {
        alerta.classList.add("d-none");
    }, 3000);
}
