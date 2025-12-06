window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/publicaciones/recientes");
    const publicaciones = await res.json();

    const lista = document.querySelector("#lista-publicaciones");
    lista.innerHTML = "";

    publicaciones.forEach(pub => {
      const li = document.createElement("li");
      li.textContent = `${pub.titulo} - ${pub.tipo === "venta" ? "$" + pub.precio : "Trueque"}`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error("Error cargando publicaciones", err);
  }
});
