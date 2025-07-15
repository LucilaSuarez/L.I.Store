document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productosCarrito = document.querySelector(".productos-carrito");
    const totalValor = document.getElementById("total-valor");
    const cantidadProductos = document.getElementById("cantidad-productos");

    const btnSalir = document.getElementById("btn-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "../screens/index.html";
        });
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("producto-item", "d-flex", "align-items-center", "mb-3");

    item.innerHTML = `
      <div class="d-flex align-items-center flex-wrap">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="me-3" style="width:100px; height:auto; object-fit:contain;">
        <div>
          <h5 class="fw-semibold ">${producto.nombre}</h5>
          <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
          <div class="carrito-contenedor d-flex align-items-center gap-2 mt-2">
            <button class="btn-eliminar-carrito eliminar-uno" data-index="${index}">
              <i class="bi bi-trash"></i>
            </button>
            <span class="cantidad fw-semibold">${producto.cantidad}</span>
            <button class="btn-carrito aumentar" data-index="${index}">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <p class="mt-2 fs-6">Subtotal: $<span class="subtotal">${(producto.precio * producto.cantidad).toFixed(2)}</span></p>
        </div>
      </div>
    `;

    productosCarrito.appendChild(item);

    total += producto.precio * producto.cantidad;
    cantidadTotal += producto.cantidad;
  });

  totalValor.textContent = total.toFixed(2);
  cantidadProductos.textContent = cantidadTotal;

  // Aumentar cantidad
  document.querySelectorAll(".aumentar").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      carrito[index].cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      location.reload(); // refrescar para ver cambios
    });
  });

  // Eliminar UNA unidad
  document.querySelectorAll(".eliminar-uno").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      carrito[index].cantidad--;
      if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      location.reload();
    });
  });

  // modal 
  const pagarBtn = document.getElementById("pagar-btn");
  const confirmarBtn = document.getElementById("btn-confirmar-compra");

  if (pagarBtn) {
    pagarBtn.addEventListener("click", () => {
      const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
      modal.show();
    });
  }

  if (confirmarBtn) {
    confirmarBtn.addEventListener("click", () => {
      // Redirige al ticket si se confirma
      window.location.href = "../screens/ticket.html";
    });
  }

});
