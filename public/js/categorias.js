window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/categorias");
    const categorias = await res.json();

    const lista = document.querySelector("#lista-categorias");
    lista.innerHTML = "";

    categorias.forEach(cat => {
      const li = document.createElement("li");
      li.textContent = cat;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error("Error cargando categorías", err);
  }
});
