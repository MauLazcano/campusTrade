window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/publicaciones/trueque");
    const publicaciones = await res.json();

    const contenedor = document.querySelector("#lista-trueque");
    contenedor.innerHTML = "";

    publicaciones.forEach(pub => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <h3>${pub.titulo}</h3>
        <p>${pub.descripcion}</p>
        <p><strong>Categoría:</strong> ${pub.categoria}</p>
      `;
      contenedor.appendChild(div);
    });
  } catch (err) {
    console.error("Error cargando trueque", err);
  }
});
