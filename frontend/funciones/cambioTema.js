// funciones para cambiar el tema
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("darkmode-toggle");
    // Aplicar tema guardado
    if (localStorage.getItem("tema") === "oscuro") {
        document.body.classList.add("oscuro");
        checkbox.checked = true;
    }
    // Escuchar cambio de tema
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            document.body.classList.add("oscuro");
            localStorage.setItem("tema", "oscuro");
        } else {
            document.body.classList.remove("oscuro");
            localStorage.setItem("tema", "claro");
        }
    });
});
