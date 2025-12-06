window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/publicaciones/recientes");
    const publicaciones = await res.json();

    const contenedor = document.querySelector("#lista-compra");
    contenedor.innerHTML = "";

    publicaciones
      .filter(pub => pub.tipo === "venta")
      .forEach(pub => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
          <h3>${pub.titulo}</h3>
          <p>$${pub.precio}</p>
          <button>Comprar</button>
        `;
        contenedor.appendChild(div);
      });
  } catch (err) {
    console.error("Error cargando publicaciones de compra", err);
  }
});
