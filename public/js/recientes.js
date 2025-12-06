window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/publicaciones/recientes");
    const publicaciones = await res.json();

    const contenedor = document.querySelector("#lista-recientes");
    contenedor.innerHTML = "";

    publicaciones.forEach(pub => {
      const card = document.createElement("div");
      card.classList.add("producto");
      card.innerHTML = `
        <h3>${pub.titulo}</h3>
        <p>${pub.descripcion}</p>
        <p>${pub.tipo === "venta" ? "$" + pub.precio : "Trueque"}</p>
      `;
      contenedor.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando recientes", err);
  }
});
