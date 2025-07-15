document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.querySelector(".img-celulares");

/**
 * Carga los productos tipo "celular" que estén activos desde el backend,
 * genera dinámicamente las tarjetas HTML y las inserta en el DOM dentro del contenedor correspondiente.
 * 
 * - Usa `fetch` para consultar: GET /productos?tipo=celular&activo=true
 * - Para cada producto, crea una tarjeta con su imagen, nombre, precio y botones de carrito.
 * - Llama a funciones auxiliares para actualizar el contador del carrito y eliminar productos.
 * 
 * Requiere que en el HTML exista un contenedor con clase `.img-celulares`.
 * 
 * @async
 * @function
 * @returns {void}
 * 
 * @example
 * // Llamado automático al cargar el DOM
 * await cargarProductosCelulares();
 *
 * // Ejemplo de respuesta esperada de la API:
 * [
 *   {
 *     id_producto: 1,
 *     nombre: "iPhone 16",
 *     precio: 799,
 *     imagen: "uploads/iphone16.png",
 *     tipo_producto: "celular",
 *     activo: 1
 *   }
 * ]
 */
    try {
        const respuesta = await fetch("http://localhost:3030/productos?tipo=celular&activo=true");
        const productos = await respuesta.json();
        console.log("PRODUCTOS DESDE API:", productos);

        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "info-celulares";
            tarjeta.dataset.id = producto.id_producto;
            tarjeta.innerHTML = `
            <img src="http://localhost:3030/uploads/${producto.imagen}" alt="${producto.nombre}" class="img-fluid imagen-producto">
                <h2>${producto.nombre}</h2>
                <p class="precio">por un precio de $${Number(producto.precio).toFixed(2)}</p>
                <div class="carrito-contenedor">
                    <button class="btn-carrito" onclick="agregarAlCarrito(this)">
                        <i class="bi bi-cart-plus"></i>
                    </button>
                    <span class="contador">0</span>
                    <button class="btn-eliminar-carrito">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
        contenedor.appendChild(tarjeta);
        });

        actualizarContadorGlobal();
        actualizarContadoresVisuales();
        agregarEventosEliminar();
    } catch (error) {
    console.error("Error al cargar los celulares:", error);
    }

    window.agregarAlCarrito = (boton) => {
        const contenedor = boton.closest(".info-celulares");
        const contador = contenedor.querySelector(".contador");
        const nombre = contenedor.querySelector("h2").textContent.trim();
        const precioTexto = contenedor.querySelector(".precio").textContent;
        const precio = parseFloat(precioTexto.replace(/[^\d.]/g, ""));
        const id = parseInt(contenedor.getAttribute("data-id"));
        const imagen = contenedor.querySelector("img").getAttribute("src");

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const index = carrito.findIndex(p => p.id_producto === id);

        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({ id_producto: id, nombre, precio, imagen, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        contador.textContent = carrito.find(p => p.id_producto === id)?.cantidad || 1;
        actualizarContadorGlobal();
        agregarEventosEliminar();
    };

    function agregarEventosEliminar() {
        document.querySelectorAll(".btn-eliminar-carrito").forEach(btn => {
            btn.addEventListener("click", () => {
                const contenedor = btn.closest(".info-celulares");
                const contador = contenedor.querySelector(".contador");
                const id = parseInt(contenedor.dataset.id);

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const index = carrito.findIndex(p => p.id_producto === id);

                if (index !== -1) {
                    carrito[index].cantidad--;
                    if (carrito[index].cantidad <= 0) {
                        carrito.splice(index, 1);
                        contador.textContent = 0;
                    } else {
                        contador.textContent = carrito[index].cantidad;
                    }
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarContadorGlobal();
                }
            });
        });
    }

    function actualizarContadorGlobal() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        const spanContador = document.getElementById("contador-global");
        if (spanContador) {
            spanContador.textContent = totalCantidad;
        }
    }

    function actualizarContadoresVisuales() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.forEach(producto => {
            const tarjetas = document.querySelectorAll(".info-celulares");
            tarjetas.forEach(tarjeta => {
                const idTarjeta = parseInt(tarjeta.dataset.id);
                if (idTarjeta === producto.id_producto) {
                    const contador = tarjeta.querySelector(".contador");
                    if (contador) {
                        contador.textContent = producto.cantidad;
                    }
                }
            });
        });
    }
});
