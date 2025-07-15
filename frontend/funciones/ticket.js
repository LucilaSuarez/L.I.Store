// funciones para el Ticket
document.addEventListener("DOMContentLoaded", async () => {
    const nombreUsuario = localStorage.getItem("nombreUsuario") || "Cliente";
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nombreSpan = document.getElementById("nombre-usuario");
    const fechaSpan = document.getElementById("fecha-actual");
    const listaProductos = document.getElementById("lista-productos");
    const totalTicket = document.getElementById("total-ticket");

    // Mostrar nombre
    nombreSpan.textContent = nombreUsuario;

    // Mostrar fecha actual
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    fechaSpan.textContent = fechaFormateada;

    // Cargar productos
    let total = 0;
    carrito.forEach(producto => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "item-ticket");
        li.innerHTML = `
            ${producto.nombre} (x${producto.cantidad})
            <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
        `;
        total += producto.precio * producto.cantidad;
        listaProductos.appendChild(li);
    });

    totalTicket.textContent = total.toFixed(2);

/**
 *  Envía una venta al servidor a través de una petición POST.
 *  La venta contiene el nombre del usuario, la fecha actual, el total de la compra
 *  y un array con los detalles de cada producto (cantidad, precio unitario, id del producto).
 * 
 * Al finalizar correctamente:
 * - Se imprime un mensaje en consola.
 * - Se limpia el carrito del `localStorage`.
 * 
 * Si ocurre un error, se muestra por consola.
 *
 * @async
 * @function
 * @param {string} nombreUsuario - Nombre del usuario que realiza la compra.
 * @param {number} total - Monto total de la venta.
 * @param {Array} carrito - Array de productos con los datos de cada ítem del carrito.
 *
 */
    try {
        const respuesta = await fetch("http://localhost:3030/ventas", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                nombre_usuario: nombreUsuario,
                fecha: new Date(),
                total: total,
                detalles: carrito.map(producto => ({
                    cantidad: producto.cantidad,
                    precio_unitario: producto.precio,
                    id_producto: producto.id_producto
                }))


            })
        });
                if (!respuesta.ok) throw new Error("Error al registrar la venta");
        console.log("Venta registrada correctamente");
        localStorage.removeItem("carrito");
    } catch (error) {
        console.error("Error al enviar la venta:", error);
    }

    // Función para descargar el ticket como PDF cuando se presiona el botón
    document.getElementById("descargar-pdf").addEventListener("click", () => {
        const elemento = document.getElementById("ticket-contenido");
        const opciones = {
            margin: 10,
            filename: 'ticket_compra.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
    html2pdf().set(opciones).from(elemento).save();
    });

    // reiniciar el sistema 
    const salirBtnNavbar = document.getElementById("btn-salir");
    const salirBtnAbajo = document.getElementById("btn-salir-ticket");
    const manejarSalida = () => {
        localStorage.clear(); 
        window.location.href = "../screens/index.html";
    };

    if (salirBtnNavbar) {
        salirBtnNavbar.addEventListener("click", (e) => {
            e.preventDefault();
            manejarSalida();
        });
    }

    if (salirBtnAbajo) {
        salirBtnAbajo.addEventListener("click", (e) => {
            e.preventDefault();
            manejarSalida();
        });
    }
});