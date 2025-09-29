const user = JSON.parse(localStorage.getItem("user"));
const form = document.querySelector("#form-publicar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  data.id_usuario = user.id;

  try {
    const res = await fetch("/api/publicaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      alert("Artículo publicado con éxito");
      window.location.href = "/html/inicio.html";
    } else {
      alert(result.error);
    }
  } catch (err) {
    console.error("Error al publicar", err);
  }
});
